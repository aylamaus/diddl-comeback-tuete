/* =====================================================================
   warenkorb.js – Warenkorb, Checkout in drei Schritten, Bestätigung
   Zustand liegt im localStorage (siehe app.js). Produktstammdaten kommen
   ausschließlich aus data.js. Es werden keine Daten übertragen.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.DIDDL || {};
  var app = D.app;
  if (!app) { return; }

  var euro = app.euro;
  var versandCent = 0;

  /* =====================================================================
     Teil A: Bestätigungsseite (bestellbestaetigung.html)
     ===================================================================== */
  function bestaetigungInit() {
    var nummerEl = document.querySelector("[data-bestellung-nummer]");
    if (!nummerEl) { return false; }
    var bestellung = app.lesen(app.schluessel.bestellung);
    if (bestellung && bestellung.nummer) {
      nummerEl.textContent = bestellung.nummer;
      var nameEl = document.querySelector("[data-bestellung-name]");
      if (nameEl && bestellung.vorname) { nameEl.textContent = bestellung.vorname; }
    } else {
      nummerEl.textContent = bestellnummerErzeugen();
    }
    // Kampagnendaten aus data.js
    if (D.kampagne) {
      var tag = document.querySelector("[data-kampagne-hashtag]");
      if (tag && D.kampagne.hashtag) { tag.textContent = D.kampagne.hashtag; }
      var ig = document.querySelector("[data-kampagne-instagram]");
      if (ig && D.kampagne.instagram) { ig.href = D.kampagne.instagram; }
      var tt = document.querySelector("[data-kampagne-tiktok]");
      if (tt && D.kampagne.tiktok) { tt.href = D.kampagne.tiktok; }
    }
    return true;
  }

  function bestellnummerErzeugen() {
    var d = new Date();
    var datum = String(d.getFullYear()) + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2);
    var zufall = Math.floor(1000 + Math.random() * 9000);
    return "DIDDL-" + datum + "-" + zufall;
  }

  /* =====================================================================
     Teil B: Warenkorb und Checkout (warenkorb.html)
     ===================================================================== */
  var schritte = {};
  var marken = {};
  var formularDaten = null;

  function checkoutInit() {
    var wurzel = document.querySelector("[data-schritt='1']");
    if (!wurzel) { return; }

    [1, 2, 3].forEach(function (n) {
      schritte[n] = document.querySelector("[data-schritt='" + n + "']");
      marken[n] = document.querySelector("[data-schritt-marke='" + n + "']");
    });

    warenkorbRendern();

    document.querySelectorAll("[data-weiter]").forEach(function (btn) {
      btn.addEventListener("click", function () { schrittZeigen(parseInt(btn.getAttribute("data-weiter"), 10)); });
    });
    document.querySelectorAll("[data-zurueck]").forEach(function (btn) {
      btn.addEventListener("click", function () { schrittZeigen(parseInt(btn.getAttribute("data-zurueck"), 10)); });
    });

    var form = document.querySelector("[data-checkout-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (formularPruefen(form)) {
          formularDaten = formularLesen(form);
          zusammenfassungRendern();
          schrittZeigen(3);
        }
      });
      // Fehler beim Tippen wieder entfernen
      form.querySelectorAll("input, select").forEach(function (feld) {
        feld.addEventListener("input", function () { fehlerSetzen(feld.name, ""); });
        feld.addEventListener("change", function () { fehlerSetzen(feld.name, ""); });
      });
    }

    var bestellen = document.querySelector("[data-bestellen-form]");
    if (bestellen) {
      bestellen.addEventListener("submit", function (e) {
        e.preventDefault();
        var box = bestellen.querySelector("#kenntnis");
        if (!box.checked) {
          fehlerSetzen("kenntnis", "Bitte bestätige, dass du Widerrufsbelehrung und Datenschutzerklärung zur Kenntnis genommen hast.");
          box.focus();
          return;
        }
        fehlerSetzen("kenntnis", "");
        bestellungAbschliessen();
      });
      var box = bestellen.querySelector("#kenntnis");
      if (box) { box.addEventListener("change", function () { fehlerSetzen("kenntnis", ""); }); }
    }
  }

  /* ---------- Schritt 1: Warenkorb ---------- */

  function warenkorbRendern() {
    var liste = app.warenkorb.laden();
    var leer = document.querySelector("[data-warenkorb-leer]");
    var voll = document.querySelector("[data-warenkorb-voll]");
    var container = document.querySelector("[data-warenkorb-liste]");
    if (!container) { return; }

    if (!liste.length) {
      leer.hidden = false;
      voll.hidden = true;
      return;
    }
    leer.hidden = true;
    voll.hidden = false;
    container.innerHTML = "";

    var zwischen = 0;
    liste.forEach(function (position) {
      var p = D.produkte[position.id];
      var summe = p.preisCent * position.menge;
      zwischen += summe;

      var artikel = document.createElement("article");
      artikel.className = "artikel";
      artikel.setAttribute("aria-label", p.name);

      var bild = document.createElement("div");
      bild.className = "artikel__bild";
      var img = document.createElement("img");
      img.src = p.bild; img.alt = ""; img.width = 200; img.height = 200; img.loading = "lazy";
      bild.appendChild(img);

      var info = document.createElement("div");
      var name = document.createElement("p"); name.className = "artikel__name"; name.textContent = p.name;
      var preis = document.createElement("p"); preis.className = "artikel__preis"; preis.textContent = euro(p.preisCent) + " pro Stück";
      var aktionen = document.createElement("div"); aktionen.className = "artikel__aktionen";
      aktionen.appendChild(mengenSteuerung(position, p));
      var entfernen = document.createElement("button");
      entfernen.type = "button"; entfernen.className = "artikel__entfernen"; entfernen.textContent = "Entfernen";
      entfernen.setAttribute("aria-label", p.name + " entfernen");
      entfernen.addEventListener("click", function () {
        app.warenkorb.entfernen(p.id);
        warenkorbRendern();
        var titel = document.getElementById("schritt1-titel");
        if (titel) { titel.focus(); }
      });
      aktionen.appendChild(entfernen);
      info.appendChild(name); info.appendChild(preis); info.appendChild(aktionen);

      var summeEl = document.createElement("p");
      summeEl.className = "artikel__summe";
      summeEl.textContent = euro(summe);

      artikel.appendChild(bild); artikel.appendChild(info); artikel.appendChild(summeEl);
      container.appendChild(artikel);
    });

    setzeText("[data-summe-zwischen]", euro(zwischen));
    setzeText("[data-summe-versand]", euro(versandCent));
    setzeText("[data-summe-gesamt]", euro(zwischen + versandCent));
  }

  function mengenSteuerung(position, p) {
    var max = p.mengeMax || 99;
    var wrap = document.createElement("div");
    wrap.className = "menge";
    var steuerung = document.createElement("div");
    steuerung.className = "menge__steuerung";

    var minus = document.createElement("button");
    minus.type = "button"; minus.className = "menge__knopf"; minus.innerHTML = "&minus;";
    minus.setAttribute("aria-label", "Menge von " + p.name + " verringern");
    var feld = document.createElement("input");
    feld.type = "number"; feld.className = "menge__feld"; feld.value = position.menge;
    feld.min = 1; feld.max = max; feld.step = 1; feld.setAttribute("inputmode", "numeric");
    feld.setAttribute("aria-label", "Menge von " + p.name);
    var plus = document.createElement("button");
    plus.type = "button"; plus.className = "menge__knopf"; plus.textContent = "+";
    plus.setAttribute("aria-label", "Menge von " + p.name + " erhöhen");

    function aendern(n) {
      n = Math.max(1, Math.min(max, isNaN(n) ? 1 : n));
      app.warenkorb.mengeSetzen(p.id, n);
      warenkorbRendern();
    }
    minus.addEventListener("click", function () { aendern(position.menge - 1); });
    plus.addEventListener("click", function () { aendern(position.menge + 1); });
    feld.addEventListener("change", function () { aendern(parseInt(feld.value, 10)); });
    minus.disabled = position.menge <= 1;
    plus.disabled = position.menge >= max;

    steuerung.appendChild(minus); steuerung.appendChild(feld); steuerung.appendChild(plus);
    wrap.appendChild(steuerung);
    return wrap;
  }

  /* ---------- Schrittwechsel ---------- */

  function schrittZeigen(n) {
    if (n === 2 && !app.warenkorb.laden().length) {
      warenkorbRendern();
      return;
    }
    [1, 2, 3].forEach(function (i) {
      if (schritte[i]) { schritte[i].hidden = i !== n; }
      if (marken[i]) {
        if (i === n) { marken[i].setAttribute("aria-current", "step"); } else { marken[i].removeAttribute("aria-current"); }
        marken[i].classList.toggle("ist-fertig", i < n);
      }
    });
    var titel = document.getElementById("schritt" + n + "-titel");
    if (titel) {
      titel.focus();
      titel.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  /* ---------- Schritt 2: Formular ---------- */

  function fehlerSetzen(name, text) {
    var el = document.querySelector("[data-fehler-fuer='" + name + "']");
    if (!el) { return; }
    el.textContent = text;
    var feld = document.querySelector("[name='" + name + "']");
    var wrap = feld ? feld.closest(".feld") : null;
    if (wrap) { wrap.classList.toggle("hat-fehler", !!text); }
    if (feld && feld.type !== "radio") { feld.setAttribute("aria-invalid", text ? "true" : "false"); }
  }

  function formularPruefen(form) {
    var erster = null;
    var daten = formularLesen(form);

    function fehler(name, text) {
      fehlerSetzen(name, text);
      if (!erster) { erster = form.querySelector("[name='" + name + "']"); }
    }

    ["vorname", "nachname", "email", "strasse", "plz", "ort", "land", "zahlung", "kenntnis"].forEach(function (n) { fehlerSetzen(n, ""); });

    if (!daten.vorname) { fehler("vorname", "Bitte gib deinen Vornamen ein."); }
    if (!daten.nachname) { fehler("nachname", "Bitte gib deinen Nachnamen ein."); }
    if (!daten.email) {
      fehler("email", "Bitte gib deine E-Mail-Adresse ein.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(daten.email)) {
      fehler("email", "Bitte gib eine gültige E-Mail-Adresse ein, zum Beispiel name@beispiel.de.");
    }
    if (!daten.strasse) {
      fehler("strasse", "Bitte gib Straße und Hausnummer ein.");
    } else if (!/\d/.test(daten.strasse)) {
      fehler("strasse", "Bitte ergänze die Hausnummer.");
    }
    var plzLaenge = daten.land === "Deutschland" ? 5 : 4;
    if (!daten.plz) {
      fehler("plz", "Bitte gib deine Postleitzahl ein.");
    } else if (!new RegExp("^\\d{" + plzLaenge + "}$").test(daten.plz)) {
      fehler("plz", "Für " + daten.land + " besteht die Postleitzahl aus " + plzLaenge + " Ziffern.");
    }
    if (!daten.ort) { fehler("ort", "Bitte gib deinen Wohnort ein."); }
    if (!daten.land) { fehler("land", "Bitte wähle ein Land aus."); }
    if (!daten.zahlung) { fehler("zahlung", "Bitte wähle eine Zahlungsart aus."); }

    if (erster) {
      erster.focus();
      return false;
    }
    return true;
  }

  function formularLesen(form) {
    var f = new FormData(form);
    function wert(n) { return String(f.get(n) || "").trim(); }
    return {
      vorname: wert("vorname"),
      nachname: wert("nachname"),
      email: wert("email"),
      strasse: wert("strasse"),
      plz: wert("plz"),
      ort: wert("ort"),
      land: wert("land"),
      zahlung: wert("zahlung")
    };
  }

  /* ---------- Schritt 3: Zusammenfassung ---------- */

  function zusammenfassungRendern() {
    var box = document.querySelector("[data-zusammenfassung]");
    if (!box || !formularDaten) { return; }
    box.innerHTML = "";

    var liste = app.warenkorb.laden();
    var zwischen = 0;
    var artikelKarte = karte("Artikel", 1);
    liste.forEach(function (pos) {
      var p = D.produkte[pos.id];
      zwischen += p.preisCent * pos.menge;
      artikelKarte.appendChild(absatz(pos.menge + " × " + p.name + " – " + euro(p.preisCent * pos.menge)));
    });
    artikelKarte.appendChild(absatz("Versand: " + euro(versandCent)));
    var gesamt = absatz("Gesamt: " + euro(zwischen + versandCent) + " inkl. 19 % MwSt.");
    gesamt.style.fontWeight = "700";
    artikelKarte.appendChild(gesamt);

    var adresse = karte("Lieferadresse", 2);
    adresse.appendChild(absatz(formularDaten.vorname + " " + formularDaten.nachname));
    adresse.appendChild(absatz(formularDaten.strasse));
    adresse.appendChild(absatz(formularDaten.plz + " " + formularDaten.ort));
    adresse.appendChild(absatz(formularDaten.land));
    adresse.appendChild(absatz(formularDaten.email));

    var zahlung = karte("Zahlungsart", 2);
    zahlung.appendChild(absatz(formularDaten.zahlung));

    box.appendChild(artikelKarte); box.appendChild(adresse); box.appendChild(zahlung);
  }

  function karte(titel, zielSchritt) {
    var k = document.createElement("div");
    k.className = "karte-flach";
    var h = document.createElement("h3"); h.textContent = titel;
    k.appendChild(h);
    var a = document.createElement("button");
    a.type = "button"; a.className = "artikel__entfernen zusammenfassung__aendern"; a.textContent = "Ändern";
    a.setAttribute("aria-label", titel + " ändern");
    a.addEventListener("click", function () { schrittZeigen(zielSchritt); });
    k.appendChild(a);
    return k;
  }

  function absatz(text) {
    var p = document.createElement("p");
    p.textContent = text;
    return p;
  }

  /* ---------- Abschluss ---------- */

  function bestellungAbschliessen() {
    var nummer = bestellnummerErzeugen();
    app.schreiben(app.schluessel.bestellung, {
      nummer: nummer,
      vorname: formularDaten ? formularDaten.vorname : "",
      zeit: new Date().toISOString()
    });
    app.warenkorb.leeren();
    window.location.href = "bestellbestaetigung.html";
  }

  function setzeText(selector, text) {
    var el = document.querySelector(selector);
    if (el) { el.textContent = text; }
  }

  function start() {
    versandCent = (D.versand && D.versand.kostenCent) || 0;
    if (!bestaetigungInit()) { checkoutInit(); }
  }
  if (D.wennBereit) { D.wennBereit(start); }
})();
