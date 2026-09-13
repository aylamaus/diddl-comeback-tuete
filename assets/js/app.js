/* =====================================================================
   app.js – auf jeder Seite geladen
   Header (Burger-Menü, Warenkorb-Badge), Warenkorb-Zustand im
   localStorage, Toast, Consent-Banner, Newsletter-Formular, Akkordeons.
   Kein Framework, keine Abhängigkeiten. Alles hängt an window.DIDDL.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.DIDDL || {};
  var SCHLUESSEL = D.speicherSchluessel || {
    warenkorb: "diddl_warenkorb_v1",
    consent: "diddl_consent_v1",
    bestellung: "diddl_letzte_bestellung_v1"
  };

  /* ---------- Hilfsfunktionen ---------- */

  // Preis aus Cent als deutschen Betrag formatieren: 1999 -> "19,99 €"
  function euro(cent) {
    var betrag = (cent / 100).toFixed(2).replace(".", ",");
    return betrag + " €";
  }

  // Sicheres Lesen aus dem localStorage (kann bei blockiertem Storage werfen)
  function lesen(schluessel) {
    try {
      var roh = window.localStorage.getItem(schluessel);
      return roh ? JSON.parse(roh) : null;
    } catch (e) {
      return null;
    }
  }

  // Sicheres Schreiben, gibt true zurück, wenn es geklappt hat
  function schreiben(schluessel, wert) {
    try {
      window.localStorage.setItem(schluessel, JSON.stringify(wert));
      return true;
    } catch (e) {
      return false;
    }
  }

  function entfernen(schluessel) {
    try {
      window.localStorage.removeItem(schluessel);
    } catch (e) { /* ignorieren */ }
  }

  /* ---------- Warenkorb ----------
     Format im Storage: [{ "id": "comeback-tuete", "menge": 2 }]
     Stammdaten (Name, Preis, Bild) kommen immer aus data.js. */

  var warenkorbCache = null;

  function warenkorbLaden() {
    if (warenkorbCache) { return warenkorbCache; }
    var daten = lesen(SCHLUESSEL.warenkorb);
    var liste = Array.isArray(daten) ? daten : [];
    // nur gültige Einträge übernehmen, die es auch in data.js gibt
    warenkorbCache = liste.filter(function (p) {
      return p && typeof p.id === "string" && D.produkte && D.produkte[p.id] && p.menge > 0;
    }).map(function (p) {
      return { id: p.id, menge: Math.min(Math.floor(p.menge), D.produkte[p.id].mengeMax || 99) };
    });
    return warenkorbCache;
  }

  function warenkorbSpeichern(liste) {
    warenkorbCache = liste;
    schreiben(SCHLUESSEL.warenkorb, liste);
    badgeAktualisieren();
  }

  function warenkorbAnzahl() {
    return warenkorbLaden().reduce(function (summe, p) { return summe + p.menge; }, 0);
  }

  function warenkorbHinzufuegen(id, menge) {
    var liste = warenkorbLaden().slice();
    var max = (D.produkte[id] && D.produkte[id].mengeMax) || 99;
    var vorhanden = liste.filter(function (p) { return p.id === id; })[0];
    if (vorhanden) {
      vorhanden.menge = Math.min(max, vorhanden.menge + menge);
    } else {
      liste.push({ id: id, menge: Math.min(max, menge) });
    }
    warenkorbSpeichern(liste);
    return liste;
  }

  function warenkorbMengeSetzen(id, menge) {
    var liste = warenkorbLaden().slice();
    var max = (D.produkte[id] && D.produkte[id].mengeMax) || 99;
    liste.forEach(function (p) {
      if (p.id === id) { p.menge = Math.max(1, Math.min(max, menge)); }
    });
    warenkorbSpeichern(liste);
    return liste;
  }

  function warenkorbEntfernen(id) {
    var liste = warenkorbLaden().filter(function (p) { return p.id !== id; });
    warenkorbSpeichern(liste);
    return liste;
  }

  function warenkorbLeeren() {
    warenkorbSpeichern([]);
  }

  function badgeAktualisieren() {
    var badge = document.querySelector("[data-korb-badge]");
    if (!badge) { return; }
    var anzahl = warenkorbAnzahl();
    badge.textContent = anzahl;
    badge.hidden = anzahl === 0;
    var button = badge.closest("a");
    if (button) {
      button.setAttribute("aria-label", "Warenkorb, " + anzahl + (anzahl === 1 ? " Artikel" : " Artikel"));
    }
  }

  /* ---------- Toast ---------- */

  var toastTimer = null;

  function toast(text, linkText, linkZiel) {
    var alt = document.querySelector(".toast");
    if (alt) { alt.remove(); }
    var el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");

    var p = document.createElement("p");
    p.textContent = text + " ";
    if (linkText && linkZiel) {
      var a = document.createElement("a");
      a.href = linkZiel;
      a.textContent = linkText;
      p.appendChild(a);
    }
    var schliessen = document.createElement("button");
    schliessen.type = "button";
    schliessen.className = "toast__schliessen";
    schliessen.setAttribute("aria-label", "Hinweis schließen");
    schliessen.innerHTML = "&times;";
    schliessen.addEventListener("click", toastSchliessen);

    el.appendChild(p);
    el.appendChild(schliessen);
    document.body.appendChild(el);

    clearTimeout(toastTimer);
    toastTimer = setTimeout(toastSchliessen, 6000);
  }

  function toastSchliessen() {
    var el = document.querySelector(".toast");
    if (el) { el.remove(); }
    clearTimeout(toastTimer);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { toastSchliessen(); }
  });

  /* ---------- Header: Burger-Menü ---------- */

  function headerInit() {
    var burger = document.querySelector("[data-burger]");
    var nav = document.getElementById("hauptnavigation");
    if (!burger || !nav) { return; }

    var mq = window.matchMedia("(min-width: 48em)");

    function schliessen() {
      burger.setAttribute("aria-expanded", "false");
      if (!mq.matches) { nav.hidden = true; }
    }
    function oeffnen() {
      burger.setAttribute("aria-expanded", "true");
      nav.hidden = false;
    }
    function anpassen() {
      if (mq.matches) {
        nav.hidden = false;
        burger.setAttribute("aria-expanded", "false");
      } else {
        nav.hidden = burger.getAttribute("aria-expanded") !== "true";
      }
    }

    burger.addEventListener("click", function () {
      if (burger.getAttribute("aria-expanded") === "true") { schliessen(); } else { oeffnen(); }
    });
    nav.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { schliessen(); burger.focus(); }
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { if (!mq.matches) { schliessen(); } });
    });
    if (mq.addEventListener) { mq.addEventListener("change", anpassen); } else { mq.addListener(anpassen); }
    anpassen();
  }


  /* ---------- Karussell (Über Diddl, Produktgalerie) ----------
     Erwartet: container mit [data-slide]-Elementen, optional Buttons
     [data-karussell-zurueck], [data-karussell-vor] und Punkte
     [data-karussell-punkt="index"]. Ohne JS stehen alle Slides
     untereinander (die Klasse ist-aktiv schaltet die Anzeige um). */

  function karussell(container) {
    if (!container) { return null; }
    var slides = Array.prototype.slice.call(container.querySelectorAll("[data-slide]"));
    if (slides.length < 2) { return null; }
    var punkte = Array.prototype.slice.call(container.querySelectorAll("[data-karussell-punkt]"));
    var zurueck = container.querySelector("[data-karussell-zurueck]");
    var vor = container.querySelector("[data-karussell-vor]");
    var status = container.querySelector("[data-karussell-status]");
    var aktuell = 0;

    function gehe(index, fokus) {
      aktuell = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var sichtbar = i === aktuell;
        s.classList.toggle("ist-sichtbar", sichtbar);
        s.setAttribute("aria-hidden", sichtbar ? "false" : "true");
      });
      punkte.forEach(function (p, i) {
        if (i === aktuell) { p.setAttribute("aria-current", "true"); } else { p.removeAttribute("aria-current"); }
      });
      if (status) { status.textContent = "Slide " + (aktuell + 1) + " von " + slides.length; }
      if (fokus && punkte[aktuell]) { punkte[aktuell].focus(); }
    }

    if (zurueck) { zurueck.addEventListener("click", function () { gehe(aktuell - 1); }); }
    if (vor) { vor.addEventListener("click", function () { gehe(aktuell + 1); }); }
    punkte.forEach(function (p, i) {
      p.addEventListener("click", function () { gehe(i); });
    });

    // Pfeiltasten, wenn der Fokus irgendwo im Karussell liegt
    container.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); gehe(aktuell - 1, true); }
      if (e.key === "ArrowRight") { e.preventDefault(); gehe(aktuell + 1, true); }
    });

    // Wischgeste auf Touch-Geräten
    var startX = null;
    container.addEventListener("touchstart", function (e) {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    container.addEventListener("touchend", function (e) {
      if (startX === null) { return; }
      var delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) { gehe(delta < 0 ? aktuell + 1 : aktuell - 1); }
      startX = null;
    }, { passive: true });

    container.classList.add("ist-aktiv");
    gehe(0);
    return { gehe: gehe, aktuell: function () { return aktuell; } };
  }

  function karussellInit() {
    document.querySelectorAll("[data-karussell]").forEach(function (el) { karussell(el); });
  }

  /* ---------- Akkordeon (Produktseite, FAQ) ----------
     Ohne JS sind alle Inhalte offen. Mit JS: Buttons steuern hidden. */

  function akkordeonInit() {
    document.querySelectorAll("[data-akkordeon]").forEach(function (akk) {
      akk.classList.add("ist-aktiv");
      akk.querySelectorAll(".akkordeon__knopf").forEach(function (knopf, index) {
        var inhalt = document.getElementById(knopf.getAttribute("aria-controls"));
        if (!inhalt) { return; }
        var offen = knopf.hasAttribute("data-offen") || (akk.hasAttribute("data-erster-offen") && index === 0);
        knopf.setAttribute("aria-expanded", offen ? "true" : "false");
        inhalt.hidden = !offen;
        knopf.addEventListener("click", function () {
          var istOffen = knopf.getAttribute("aria-expanded") === "true";
          knopf.setAttribute("aria-expanded", istOffen ? "false" : "true");
          inhalt.hidden = istOffen;
        });
      });
    });
  }

  /* ---------- Newsletter (nur Frontend, kein Backend) ---------- */

  function newsletterInit() {
    var form = document.querySelector("[data-newsletter]");
    if (!form) { return; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var erfolg = form.querySelector("[data-newsletter-erfolg]");
      if (erfolg) {
        erfolg.hidden = false;
        erfolg.focus();
      }
      form.querySelector("button[type=submit]").disabled = true;
    });
  }

  /* ---------- Consent-Banner ----------
     Setzt nur eine Variable (DIDDL.trackingErlaubt). Es gibt aktuell kein
     Tracking, das Banner ist Vorbereitung und Dokumentation. */

  function consentInit() {
    var banner = document.querySelector("[data-consent]");
    if (!banner) { return; }
    var gespeichert = lesen(SCHLUESSEL.consent);
    D.trackingErlaubt = gespeichert === "alle";

    function zeigen() {
      banner.hidden = false;
      var erster = banner.querySelector("button");
      if (erster) { erster.focus(); }
    }
    function wahl(wert) {
      schreiben(SCHLUESSEL.consent, wert);
      D.trackingErlaubt = wert === "alle";
      banner.hidden = true;
    }

    banner.querySelectorAll("[data-consent-wahl]").forEach(function (btn) {
      btn.addEventListener("click", function () { wahl(btn.getAttribute("data-consent-wahl")); });
    });
    document.querySelectorAll("[data-consent-oeffnen]").forEach(function (btn) {
      btn.addEventListener("click", function (e) { e.preventDefault(); zeigen(); });
    });

    if (gespeichert !== "alle" && gespeichert !== "notwendig") {
      zeigen();
    }
  }

  /* ---------- Aktuelle Seite in der Navigation markieren ---------- */

  function navMarkieren() {
    var datei = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__link").forEach(function (a) {
      var ziel = a.getAttribute("href").split("#")[0];
      if (ziel && ziel === datei) { a.setAttribute("aria-current", "page"); }
    });
  }

  /* ---------- Start ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    headerInit();
    badgeAktualisieren();
    karussellInit();
    akkordeonInit();
    newsletterInit();
    consentInit();
    navMarkieren();
  });

  // Öffentliche Schnittstelle für die anderen Skripte
  D.app = {
    euro: euro,
    lesen: lesen,
    schreiben: schreiben,
    entfernen: entfernen,
    schluessel: SCHLUESSEL,
    warenkorb: {
      laden: warenkorbLaden,
      anzahl: warenkorbAnzahl,
      hinzufuegen: warenkorbHinzufuegen,
      mengeSetzen: warenkorbMengeSetzen,
      entfernen: warenkorbEntfernen,
      leeren: warenkorbLeeren
    },
    toast: toast,
    karussell: karussell,
    badgeAktualisieren: badgeAktualisieren
  };
  window.DIDDL = D;
})();
