import { useState, useEffect, useCallback } from 'react';
import { mockApi, dryRun } from './test.js';

const TOKEN = new URLSearchParams(location.search).get('t');

const realApi = (path, body) =>
  fetch('/api/' + path, {
    method: body ? 'POST' : 'GET',
    headers: { 'X-Token': TOKEN, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }).then(async r => {
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || r.statusText);
    return j;
  });

export const api = dryRun ? mockApi : realApi;

export function useSetupState() {
  const [state, setState] = useState(null);
  const refresh = useCallback(async () => {
    const s = await api('state');
    s.steps = s.steps || [];
    setState(s);
    return s;
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return [state, refresh];
}

export function useCountdown(onDone, from = 10) {
  const [n, setN] = useState(-1);
  useEffect(() => {
    if (n < 0) return;
    if (n === 0) { onDone(); return; }
    const t = setTimeout(() => setN(n - 1), 1000);
    return () => clearTimeout(t);
  }, [n]);
  return [n, () => setN(from), () => setN(-1), () => setN(0)];
}