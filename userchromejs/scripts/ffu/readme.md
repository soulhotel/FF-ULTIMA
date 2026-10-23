# About ffu.js scripts

This ffu/ folder contains various scripts sourced from the userChrome JS community, or created by me. The scripts have been optimized for FF Ultima, either in functionality or general cleanup (many lacked destroy logic to prevent memory leaks). The scripts also feature a @pref (moz-pref) entry in their headers, allowing them to be enabled/disabled via about:config or the UCC extension.

All scripts are loaded via `../loader.ffu.uc.js`. Scripts are loaded from the same directory as the loader (chrome/userchromejs/scripts/), or this directory (chrome/userchromejs/scripts/ffu/).

Scripts all follow the following contracted format:

- A `*.ffu.js` file extension.
- A `@pref` in header. Allows the script to be toggled on/off via -moz-pref.
- A `ffuDisableScript` function. That cleans the script up on destroy/unload (many userchromejs scripts dont cleanup after themselves, which isn't good, leads to memory leaks).