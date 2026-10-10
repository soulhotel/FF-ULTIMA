import { useState, useEffect } from 'react';
import { Modal } from '.';
import { CheckIcon, XIcon, FolderIcon, SpinnerIcon } from '../assets/Svg.jsx';
import { api, useSetupState, useCountdown } from '../hooks and such/useProgress.js';

export const Status = ({ state }) =>
  state === 'warn' ?    <span className="err">     <XIcon />      </span>
: state === 'done' ?    <span className="ok">      <CheckIcon />  </span>
: state === 'error' ?   <span className="err">     <XIcon />      </span>
: state === 'running' ? <span className="accented"><SpinnerIcon /></span>
: null;

// util, will eventually use more of these
const Msg = ({ text }) =>
  text.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    return m ? <a key={i} href={m[2]} target="_blank" rel="noreferrer">{m[1]}</a> : part;
  });

export const Check = ({ ok }) => <Status state={ok ? 'done' : 'error'} />;

const firefoxName = (dir = '') => {
  const parts = dir.split(/[\\/]/).filter(Boolean);
  const app = parts.find(p => /\.app$/i.test(p)); // macOS is Firefox Nightly.app/Contents/Resources
  const raw = (app ? app.replace(/\.app$/i, '') : parts[parts.length - 1]) || '';
  const name = raw
    .replace(/^mozilla\s+/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\bEsr\b/, 'ESR');
  return /firefox/i.test(name) ? name : 'Firefox';
};

export function InstallModal({ onClose, onFinish }) {
  const [phase, setPhase] = useState('info');
  const [S, refresh] = useSetupState();
  const [begun, setBegun] = useState(false);
  const [editFF, setEditFF] = useState(false);
  const [ffPath, setFfPath] = useState('');
  const [err, setErr] = useState('');
  const [cd, startCD, cancelCD, restartNow] = useCountdown(() => api('restart', {}).catch(() => {}));
  const checksOK = !!(S && S.chromeOK && S.profileOK && S.firefoxOK);
  const finished = !!(S && !S.running && S.steps.length > 0);
  const fin = finished && S.steps.every(s => s.state === 'done' || s.state === 'warn');
  const bad = finished && S.steps.some(s => s.state === 'error');
 
  useEffect(() => {
    if (phase !== 'run' || !checksOK || editFF || begun || S.steps.length) return;
    setBegun(true);
    api('install', {}).then(refresh).catch(e => setErr(e.message));
  }, [phase, checksOK, editFF, begun]);
 
  // poll progress while running
  useEffect(() => {
    if (!begun || finished) return;
    const id = setInterval(refresh, 400);
    return () => clearInterval(id);
  }, [begun, finished]);
 
  useEffect(() => { if (fin) startCD(); }, [fin]);
 
  useEffect(() => {
    if (cd !== 0) return;
    const t = setTimeout(() => onFinish(true), 3000);
    return () => clearTimeout(t);
  }, [cd]);
 
  const next = () => { setPhase('run'); refresh(); };
  const openFF = () => { setFfPath(S.firefoxDir || ''); setEditFF(!editFF); };
  const saveFF = async () => {
    try { await api('firefox', { path: ffPath }); setEditFF(false); setErr(''); refresh(); }
    catch (e) { setErr(e.message); }
  };
 
  const pickProfile = async dir => {
    try { await api('profile', { dir }); setErr(''); refresh(); }
    catch (e) { setErr(e.message); }
  };

  if (phase === 'info') {
    return (
      <Modal
        className="install-modal step-1"
        title="FF Ultima Setup Wizard"
        onClose={onClose}
        footer={<>
                <button className="alt" onClick={onClose}>Back</button>
                <button className="primary" onClick={next}>Next</button>
              </>}
      >
        <p>
          FF Ultima Setup Wizard will install FF Ultima into this profiles <code>chrome</code> folder. 
          Then Setup userChromeCompanion & userChromeJS. 
          Please ensure the Wizard is operating within your target chrome folder. 
          1 minute and 1 click, is all you need.
        </p>
        {S && (S.profiles || []).length > 0 && (
          <p>
            Target profile:{' '}
            <select value={S.profileDir} onChange={e => pickProfile(e.target.value)}>
              {S.profiles.map(p => (
                <option key={p.dir} value={p.dir}>{p.name}{p.hasChrome ? '' : ' (no chrome folder yet)'}</option>
              ))}
            </select>
          </p>
        )}
        {err && <div className="msg err">{err}</div>}
        <p className="note">Note: the Theme is downloaded through Github direct link (github.com/soulhotel/FF-Ultima/archive/refs/heads/main.zip). Git or other dependencies are not required.</p>
      </Modal>
    );
  }
 
  if (!S) return <Modal className="install-modal step-2" title="FF Ultima Setup Wizard"><p><SpinnerIcon/></p></Modal>;
 
  const ff = S.firefoxName || firefoxName(S.firefoxDir);
 
  const footer =
    fin && cd !== 0 ? (<>
      {cd > 0 && <button className="alt" onClick={() => { cancelCD(); onFinish(false); }}>Wait</button>}
      <button className="primary" onClick={restartNow}>Restart now</button>
    </>)
  : bad ? <button className="primary" onClick={onClose}>Close</button>
  : null;
 
  const closeX = cd === 0 ? null : (!begun || finished) ? (fin ? () => onFinish(false) : onClose) : null;
 
  return (
    <Modal
      className="install-modal step-2"
      title="FF Ultima Setup Wizard"
      onClose={closeX}
      footer={footer}
    >
      <p>Please keep the Setup Wizard open until all progress is complete.</p>
      <div className="r">chrome folder detected <Check ok={S.chromeOK}/></div>
      <div className="r">profile detected {S.chromeOK && <b>{S.profileName}</b>} <Check ok={S.profileOK}/></div>
      <div className="r">
        firefox
        {editFF ? (
          <>
            <input type="text" value={ffPath} onChange={e => setFfPath(e.target.value)} placeholder="Firefox install folder (contains omni.ja)" />
            <button className="sm primary" onClick={saveFF}>Set</button>
          </>
        ) : (
          <>
            {S.firefoxName && <b>{S.firefoxName} {S.firefoxVersion}</b>}
            <span className="muted path" title={S.firefoxDir}>{S.firefoxDir || 'not found'}</span>
          </>
        )}
        <Check ok={S.firefoxOK} />
        {!begun && S.chromeOK && <button className="ic" title="Change Firefox location" onClick={openFF}><FolderIcon /></button>}
      </div>
      {S.firefoxNote && <div className="msg muted">{S.firefoxNote}</div>}
      {err && <div className="msg err">{err}</div>}
      {S.steps.map(s => (
        <div key={s.id}>
          <div className="r">
            {s.label}
            <Status state={s.state} />
            {s.state === 'done' && s.msg && <span className="muted">{s.msg}</span>}
          </div>
          {s.msg && s.state !== 'done' && <div className={'msg ' + (s.state === 'error' || s.state === 'warn' ? 'err' : 'muted')}><Msg text={s.msg} /></div>}
        </div>
      ))}
      {fin && (
        <p className="ok">
          {cd > 0 ? `All done. Restarting ${ff} in ${cd}` : cd === 0 ? `All done. Restarting ${ff}...` : `All done. Restart ${ff} to apply.`}
        </p>
      )}
    </Modal>
  );
}