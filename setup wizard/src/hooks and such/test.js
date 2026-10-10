// add ?dry=1 to the URL to test

const DRY_RUN = false;

export const dryRun = DRY_RUN || new URLSearchParams(location.search).has('dry');

const STEPS = [
  { id: 'download',  label: 'Downloading FF Ultima' },
  { id: 'copy',      label: 'Installing FF Ultima files' },
  { id: 'companion', label: 'Installing userChrome Companion' },
  { id: 'ucjs',      label: 'Setting up userChromeJS' },
];
const UPDATE_STEPS = [
  { id: 'download', label: 'Downloading FF Ultima' },
  { id: 'copy',     label: 'Updating FF Ultima files' },
];
const UNINSTALL_STEPS = [
  { id: 'list',     label: 'Reading FF Ultima file list' },
  { id: 'ucjs',     label: 'Removing userChromeJS' },
  { id: 'files',    label: 'Removing FF Ultima files' },
];
const STEP_MS = 1500;
 
const delay = ms => new Promise(r => setTimeout(r, ms));
 
let steps = [];
let running = false;
 
async function runJob(list) {
  running = true;
  steps = list.map(s => ({ ...s, state: 'pending', msg: '', pct: -1 }));
  for (const s of steps) {
    s.state = 'running';
    await delay(STEP_MS);
    s.state = 'done';
  }
  running = false;
}

const PROFILES = [
  { name: 'default-release', dir: '/dry-run/profiles/default-release', hasChrome: true },
  { name: 'dev-edition-default', dir: '/dry-run/profiles/dev-edition-default', hasChrome: false },
];
let currentProfile = PROFILES[0];
 
export async function mockApi(path, body) {
  await delay(120);
  switch (path) {
    case 'state':
      return {
        chromeDir: '/dry-run/chrome', chromeOK: true,
        profileName: currentProfile.name, profileOK: true,
        profileDir: currentProfile.dir, profiles: PROFILES,
        firefoxDir: '/usr/lib/firefox', firefoxOK: true,
        firefoxName: 'Firefox Nightly', firefoxVersion: '134.0a1', firefoxNote: '',
        steps: steps.map(s => ({ ...s })), running,
      };
    case 'install':
      if (!running) runJob(STEPS);
      return { ok: true };
    case 'update':
      if (!running) runJob(UPDATE_STEPS);
      return { ok: true };
    case 'uninstall':
      if (!running) runJob(UNINSTALL_STEPS);
      return { ok: true };
    case 'profile':
      currentProfile = PROFILES.find(p => p.dir === body.dir) || currentProfile;
      return { ok: true };
    case 'firefox':
    case 'restart':
    case 'quit':
      return { ok: true };
  }
  throw new Error('unknown mock endpoint: ' + path);
}
