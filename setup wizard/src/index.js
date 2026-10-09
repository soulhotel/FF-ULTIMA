import { useState }       from 'react';
import { createRoot }     from 'react-dom/client';
import { Modal }          from './components/index.js';
import { InstallModal }   from './components/install.js';
import { UninstallModal } from './components/uninstall.js';
import { UpdateModal }    from './components/update.js';
import { ExitModal }      from './components/exit.js';
import { ColorScheme }    from './components/color-scheme-menu.js';
import { api }            from './hooks and such/useProgress.js';
import { dryRun }         from './hooks and such/test.js';

function Setup() {
  const [modal, setModal] = useState(null);
  const close = () => setModal(null);
  const finish = restarting => {
    if (!restarting) api('quit', {}).catch(() => {});
    setModal('exit');
  };
  return (
    <main>
      <ColorScheme />
      <div className="modal-overlay">
        {!modal && (
          <Modal
            className="entry-modal step-0"
            title="FF Ultima Setup Wizard"
            footer={<>
              <button className="primary" onClick={() => setModal('install')}>Install</button>
              <button className="un"      onClick={() => setModal('uninstall')}>Uninstall</button>
              <button className="up"      onClick={() => setModal('update')}>Update</button>
            </>}
          >
            <p>Would you like to install, uninstall, or update FF Ultima?</p>
            {dryRun && <p className="note">Note: This is a Dry Run</p>}
          </Modal>
        )}
        {modal === 'install'   && <InstallModal   onClose={close} onFinish={finish} />}
        {modal === 'uninstall' && <UninstallModal onClose={close} onFinish={finish} />}
        {modal === 'update'    && <UpdateModal    onClose={close} onFinish={finish} />}
        {modal === 'exit'      && <ExitModal />}
      </div>
    </main>
  );
}
 
createRoot(document.getElementById('root')).render(<Setup />);
