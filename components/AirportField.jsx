'use client';

import { useEffect, useRef, useState } from 'react';
import { loadAirports } from '@/lib/airportsCache';
import { rankMatches } from '@/lib/airportSearch';

export default function AirportField({ id, label, placeholder, value, onChange, required }) {
  const [airports, setAirports] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef(null);

  // The airport list is large, so fetch it only when someone starts using a field
  // (loadAirports caches it for all fields). This keeps it out of the initial page load.
  const ensureAirports = () => loadAirports().then(setAirports);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const suggestions = airports ? rankMatches(airports, value) : [];

  const pick = (a) => {
    onChange(`${a.city ? `${a.city}, ` : ''}${a.country} (${a.code})`);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      pick(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        required={required}
        autoComplete="off"
        className="field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => {
          ensureAirports();
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
      />

      {open && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-xl border border-ink/10 bg-white py-1.5 shadow-lg">
          {suggestions.map((a, i) => (
            <li key={a.code}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(a)}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-sm transition-colors ${
                  i === activeIndex ? 'bg-paper' : 'hover:bg-paper'
                }`}
              >
                <span className="truncate">
                  <span className="font-semibold text-ink">{a.city || a.name}</span>
                  <span className="text-ink/50">, {a.country}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] font-bold text-coral">{a.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
