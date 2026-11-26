// Ranks airport suggestions for the "Flying from / Flying to" fields.
export function rankMatches(airports, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = [];
  for (const a of airports) {
    const code = a.code.toLowerCase();
    const city = (a.city || '').toLowerCase();
    const name = a.name.toLowerCase();

    let score;
    if (code === q) score = 0;
    else if (code.startsWith(q)) score = 1;
    else if (city.startsWith(q)) score = 2;
    else if (name.startsWith(q)) score = 3;
    else if (city.includes(q) || name.includes(q) || code.includes(q)) score = 4;
    else continue;

    scored.push({ ...a, score });
  }

  scored.sort((x, y) => x.score - y.score || x.city.localeCompare(y.city));
  return scored.slice(0, 8);
}
