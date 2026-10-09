import { useState, useEffect, useRef } from 'react';
import { Modal } from '.';
import { SpinnerIcon, FolderIcon } from '../assets/Svg.jsx';
import { Status, Check } from './install.js';
import { api, useSetupState } from '../hooks and such/useProgress.js';

export function UninstallModal({ onClose, onFinish }) {
  const [phase, setPhase] = useState('info');
  const [S, refresh] = useSetupState();
  const [begun, setBegun] = useState(false);
  const [editFF, setEditFF] = useState(false);
  const [ffPath, setFfPath] = useState('');
  const [err, setErr] = useState('');
  const started = useRef(false);

  const checksOK = !!(S && S.chromeOK && S.profileOK && S.firefoxOK);
  const finished = !!(begun && S && !S.running && S.steps.length > 0);
  const fin = finished && S.steps.every(s => s.state === 'done');
  const bad = finished && S.steps.some(s => s.state === 'error');

  useEffect(() => {
    if (phase !== 'run' || !checksOK || editFF || started.current) return;
    started.current = true;
    api('uninstall', {}).then(refresh).then(() => setBegun(true)).catch(e => setErr(e.message));
  }, [phase, checksOK, editFF]);

  useEffect(() => {
    if (!begun || finished) return;
    const id = setInterval(refresh, 400);
    return () => clearInterval(id);
  }, [begun, finished]);

  const next = () => { setPhase('run'); refresh(); };
  const openFF = () => { setFfPath(S.firefoxDir || ''); setEditFF(!editFF); };
  const saveFF = async () => {
    try { await api('firefox', { path: ffPath }); setEditFF(false); setErr(''); refresh(); }
    catch (e) { setErr(e.message); }
  };
  const restartNow = () => { api('restart', {}).catch(() => {}); onFinish(true); };

  if (phase === 'info') {
    return (
      <Modal
        className="uninstall-modal step-1"
        title="FF Ultima Setup Wizard"
        onClose={onClose}
        footer={<>
          <button className="alt" onClick={onClose}>Back</button>
          <button className="un" onClick={next}>Next</button>
        </>}
      >
        <p>
            FF Ultima Setup Wizard will <code>uninstall FF Ultima</code> from this profiles chrome folder. 
            It will also <code>uninstall userChromeJS</code> from your Firefox derivative completely. 
            Please ensure the Wizard is operating within your target chrome folder. 
            1 minute and 1 click, is all you need.
        </p>
        <p className="note">Note: Uninstalling will only remove files &amp; folders that come from the FF Ultima repo. Any other files will remain untouched.</p>
      </Modal>
    );
  }

  if (!S) return <Modal className="uninstall-modal step-2" title="FF Ultima Setup Wizard"><p><SpinnerIcon/></p></Modal>;

  const footer =
    fin ? (<>
      <button className="alt" onClick={() => onFinish(false)}>Done</button>
      <button className="primary" onClick={restartNow}>Restart now</button>
    </>)
  : bad ? <button className="primary" onClick={onClose}>Close</button>
  : null;

  const closeX = (!begun || finished) ? (fin ? () => onFinish(false) : onClose) : null;

  return (
    <Modal className="uninstall-modal step-2" title="FF Ultima Setup Wizard" onClose={closeX} footer={footer}>
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
        {!begun && !started.current && S.chromeOK && <button className="ic" title="Change Firefox location" onClick={openFF}><FolderIcon /></button>}
      </div>
      {S.firefoxNote && <div className="msg muted">{S.firefoxNote}</div>}
      {err && <div className="msg err">{err}</div>}
      {begun && S.steps.map(s => (
        <div key={s.id}>
          <div className="r">
            {s.label}
            <Status state={s.state} />
            {s.state === 'done' && s.msg && <span className="muted">{s.msg}</span>}
          </div>
          {s.msg && s.state !== 'done' && <div className={'msg ' + (s.state === 'error' ? 'err' : 'muted')}>{s.msg}</div>}
        </div>
      ))}
      {fin && <p className="ok">All done. FF Ultima has been uninstalled.</p>}
      {fin && <p className="note">Note: Restart Firefox to finish removing userChromeJS.</p>}
    </Modal>
  );
}