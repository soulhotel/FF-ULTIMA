import { useState, useEffect, useRef } from 'react';
import { Modal } from '.';
import { SpinnerIcon } from '../assets/Svg.jsx';
import { Status, Check } from './install.js';
import { api, useSetupState } from '../hooks and such/useProgress.js';

export function UpdateModal({ onClose, onFinish }) {
  const [phase, setPhase] = useState('info');
  const [S, refresh] = useSetupState();
  const [begun, setBegun] = useState(false);
  const [err, setErr] = useState('');
  const started = useRef(false);

  const checksOK = !!(S && S.chromeOK && S.profileOK);
  const finished = !!(begun && S && !S.running && S.steps.length > 0);
  const fin = finished && S.steps.every(s => s.state === 'done');
  const bad = finished && S.steps.some(s => s.state === 'error');

  useEffect(() => {
    if (phase !== 'run' || !checksOK || started.current) return;
    started.current = true;
    api('update', {}).then(refresh).then(() => setBegun(true)).catch(e => setErr(e.message));
  }, [phase, checksOK]);

  useEffect(() => {
    if (!begun || finished) return;
    const id = setInterval(refresh, 400);
    return () => clearInterval(id);
  }, [begun, finished]);

  const next = () => { setPhase('run'); refresh(); };
  const restartNow = () => { api('restart', {}).catch(() => {}); onFinish(true); };

  if (phase === 'info') {
    return (
      <Modal
        className="update-modal step-1"
        title="FF Ultima Setup Wizard"
        onClose={onClose}
        footer={<>
          <button className="alt" onClick={onClose}>Back</button>
          <button className="primary" onClick={next}>Next</button>
        </>}
      >
        <p>
            Updating the theme is simple. FF Ultima Setup Wizard will re-download
            <code>theme files</code> &amp; <code>userchromejs files</code> into this profiles <code>chrome</code> folder. 
            Please ensure the Wizard is operating within your target chrome folder. 
            1 minute and 1 click, is all you need.
        </p>
        <p className="note">Note: the Theme is downloaded through Github direct link (github.com/soulhotel/FF-Ultima/archive/refs/heads/main.zip). Theme files will be overwritten but other files in your chrome folder will not be touched. Git or other dependencies are not required.</p>
      </Modal>
    );
  }

  if (!S) return <Modal className="update-modal step-2" title="FF Ultima Setup Wizard"><p><SpinnerIcon/></p></Modal>;

  const footer =
    fin ? (<>
      <button className="alt" onClick={() => onFinish(false)}>Done</button>
      <button className="primary" onClick={restartNow} disabled={!S.firefoxOK} title={S.firefoxOK ? undefined : 'Firefox location not detected'}>Restart now</button>
    </>)
  : bad ? <button className="primary" onClick={onClose}>Close</button>
  : null;

  const closeX = (!begun || finished) ? (fin ? () => onFinish(false) : onClose) : null;

  return (
    <Modal className="update-modal step-2" title="FF Ultima Setup Wizard" onClose={closeX} footer={footer}>
      <p>Please keep the Setup Wizard open until all progress is complete.</p>
      <div className="r">chrome folder detected <Check ok={S.chromeOK}/></div>
      <div className="r">profile detected {S.chromeOK && <b>{S.profileName}</b>} <Check ok={S.profileOK}/></div>
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
      {fin && <p className="ok">All done. Theme files updated.</p>}
      {fin && <p className="note">Note: If you have userChromeWatcher enabled, no restart is needed.</p>}
    </Modal>
  );
}