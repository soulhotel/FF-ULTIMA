const liveActors = new Set();
const observers = new Map(); // prefName -> observer

function readPref(name) {
  const type = Services.prefs.getPrefType(name);
  if (type === Services.prefs.PREF_BOOL) return { exists: true, value: Services.prefs.getBoolPref(name) };
  if (type === Services.prefs.PREF_INVALID) return { exists: false };
  return null;
}

function broadcast(name, value) {
  for (const actor of liveActors) {
    if (!actor._watched?.has(name)) continue;
    try {
      actor.sendAsyncMessage("PrefChanged", { name, value });
    } catch (ex) { }
  }
}

function ensureObserver(name) {
  if (observers.has(name)) return;
  const observer = {
    observe(_subject, topic, data) {
      if (topic !== "nsPref:changed" || data !== name) return;
      const pref = readPref(name);
      if (pref === null) return;
      broadcast(name, pref.exists ? pref.value : false);
    },
  };
  Services.prefs.addObserver(name, observer);
  observers.set(name, observer);
}

function releaseObserverIfUnused(name) {
  for (const actor of liveActors) {
    if (actor._watched?.has(name)) return;
  }
  const observer = observers.get(name);
  if (observer) {
    Services.prefs.removeObserver(name, observer);
    observers.delete(name);
  }
}

export class UCCBridgeParent extends JSWindowActorParent {
  watch(name) {
    (this._watched ??= new Set()).add(name);
    liveActors.add(this);
    ensureObserver(name);
  }
  unwatch(name) {
    this._watched?.delete(name);
    releaseObserverIfUnused(name);
  }
  didDestroy() {
    const names = [...(this._watched || [])];
    liveActors.delete(this);
    this._watched = null;
    for (const name of names) releaseObserverIfUnused(name);
  }
  receiveMessage(msg) {
    switch (msg.name) {
      case "Ping":
        return { ok: true };
      case "SetPrefs": {
        const { changes } = msg.data || {};
        for (const [name, value] of Object.entries(changes || {})) {
          if (typeof name !== "string" || !name.trim()) continue;
          this.watch(name);
          try { Services.prefs.setBoolPref(name, !!value); }
          // console.log(`[UCCBridge][parent] ${name} = ${!!value}`);
          catch (ex) { console.error(`[userChromeCompanion][bridge][parent] failed to set "${name}"`, ex); }
        }
        break;
      }

      case "DeletePrefs": {
        const { names } = msg.data || {};
        for (const name of names || []) {
          if (typeof name !== "string" || !name.trim()) continue;
          this.unwatch(name);
          try { Services.prefs.clearUserPref(name); } 
          catch (ex) { }
        }
        break;
      }

      case "GetPrefValues": {
        const { requestId, names } = msg.data || {};
        const values = {};
        for (const name of names || []) {
          if (typeof name !== "string" || !name.trim()) continue;
          this.watch(name);
          const pref = readPref(name);
          values[name] = pref?.exists ? pref.value : null;
        }
        return { requestId, values };
      }
    }
  }
}

// fortunately moz-prefs *that are not custom* gracefully return to default with clearuserpref