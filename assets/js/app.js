/* =====================================================================
   app.js – auf jeder Seite geladen
   Header (Burger-Menü, Warenkorb-Badge), Warenkorb-Zustand im
   localStorage, Toast, Consent-Banner, Newsletter-Formular, Akkordeons,
   Datenbindung der Startseite. Kein Framework, keine Abhängigkeiten.
   Inhalte kommen aus daten.js (window.DIDDL), das die content/*.json lädt.
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
        if (!inhalt || knopf.hasAttribute("data-akk-init")) { return; }
        knopf.setAttribute("data-akk-init", "");
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


  /* ---------- FAQ aus data.js (faq.html) ----------
     Das HTML enthält dieselben Einträge als Fallback ohne JS. Mit JS wird
     die Liste aus DIDDL.faq neu aufgebaut, damit data.js führend bleibt. */

  function faqInit() {
    var wurzel = document.querySelector("[data-faq]");
    if (!wurzel || !Array.isArray(D.faq) || !D.faq.length) { return; }
    wurzel.innerHTML = "";
    D.faq.forEach(function (eintrag, i) {
      var id = "faq-" + (i + 1);
      var wrap = document.createElement("div");
      wrap.className = "akkordeon__eintrag";
      var h2 = document.createElement("h2");
      var knopf = document.createElement("button");
      knopf.type = "button";
      knopf.className = "akkordeon__knopf";
      knopf.setAttribute("aria-controls", id);
      knopf.setAttribute("aria-expanded", "false");
      knopf.textContent = eintrag.frage;
      knopf.insertAdjacentHTML("beforeend", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 9l6 6 6-6"/></svg>');
      h2.appendChild(knopf);
      var inhalt = document.createElement("div");
      inhalt.className = "akkordeon__inhalt";
      inhalt.id = id;
      var absaetze = Array.isArray(eintrag.antwort) ? eintrag.antwort : [eintrag.antwort];
      absaetze.forEach(function (t) {
        var p = document.createElement("p");
        p.textContent = t;
        inhalt.appendChild(p);
      });
      wrap.appendChild(h2);
      wrap.appendChild(inhalt);
      wurzel.appendChild(wrap);
    });
  }

  /* ---------- Bewertungen aus data.js (Beispielansicht) ----------
     Wie beim FAQ: statisches HTML als Fallback, mit JS aus DIDDL.bewertungen. */

  function bewertungenInit() {
    var wurzel = document.querySelector("[data-bewertungen]");
    if (!wurzel || !Array.isArray(D.bewertungen) || !D.bewertungen.length) { return; }
    if (D.bewertungenKopf) {
      textSetzen("[data-bewertungen-titel]", D.bewertungenKopf.titel);
      textSetzen("[data-bewertungen-hinweis]", D.bewertungenKopf.hinweis);
    }
    wurzel.innerHTML = "";
    D.bewertungen.forEach(function (b) {
      var li = document.createElement("li");
      li.className = "bewertung sticker-karte";
      var etikett = document.createElement("span");
      etikett.className = "bewertung__etikett";
      etikett.textContent = "Beispiel";
      var sterne = document.createElement("div");
      sterne.className = "bewertung__sterne";
      var n = Math.max(1, Math.min(5, parseInt(b.sterne, 10) || 5));
      sterne.setAttribute("role", "img");
      sterne.setAttribute("aria-label", n + " von 5 Sternen");
      for (var i = 0; i < 5; i++) {
        sterne.insertAdjacentHTML("beforeend",
          '<svg viewBox="0 0 24 24" fill="' + (i < n ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 3l2.4 5.2 5.6.7-4.1 3.9 1 5.6-4.9-2.7-4.9 2.7 1-5.6L4 8.9l5.6-.7z"/></svg>');
      }
      var text = document.createElement("p");
      text.textContent = "„" + b.text + "“";
      var name = document.createElement("p");
      name.className = "bewertung__name";
      name.textContent = b.vorname;
      li.appendChild(etikett); li.appendChild(sterne); li.appendChild(text); li.appendChild(name);
      wurzel.appendChild(li);
    });
  }

  /* ---------- Dezentes Einblenden beim Scrollen ----------
     Nur Deckkraft, einmalig; ohne IntersectionObserver oder bei
     reduzierter Bewegung bleibt alles sofort sichtbar. */

  function einblendenInit() {
    var elemente = document.querySelectorAll(".einblenden");
    if (!elemente.length) { return; }
    var reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduziert || !("IntersectionObserver" in window)) {
      elemente.forEach(function (el) { el.classList.add("ist-sichtbar"); });
      return;
    }
    var beobachter = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("ist-sichtbar");
          beobachter.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    elemente.forEach(function (el) { beobachter.observe(el); });
  }

  /* ---------- Datenbindung (Startseite, Quiz-Kopf) ----------
     Elemente mit data-inhalt="pfad.zum.feld" bekommen den Text aus
     DIDDL.startseite; data-inhalt-bild setzt src und alt; data-inhalt-link
     setzt href. Mehrere Absätze (Leerzeile im Text) werden zu mehreren <p>. */

  function textSetzen(selector, text) {
    var el = document.querySelector(selector);
    if (el && text) { el.textContent = text; }
  }

  function pfad(obj, weg) {
    return String(weg).split(".").reduce(function (o, k) { return (o && o[k] !== undefined) ? o[k] : undefined; }, obj);
  }

  function inhalteBinden() {
    var quelle = { startseite: D.startseite, quiz: D.quiz, kampagne: D.kampagne };
    document.querySelectorAll("[data-inhalt]").forEach(function (el) {
      var wert = pfad(quelle, el.getAttribute("data-inhalt"));
      if (wert === undefined || wert === null) { return; }
      var text = String(wert);
      if (el.hasAttribute("data-inhalt-absaetze")) {
        el.innerHTML = "";
        text.split(/\n\s*\n/).forEach(function (t) {
          if (!t.trim()) { return; }
          var p = document.createElement("p");
          p.textContent = t.trim();
          el.appendChild(p);
        });
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll("[data-inhalt-bild]").forEach(function (img) {
      var src = pfad(quelle, img.getAttribute("data-inhalt-bild"));
      var alt = pfad(quelle, img.getAttribute("data-inhalt-alt") || "");
      if (src) { img.src = src; }
      if (typeof alt === "string") { img.alt = alt; }
    });
    document.querySelectorAll("[data-inhalt-link]").forEach(function (a) {
      var href = pfad(quelle, a.getAttribute("data-inhalt-link"));
      var text = pfad(quelle, a.getAttribute("data-inhalt-linktext") || "");
      if (href) { a.href = href; a.hidden = false; } else if (a.hasAttribute("data-inhalt-linktext")) { a.hidden = true; }
      if (text) { a.textContent = text; }
      if (href && /^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; } else { a.removeAttribute("target"); }
    });
  }

  /* ---------- Newsletter (nur Frontend, kein Backend) ---------- */

  function newsletterInit() {
    document.querySelectorAll("[data-newsletter]").forEach(newsletterFormular);
  }

  function newsletterFormular(form) {
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

    function zeigen(fokus) {
      banner.hidden = false;
      var erster = banner.querySelector("button");
      if (fokus && erster) { erster.focus(); }
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
      btn.addEventListener("click", function (e) { e.preventDefault(); zeigen(true); });
    });

    if (gespeichert !== "alle" && gespeichert !== "notwendig") {
      zeigen(false);
    }
  }

  /* ---------- Aktuelle Seite in der Navigation markieren ---------- */

  function navMarkieren() {
    var datei = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav__link").forEach(function (a) {
      var href = a.getAttribute("href");
      // Anker-Links (index.html#…) nicht markieren, sonst wären auf der
      // Startseite zwei Punkte gleichzeitig „aktuell“
      if (href.indexOf("#") === -1 && href === datei) { a.setAttribute("aria-current", "page"); }
    });
  }

  /* ---------- Start ---------- */

  // Teil 1: alles, was keine Inhalte braucht
  document.addEventListener("DOMContentLoaded", function () {
    headerInit();
    karussellInit();
    akkordeonInit();
    einblendenInit();
    newsletterInit();
    consentInit();
    navMarkieren();
  });

  // Teil 2: sobald content/*.json geladen ist (daten.js)
  function datenInit() {
    inhalteBinden();
    badgeAktualisieren();
    faqInit();
    bewertungenInit();
    akkordeonInit(); // neu aufgebaute FAQ-Einträge
  }
  if (D.wennBereit) { D.wennBereit(datenInit); }

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
