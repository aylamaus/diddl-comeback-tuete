/* =====================================================================
   produkt.js – Produktdetailseite
   Bildergalerie (nutzt das Karussell aus app.js), Mengenwahl,
   „In den Warenkorb“ mit Toast. Produktdaten kommen aus data.js und
   überschreiben die statischen Fallback-Texte im HTML.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.DIDDL || {};
  var app = D.app;
  if (!app) { return; }

  var form = document.querySelector("[data-produkt-form]");
  var produktId = form ? form.getAttribute("data-produkt-id") : "comeback-tuete";
  var produkt = D.produkte && D.produkte[produktId];
  if (!produkt) { return; }

  /* ---------- Texte und Preis aus data.js ---------- */

  function textSetzen(selector, text) {
    var el = document.querySelector(selector);
    if (el && text) { el.textContent = text; }
  }

  function datenEinsetzen() {
    textSetzen(".produkt__titel h1", produkt.name);
    textSetzen(".produkt__kurz", produkt.kurz);
    textSetzen("[data-produkt-preis]", app.euro(produkt.preisCent));

    // Beschreibung: alle <p> zwischen der Überschrift „Beschreibung“ und der nächsten <h2>
    var info = document.querySelector(".produkt__info");
    if (info && Array.isArray(produkt.beschreibung)) {
      var h2s = Array.prototype.slice.call(info.querySelectorAll("h2"));
      var start = h2s.filter(function (h) { return h.textContent.trim() === "Beschreibung"; })[0];
      if (start) {
        var el = start.nextElementSibling;
        while (el && el.tagName === "P") { var weg = el; el = el.nextElementSibling; weg.remove(); }
        produkt.beschreibung.slice().reverse().forEach(function (absatz) {
          var p = document.createElement("p");
          p.textContent = absatz;
          start.insertAdjacentElement("afterend", p);
        });
      }
    }

    // Produktdetails
    var dl = document.querySelector(".produkt__details");
    if (dl && Array.isArray(produkt.details)) {
      dl.innerHTML = "";
      produkt.details.forEach(function (d) {
        var zeile = document.createElement("div");
        var dt = document.createElement("dt"); dt.textContent = d.label;
        var dd = document.createElement("dd"); dd.textContent = d.wert;
        zeile.appendChild(dt); zeile.appendChild(dd);
        dl.appendChild(zeile);
      });
    }

    // Mengengrenze
    var feld = document.getElementById("menge");
    if (feld && produkt.mengeMax) {
      feld.max = produkt.mengeMax;
      var hinweis = document.getElementById("menge-hinweis");
      if (hinweis) { hinweis.textContent = "1 bis " + produkt.mengeMax + " Stück pro Bestellung."; }
    }
  }

  /* ---------- Galerie ---------- */

  function galerieInit() {
    var galerie = document.querySelector("[data-produkt-galerie]");
    if (!galerie) { return; }
    app.karussell(galerie);
  }

  /* ---------- Mengenwahl ---------- */

  function mengeInit() {
    if (!form) { return; }
    var feld = document.getElementById("menge");
    var minus = form.querySelector("[data-menge-minus]");
    var plus = form.querySelector("[data-menge-plus]");
    var hinweis = document.getElementById("menge-hinweis");
    var max = produkt.mengeMax || 5;

    function wert() {
      var n = parseInt(feld.value, 10);
      if (isNaN(n)) { n = 1; }
      return Math.max(1, Math.min(max, n));
    }
    function setzen(n) {
      feld.value = n;
      minus.disabled = n <= 1;
      plus.disabled = n >= max;
      if (hinweis) {
        hinweis.textContent = n === max
          ? "Maximal " + max + " Stück pro Bestellung."
          : n + (n === 1 ? " Stück" : " Stück") + " ausgewählt.";
      }
    }

    minus.addEventListener("click", function () { setzen(wert() - 1); });
    plus.addEventListener("click", function () { setzen(wert() + 1); });
    feld.addEventListener("change", function () { setzen(wert()); });
    setzen(wert());

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = wert();
      app.warenkorb.hinzufuegen(produkt.id, n);
      app.toast(
        (n === 1 ? "1 Tüte" : n + " Tüten") + " in den Warenkorb gelegt.",
        "Zum Warenkorb",
        "warenkorb.html"
      );
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    datenEinsetzen();
    galerieInit();
    mengeInit();
  });
})();
