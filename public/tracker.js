// Kawaf GTM OS — Visitor Tracking Snippet (~2KB)
(function () {
  "use strict";

  var ENDPOINT = "/api/tracking/events";
  var COOKIE_NAME = "kwf_vid";
  var key = document.currentScript
    ? document.currentScript.getAttribute("data-key")
    : null;

  if (!key) return;

  // Resolve endpoint base from script src or same origin
  var scriptSrc = document.currentScript ? document.currentScript.src : "";
  var base = scriptSrc
    ? scriptSrc.replace(/\/tracker\.js.*$/, "")
    : window.location.origin;

  function getVisitorId() {
    var match = document.cookie.match(
      new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)")
    );
    if (match) return decodeURIComponent(match[1]);
    var id =
      "v_" +
      Math.random().toString(36).substring(2, 10) +
      Date.now().toString(36);
    document.cookie =
      COOKIE_NAME +
      "=" +
      encodeURIComponent(id) +
      ";path=/;max-age=" +
      60 * 60 * 24 * 365 +
      ";SameSite=Lax";
    return id;
  }

  var visitorId = getVisitorId();
  var startTime = Date.now();

  function sendEvent(data) {
    var payload = JSON.stringify(
      Object.assign(
        {
          key: key,
          visitorId: visitorId,
          pageUrl: window.location.href,
          pageTitle: document.title,
          referrer: document.referrer || null,
        },
        data
      )
    );

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        base + ENDPOINT,
        new Blob([payload], { type: "application/json" })
      );
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", base + ENDPOINT, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(payload);
    }
  }

  // Track pageview on load
  sendEvent({ type: "pageview" });

  // Track duration on unload
  window.addEventListener("beforeunload", function () {
    var duration = Math.round((Date.now() - startTime) / 1000);
    sendEvent({ type: "leave", duration: duration });
  });
})();
