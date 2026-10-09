import { useState, useEffect, useRef } from 'react';
import { MoonIcon, CheckIcon } from '../assets/Svg.jsx';

const OPTIONS = ['system', 'dark', 'light', 'glass'];

function applyScheme(mode) {
  for (const attr of ['dark', 'light', 'glass']) {
    document.documentElement.toggleAttribute(attr, attr === mode);
  }
}

export function ColorScheme() {
  const [mode, setMode] = useState('system');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => { applyScheme(mode); }, [mode]);

  useEffect(() => {
    if (!open) return;
    const onDown = e => { if (!ref.current.contains(e.target)) setOpen(false); };
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pick = m => { setMode(m); setOpen(false); };

  return (
    <div className="color-scheme" ref={ref}>
      <button className="color-scheme-button" title="Color scheme (because why not)" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <MoonIcon />
      </button>
      {open && (
        <flex-column class="color-scheme-menu" role="menu">
          <span className="menu-title">Color Schemes (because why not)</span>
          {OPTIONS.map(o => (
            <button key={o} className={'option' + (o === mode ? ' selected' : '')} role="menuitemradio" aria-checked={o === mode} onClick={() => pick(o)}>
              {o}
              {o === mode && <CheckIcon />}
            </button>
          ))}
        </flex-column>
      )}
    </div>
  );
}