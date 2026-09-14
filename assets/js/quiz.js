/* =====================================================================
   quiz.js – „Welcher Diddl-Charakter steckt in dir?“ (Startseite, Section #mein-diddl-typ)
   Fragen, Antworten, Zuordnung und Ergebnistexte kommen komplett aus
   data.js (DIDDL.quiz). Hier steht nur die Ablauflogik.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.DIDDL || {};
  var wurzel = document.querySelector("[data-quiz]");
  if (!wurzel || !D.quiz || !D.quiz.fragen || !D.quiz.fragen.length) { return; }

  var fragen = D.quiz.fragen;
  var figuren = D.quiz.figuren;
  var punkte = {};
  var reihenfolgeErreicht = []; // für Gleichstand: wer zuerst die Höchstpunktzahl hatte
  var index = 0;

  function el(tag, attrs, kinder) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") { e.textContent = attrs[k]; }
      else if (k === "class") { e.className = attrs[k]; }
      else { e.setAttribute(k, attrs[k]); }
    });
    (kinder || []).forEach(function (kind) { e.appendChild(kind); });
    return e;
  }

  function starten() {
    punkte = {};
    Object.keys(figuren).forEach(function (id) { punkte[id] = 0; });
    reihenfolgeErreicht = [];
    index = 0;
    frageZeigen();
  }

  function frageZeigen(fokus) {
    var f = fragen[index];
    var nummer = index + 1;
    var gesamt = fragen.length;
    var breite = Math.round((index / gesamt) * 100);

    wurzel.innerHTML = "";
    var live = el("p", { class: "quiz__fortschritt", "aria-live": "polite", text: "Frage " + nummer + " von " + gesamt });
    var balken = el("div", { class: "quiz__balken", "aria-hidden": "true" }, [el("span", { style: "width:" + breite + "%" })]);
    var frage = el("h3", { class: "quiz__frage", id: "quiz-frage", text: f.frage });
    var liste = el("ul", { class: "quiz__antworten" });

    f.antworten.forEach(function (a) {
      var knopf = el("button", { class: "quiz__antwort", type: "button", text: a.text });
      knopf.addEventListener("click", function () { antworten(a.figur); });
      liste.appendChild(el("li", {}, [knopf]));
    });

    wurzel.appendChild(live);
    wurzel.appendChild(balken);
    wurzel.appendChild(frage);
    wurzel.appendChild(liste);

    if (fokus) {
      frage.setAttribute("tabindex", "-1");
      frage.focus();
    }
  }

  function antworten(figurId) {
    if (Object.prototype.hasOwnProperty.call(punkte, figurId)) {
      punkte[figurId] += 1;
      // merken, in welcher Reihenfolge die Figuren ihren jeweiligen Stand erreicht haben
      reihenfolgeErreicht.push({ figur: figurId, stand: punkte[figurId] });
    }
    index += 1;
    if (index < fragen.length) {
      frageZeigen(true);
    } else {
      ergebnisZeigen();
    }
  }

  function gewinner() {
    var max = 0;
    Object.keys(punkte).forEach(function (id) { if (punkte[id] > max) { max = punkte[id]; } });
    // Bei Gleichstand gewinnt die Figur, die die Höchstpunktzahl zuerst erreicht hat
    for (var i = 0; i < reihenfolgeErreicht.length; i++) {
      var e = reihenfolgeErreicht[i];
      if (e.stand === max && punkte[e.figur] === max) { return figuren[e.figur]; }
    }
    return figuren[Object.keys(figuren)[0]];
  }

  function ergebnisZeigen() {
    var figur = gewinner();
    wurzel.innerHTML = "";

    var kinder = [];
    if (figur.bild) {
      kinder.push(el("img", { class: "figur-sticker__bild", src: figur.bild, alt: "", width: "349", height: "348" }));
    }
    var karte = el("div", { class: "figur-sticker figur-sticker--" + figur.id }, kinder.concat([
      el("p", { class: "figur-sticker__untertitel", text: "Du bist …" }),
      el("h3", { id: "quiz-ergebnis-titel", text: figur.name }),
      el("p", { class: "figur-sticker__untertitel", text: figur.untertitel }),
      el("p", { text: figur.beschreibung })
    ]));

    var nochmal = el("button", { class: "btn btn--sekundaer", type: "button", text: "Nochmal spielen" });
    nochmal.addEventListener("click", function () { starten(); wurzel.querySelector(".quiz__frage").focus(); });
    var ansehen = el("a", { class: "btn", href: "produkt.html", text: "Comeback-Tüte ansehen" });
    var teilen = el("button", { class: "btn btn--sekundaer", type: "button", text: "Ergebnis teilen" });
    var teilenHinweis = el("p", { class: "quiz__teilen-hinweis", "aria-live": "polite" });
    teilen.addEventListener("click", function () { ergebnisTeilen(figur, teilenHinweis); });

    var ergebnis = el("div", { class: "quiz__ergebnis", role: "region", "aria-live": "polite", "aria-labelledby": "quiz-ergebnis-titel", tabindex: "-1" }, [
      karte,
      el("div", { class: "quiz__aktionen" }, [nochmal, ansehen, teilen]),
      teilenHinweis
    ]);
    wurzel.appendChild(ergebnis);
    ergebnis.focus();
  }

  function ergebnisTeilen(figur, hinweis) {
    var hashtag = (D.kampagne && D.kampagne.hashtag) || "#Diddl";
    var url = window.location.href.split("#")[0] + "#mein-diddl-typ";
    var text = "Ich bin " + figur.name + " – " + figur.untertitel + ". Welcher Diddl-Charakter steckt in dir? " + hashtag;

    if (navigator.share) {
      navigator.share({ title: "Welcher Diddl-Charakter steckt in dir?", text: text, url: url }).catch(function () { /* abgebrochen */ });
      return;
    }
    var voll = text + " " + url;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(voll).then(function () {
        hinweis.textContent = "Text in die Zwischenablage kopiert.";
      }, function () {
        hinweis.textContent = "Kopieren nicht möglich. Dein Ergebnis: " + voll;
      });
    } else {
      hinweis.textContent = "Dein Ergebnis zum Kopieren: " + voll;
    }
  }

  starten();
})();
