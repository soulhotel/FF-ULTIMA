// identify userChrome Companion

function isTargetURI(uri) {
  return uri.startsWith("moz-extension://");
}
function isTargetExtension(document) {
  return document?.nodePrincipal?.addonId === "userChromeCompanion@soulhotel.net";
}
function isTarget(document) {
  const uri = document?.documentURI || "";
  return isTargetURI(uri) && isTargetExtension(document);
}

async function announceConnectionTo(actor) {
  try {
    if (!isTarget(actor.document)) return;
    // continue
    const res = await actor.sendQuery("Ping");
    if (!res?.ok) return;
    const doc = actor.document;
    const win = doc?.defaultView;
    if (!doc || !win) return;
    const detail = Cu.cloneInto({ ok: true }, win);
    doc.dispatchEvent(new win.CustomEvent("uccSupportConnected", { detail, bubbles: true }));
  } catch (ex) {}
}

function dispatchToPage(actor, eventName, payload) {
  const doc = actor.document;
  const win = doc?.defaultView;
  if (!doc || !win || !isTarget(doc)) return;

  const detail = Cu.cloneInto(payload, win);
  doc.dispatchEvent(new win.CustomEvent(eventName, { detail, bubbles: true }));
}

export class UCCBridgeChild extends JSWindowActorChild {
  actorCreated() {
    if (isTarget(this.document)) announceConnectionTo(this);
  }
  handleEvent(event) {
    if (!isTarget(this.document)) return;
    switch (event.type) {
      case "uccSetPrefs":
        this.sendAsyncMessage("SetPrefs", event.detail);
        break;
      case "uccDeletePrefs":
        this.sendAsyncMessage("DeletePrefs", event.detail);
        break;
      case "uccPing":
        announceConnectionTo(this);
        break;
      case "uccGetPrefValues":
        this.replyPrefValues(event.detail);
        break;
    }
  }
  async replyPrefValues(detail) {
    if (!isTarget(this.document)) return;
    try {
      const reply = await this.sendQuery("GetPrefValues", detail);
      dispatchToPage(this, "uccPrefValues", reply);
    } catch (ex) {}
  }
  receiveMessage(msg) {
    if (!isTarget(this.document)) return;
    if (msg.name === "PrefChanged") dispatchToPage(this, "uccPrefChanged", msg.data);
  }
}