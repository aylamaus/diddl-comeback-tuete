/* =====================================================================
   zugang.js – einfache Passwortabfrage vor der Seite
   Zweck: Der Prototyp ist online, soll aber nicht von jedem geöffnet und
   nicht mit der echten Diddl-Seite verwechselt werden. Das ist KEIN
   Sicherheitsmechanismus (siehe README, Entscheidungslog): Das Passwort
   wird im Browser geprüft, die Seite selbst bleibt öffentlich abrufbar.

   Ablauf: Ein Inline-Skript im <head> setzt die Klasse „gesperrt“ auf
   <html>, solange im localStorage keine Freigabe liegt. Dieses Skript
   baut das Overlay, prüft die Eingabe (SHA-256-Vergleich) und blendet
   das Overlay mit einer kurzen Wellen-Animation aus.
   ===================================================================== */
(function () {
  "use strict";

  var SCHLUESSEL = "diddl_zugang_v1";
  // SHA-256 des Passworts (Kleinschreibung). Neues Passwort: Hash hier eintragen.
  var HASH = "69a81218ae9733cd8eb5de70abdaabbdab450dc41470bea4825f90a5ed133c86";

  var html = document.documentElement;

  function freigegeben() {
    try { return window.localStorage.getItem(SCHLUESSEL) === "ok"; } catch (e) { return false; }
  }
  function merken() {
    try { window.localStorage.setItem(SCHLUESSEL, "ok"); } catch (e) { /* egal */ }
  }

  // Hash-Berechnung (nur in sicheren Kontexten verfügbar: https, localhost).
  function pruefen(eingabe) {
    var wert = String(eingabe || "").trim().toLowerCase();
    if (!(window.crypto && window.crypto.subtle && window.TextEncoder)) {
      return Promise.reject(new Error("unsicherer Kontext"));
    }
    return window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(wert)).then(function (buf) {
      var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
      return hex === HASH;
    });
  }

  function overlayBauen() {
    var wrap = document.createElement("div");
    wrap.className = "zugang";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "zugang-titel");
    wrap.innerHTML =
      '<div class="zugang__karte">' +
      '  <img class="zugang__logo" src="assets/img/logo-diddl-is-back.png" alt="Diddl is back!" width="1000" height="572">' +
      '  <h1 id="zugang-titel">Pssst, hier geht es ins Käsekuchenland.</h1>' +
      '  <p>Diese Seite ist ein Studienprototyp der DHBW Mannheim und nicht die offizielle Diddl-Website. Bitte gib das Passwort ein.</p>' +
      '  <form class="zugang__form" novalidate>' +
      '    <label for="zugang-passwort">Passwort</label>' +
      '    <div class="zugang__zeile">' +
      '      <input type="password" id="zugang-passwort" name="passwort" autocomplete="current-password" autocapitalize="none" spellcheck="false" required aria-describedby="zugang-fehler">' +
      '      <button class="btn" type="submit">Hinein</button>' +
      '    </div>' +
      '    <p class="zugang__fehler" id="zugang-fehler" role="alert"></p>' +
      '  </form>' +
      '</div>' +
      '<div class="zugang__welle" aria-hidden="true"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path fill="currentColor" d="M0,44 C200,80 420,8 700,40 C980,72 1200,10 1440,44 L1440,80 L0,80 Z"/></svg></div>';
    document.body.appendChild(wrap);

    var form = wrap.querySelector("form");
    var feld = wrap.querySelector("input");
    var fehler = wrap.querySelector(".zugang__fehler");
    feld.focus();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      pruefen(feld.value).then(function (ok) {
        if (ok) {
          merken();
          oeffnen(wrap);
        } else {
          fehler.textContent = "Das war leider nicht das richtige Passwort. Bitte versuch es noch einmal.";
          wrap.classList.remove("ist-falsch");
          void wrap.offsetWidth; // Animation neu starten
          wrap.classList.add("ist-falsch");
          feld.select();
        }
      }, function () {
        fehler.textContent = "Die Prüfung braucht eine sichere Verbindung (https). Bitte die Seite über https öffnen.";
      });
    });
  }

  // Overlay hebt sich wie ein Vorhang nach oben, darunter erscheint die Seite.
  function oeffnen(wrap) {
    var reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    html.classList.remove("gesperrt");
    html.classList.add("zugang-offen");
    if (reduziert) {
      wrap.remove();
      html.classList.remove("zugang-offen");
      return;
    }
    wrap.classList.add("ist-offen");
    var hauptinhalt = document.getElementById("hauptinhalt");
    window.setTimeout(function () {
      wrap.remove();
      html.classList.remove("zugang-offen");
      if (hauptinhalt) { hauptinhalt.focus({ preventScroll: true }); }
    }, 900);
  }

  if (freigegeben()) {
    html.classList.remove("gesperrt");
    return;
  }
  html.classList.add("gesperrt");
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", overlayBauen);
  } else {
    overlayBauen();
  }
})();
