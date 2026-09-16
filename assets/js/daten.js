/* =====================================================================
   daten.js – lädt die Inhalte aus content/*.json
   Die JSON-Dateien werden über das CMS (admin/) gepflegt. Dieses Skript
   holt sie per fetch, bringt sie in die Form, die die anderen Skripte
   erwarten (window.DIDDL), und meldet „diddl:bereit“, sobald Daten und
   DOM da sind. Schlägt das Laden fehl (z. B. beim Öffnen per file://),
   bleibt der statische Fallback-Inhalt der HTML-Seiten stehen.
   ===================================================================== */
(function () {
  "use strict";

  // Das Objekt wird sofort angelegt, damit app.js & Co. es referenzieren
  // können; die Inhalte kommen später in dasselbe Objekt.
  var D = window.DIDDL = {
    geladen: false,
    speicherSchluessel: {
      warenkorb: "diddl_warenkorb_v1",
      consent: "diddl_consent_v1",
      bestellung: "diddl_letzte_bestellung_v1"
    }
  };

  var DATEIEN = ["startseite", "produkt", "einstellungen", "faq", "quiz", "bewertungen"];

  function hole(name) {
    return fetch("content/" + name + ".json", { cache: "no-cache" }).then(function (r) {
      if (!r.ok) { throw new Error(name + ": " + r.status); }
      return r.json();
    });
  }

  function cent(euro) {
    return Math.round(Number(String(euro).replace(",", ".")) * 100);
  }

  function absaetze(text) {
    if (Array.isArray(text)) { return text; }
    return String(text || "").split(/\n\s*\n/).map(function (t) { return t.trim(); }).filter(Boolean);
  }

  // Bringt die CMS-Struktur in die interne Form (Preise in Cent, Figuren als Map …)
  function umformen(r) {
    var p = r.produkt;
    D.startseite = r.startseite;
    D.produkte = {};
    D.produkte[p.id] = {
      id: p.id,
      name: p.name,
      kurz: p.kurz,
      preisCent: cent(p.preisEuro),
      mwstProzent: Number(p.mwstProzent) || 19,
      warenwertMindestensCent: cent(p.warenwertMindestensEuro),
      mengeMax: Number(p.mengeMax) || 5,
      bild: p.bild,
      beschreibung: (p.beschreibung || []).map(function (a) { return typeof a === "string" ? a : a.absatz; }),
      details: p.details || [],
      garantiertEnthalten: (p.garantiertEnthalten || []).map(function (a) { return typeof a === "string" ? a : a.artikel; }),
      galerie: p.galerie || []
    };
    D.versand = {
      kostenCent: cent(r.einstellungen.versand.kostenEuro),
      lieferzeitText: r.einstellungen.versand.lieferzeitText,
      laender: (r.einstellungen.versand.laender || []).map(function (l) { return typeof l === "string" ? l : l.land; }),
      zahlungsarten: r.einstellungen.versand.zahlungsarten || []
    };
    D.kampagne = r.einstellungen.kampagne;
    D.faq = (r.faq.eintraege || []).map(function (e) { return { frage: e.frage, antwort: absaetze(e.antwort) }; });
    D.bewertungen = r.bewertungen.eintraege || [];
    D.bewertungenKopf = { titel: r.bewertungen.titel, hinweis: r.bewertungen.hinweis };

    var figuren = {};
    (r.quiz.figuren || []).forEach(function (f) { figuren[f.id] = f; });
    D.quiz = {
      titelZeile: r.quiz.titelZeile,
      frageTitel: r.quiz.titel,
      einleitung: r.quiz.einleitung,
      kopfbild: { src: r.quiz.kopfbild, alt: r.quiz.kopfbildAlt || "" },
      figuren: figuren,
      fragen: r.quiz.fragen || []
    };
    D.geladen = true;
  }

  var domBereit = new Promise(function (loesen) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { loesen(); });
    } else { loesen(); }
  });

  var daten = Promise.all(DATEIEN.map(hole)).then(function (liste) {
    var r = {};
    DATEIEN.forEach(function (name, i) { r[name] = liste[i]; });
    umformen(r);
  });

  Promise.all([daten, domBereit]).then(function () {
    document.dispatchEvent(new CustomEvent("diddl:bereit"));
  }, function (fehler) {
    // Ohne Daten bleibt die Seite statisch lesbar; Warenkorb und Quiz entfallen.
    if (window.console) { console.warn("Inhalte konnten nicht geladen werden:", fehler); }
    domBereit.then(function () { document.dispatchEvent(new CustomEvent("diddl:fehler")); });
  });

  // Hilfsfunktion für die anderen Skripte: Callback läuft, sobald Daten + DOM da sind
  D.wennBereit = function (fn) {
    if (D.geladen && document.readyState !== "loading") { fn(); return; }
    document.addEventListener("diddl:bereit", fn, { once: true });
  };
})();
