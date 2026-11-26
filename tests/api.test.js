import { beforeEach, describe, expect, it, vi } from 'vitest';

// No real email is sent and the reference counter file is not touched.
const sendMail = vi.fn();
vi.mock('@/lib/mailer', async (importOriginal) => ({
  ...(await importOriginal()),
  getTransporter: () => ({ sendMail }),
}));
vi.mock('@/lib/refNumber', () => ({ getNextRefNumber: async () => 999999 }));

const { POST: quote } = await import('@/app/api/quote/route');
const { POST: contact } = await import('@/app/api/contact/route');

const call = async (handler, body) => {
  const res = await handler(new Request('http://test/api', { method: 'POST', body: JSON.stringify(body) }));
  return { status: res.status, body: await res.json() };
};

const valid = { email: 'john@gmail.com', phone: '+12025550143', passengers: 12 };
const forms = [
  ['quote', quote, { ...valid, tripType: 'oneway', from: 'DEL', to: 'LHR', depart: '2027-01-10', cabin: 'Economy' }],
  ['contact', contact, { ...valid, first: 'John', last: 'Doe', message: '<script>x</script>' }],
];

describe.each(forms)('%s API', (_name, handler, payload) => {
  beforeEach(() => sendMail.mockReset().mockResolvedValue({}));

  it('emails support and the customer for a valid request', async () => {
    const res = await call(handler, payload);
    expect(res).toEqual({ status: 200, body: { ok: true, refNo: 999999 } });
    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(sendMail.mock.calls.map(([m]) => m.html).join('')).not.toContain('<script>');
  });

  it.each([
    ['missing email', { email: '' }],
    ['bad email', { email: 'nope' }],
    ['bad phone', { phone: '123' }],
    ['too few passengers', { passengers: 2 }],
  ])('rejects %s without sending email', async (_label, change) => {
    const res = await call(handler, { ...payload, ...change });
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 500 when email delivery fails', async () => {
    sendMail.mockRejectedValue(new Error('smtp down'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect((await call(handler, payload)).status).toBe(500);
    vi.restoreAllMocks();
  });
});
