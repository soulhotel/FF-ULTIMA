```
/*///////////////////////////////////////////////////////////////////////////////////////\

┏┓┏┓  ┳┳┓ ┏┳┓┳┳┳┓┏┓
┣ ┣   ┃┃┃  ┃ ┃┃┃┃┣┫
┻ ┻   ┗┛┗┛ ┻ ┻┛ ┗┛┗
                   
FF Ultima:         https://github.com/soulhotel/FF-ULTIMA
Wiki:              https://ff-ultima.github.io/docs/getting-started
Latest Version:    https://github.com/soulhotel/FF-ULTIMA/releases/latest                 
License:           https://github.com/soulhotel/FF-ULTIMA/blob/main/LICENSE MPL 2.0

\////////////////////////////////////////////////////////////////////////////////////////*/
```

About userChromeJS's role in FF Ultima:

<p>
    userChromeJS enables userChrome Companion. And userChrome Companion is a <a href="https://addons.mozilla.org/en-US/firefox/addon/userchrome-companion/">Firefox extension</a> built to bridge the gap between userChrome & custom -moz-preferences (about:config).
    UCC was originally created to provide a more smooth & comfortable experience for FF Ultima users. But it is not exclusive to one theme.
</p>
<ul>
    <li>Any theme that utilizes <code>-moz-pref</code>'s (user.js), can be used with this extension.</li>
    <li>Any theme that utilizes the <code>about:config</code> page to toggle settings, can be used with this extension.</li>
    <li>Any moz-pref (custom or native to Firefox) (like legacyUserProfileCustomizations.stylesheets) can be toggled with this extension.</li>
</ul>
<p>
    And this is all done with just one (really, just one) one-time-setup.
</p>

---

More on userChrome Companion:

<p>  
    Normally, We userChrome Enjoyers, would have to manage & update user.js files ourselves. Then visit the about:config page. Then switch between different preferences. 
    Then we'd have to search & toggle certain -moz-pref's `off` depending on any conflicting -moz-pref that might be `on`.
</p>
<p>  
    The extension makes this (and more) a lot easier by letting us manage & organize any -moz-preferences - straight from the sidebar. 
    With folders, presets, and conflicting -moz-prefs identified.. 
    All that's left for us to do is open the sidebar, click an option, and your new userChrome style is set.
</p>
<p> 
    Linking to Presets is simple: enter a link to a <code>user.js</code> or <code>ucc.json</code> file (like <code>https://github.com/someones/repo/user.js</code>). Then select the preset..
    And linked Presets can be monitored for changes, meaning automatic up-to-date settings (without overwriting your personal configs)..
    Presets can also be created and imported from your own local files.
    Like mentioned above, the extension is not limited to custom preferences,
    so Presets can be used to toggle between whatever you want; from privacy configs, to userChrome styles.
    Like the name implies, Presets let you quickly switch between themes, settings, or layouts.
</p>

---

<p>
    Under the hood, UserChrome Companion is built to simply broadcast events onto itself, 
    and the userChromeJS side of things watches the extension events and reacts appropriately.
    The extension by itself (like any other extension) doesn't have the privilege of interacting with moz-preferences.
    And that's a good thing, because in accordance to Mozilla policies, we shouldn't even try to access elevated privilege from it.
    The extension can technically function on it's own like a personal bookmark, but it requires userChromeJS to actually act on toggling preferences.
</p>
<p>
    To learn more about userChrome Companion, <a href="https://github.com/soulhotel/userChrome-Companion">click here</a>.
</p>
