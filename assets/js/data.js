/* =====================================================================
   ZENTRALE INHALTSDATEN – Diddl Comeback-Tüte
   =====================================================================

   Diese Datei ist die einzige Stelle, an der Produktdaten, Preise,
   FAQ-Einträge und Quizfragen gepflegt werden. Sie kann in jedem
   Texteditor bearbeitet werden, Programmierkenntnisse sind nicht nötig.

   Ein paar Regeln, damit nichts kaputtgeht:

   1. Texte stehen immer in Anführungszeichen: "So ein Text".
      Enthält der Text selbst ein Anführungszeichen, bitte „…“ oder ‚…‘
      verwenden, nicht das gerade Zeichen ".
   2. Nach jedem Eintrag in einer Liste steht ein Komma, außer nach dem
      letzten. Ein Komma zu viel oder zu wenig ist der häufigste Fehler.
   3. Zahlen (Preise) werden in CENT als ganze Zahl angegeben, also
      1999 für 19,99 Euro. So gibt es keine Rundungsfehler.
   4. Die Felder "id" nicht ändern, sie werden vom Code verwendet.
   5. Bildpfade zeigen auf assets/img/. Neue Bilder dort ablegen,
      Dateinamen klein, ohne Umlaute, ohne Leerzeichen.

   Nach dem Speichern die Seite im Browser neu laden – fertig.
   ===================================================================== */

var DIDDL = window.DIDDL || {};

/* ---------------------------------------------------------------------
   PRODUKT
   Es gibt aktuell genau ein Produkt. Weitere Produkte könnten als
   zusätzliche Einträge in DIDDL.produkte ergänzt werden.
   --------------------------------------------------------------------- */
DIDDL.produkte = {
  "comeback-tuete": {
    id: "comeback-tuete",
    name: "Diddl Comeback-Tüte",
    kurz: "Eine Tüte voller Diddl – limitiert, überraschend und garantiert mit Block, Schreibwaren und Kuscheltier.",
    preisCent: 1999,           // 19,99 Euro, inkl. 19 % MwSt.
    mwstProzent: 19,
    warenwertMindestensCent: 1999, // geschätzter Mindest-Warenwert des Inhalts
    mengeMax: 5,               // maximale Stückzahl pro Bestellung
    bild: "assets/img/tuete-1.webp", // Bild im Warenkorb
    beschreibung: [
      "Die Diddl Comeback-Tüte ist unsere Überraschungstüte zum Comeback in Deutschland, Österreich und der Schweiz. Drinnen steckt eine Auswahl aus der aktuellen Kollektion, zusammengestellt wie damals am Kiosk: Du weißt vorher nicht, welche Motive dich erwarten.",
      "Sicher ist: Ein Diddl-Block, ein Schreibwaren-Utensil und ein Kuscheltier sind immer dabei. Der geschätzte Warenwert liegt mindestens beim Kaufpreis. Die Tüte erscheint in limitierter Auflage und wird nicht nachproduziert."
    ],
    details: [
      { label: "Inhalt", wert: "Mindestens 3 Artikel: Block, Schreibwaren, Kuscheltier" },
      { label: "Auflage", wert: "Limitiert, keine Nachproduktion" },
      { label: "Verpackung", wert: "Bedruckte Papiertüte, verschlossen" },
      { label: "Versand", wert: "Deutschland, Österreich, Schweiz" },
      { label: "Artikelnummer", wert: "DEMO-2026-001" }
    ],
    garantiertEnthalten: [
      "1x Diddl-Block",
      "1x Schreibwaren-Utensil",
      "1x Diddl-Kuscheltier"
    ],
    galerie: [
      { src: "assets/img/tuete-1.webp", alt: "Zwei Hände halten rosafarbene Papiertüten mit dem Aufdruck „Diddl is back!“ in einem Einkaufszentrum.", breite: 1024, hoehe: 576 },
      { src: "assets/img/tuete-2.webp", alt: "Diddl-Comeback-Motiv mit Schriftzug „Diddl is back!“.", breite: 1920, hoehe: 1080 },
      { src: "assets/img/tuete-3.webp", alt: "Diddl-Produkte auf einem Verkaufstisch.", breite: 1200, hoehe: 800 },
      { src: "assets/img/tuete-4.jpg", alt: "Nahaufnahme eines Diddl-Artikels aus der Comeback-Kollektion.", breite: 640, hoehe: 640 },
      { src: "assets/img/tuete-5.jpg", alt: "Überblick über die Comeback-Kollektion: Rucksack, Kuscheltier, Notizbücher, Stifte, Tasse und Sticker mit Diddl-Motiven.", breite: 900, hoehe: 784 }
    ]
  }
};

/* ---------------------------------------------------------------------
   VERSAND UND ZAHLUNG
   --------------------------------------------------------------------- */
DIDDL.versand = {
  kostenCent: 495,             // 4,95 Euro pro Bestellung
  lieferzeitText: "2 bis 4 Werktage nach Zahlungseingang",
  laender: ["Deutschland", "Österreich", "Schweiz"],
  zahlungsarten: [
    { id: "rechnung", label: "Rechnung" },
    { id: "paypal", label: "PayPal" },
    { id: "kreditkarte", label: "Kreditkarte" }
  ]
};

/* ---------------------------------------------------------------------
   KAMPAGNE UND SOCIAL MEDIA
   Die Links zeigen auf die offiziellen Diddl-Kanäle.
   --------------------------------------------------------------------- */
DIDDL.kampagne = {
  hashtag: "#DiddlIstZurueck",
  // Quelle: Verlinkungen auf diddl.de (Stand September 2026)
  instagram: "https://www.instagram.com/diddl_original",
  tiktok: "https://www.tiktok.com/@diddl_original",
  facebook: "https://www.facebook.com/DieDiddlmaus",
  youtube: "https://www.youtube.com/channel/UCt2q9qyNrg0_lAfLlLSKwDA"
};

/* ---------------------------------------------------------------------
   FAQ
   Jeder Eintrag hat eine Frage und eine Antwort. Die Antwort darf
   mehrere Absätze enthalten, dann als Liste: antwort: ["Absatz 1", "Absatz 2"].
   Reihenfolge hier = Reihenfolge auf der Seite.
   --------------------------------------------------------------------- */
DIDDL.faq = [
  {
    frage: "Was ist in der Comeback-Tüte drin?",
    antwort: [
      "Garantiert enthalten sind ein Diddl-Block, ein Schreibwaren-Utensil und ein Diddl-Kuscheltier. Welche Motive und welche weiteren Artikel dazukommen, verraten wir vor dem Kauf nicht – das ist der Überraschungscharakter der Tüte.",
      "Der geschätzte Warenwert des Inhalts liegt immer bei mindestens 19,99 Euro."
    ]
  },
  {
    frage: "Kann ich mir bestimmte Motive oder Charaktere wünschen?",
    antwort: "Nein. Die Tüten werden vorab zusammengestellt, ein Anspruch auf bestimmte Motive oder Charaktere besteht nicht. Tauschen ist aber ausdrücklich erwünscht – so wie früher auf dem Schulhof."
  },
  {
    frage: "Wie viele Tüten kann ich bestellen?",
    antwort: "Pro Bestellung maximal 5 Tüten. Die Auflage ist limitiert, und wir möchten, dass möglichst viele Fans eine bekommen."
  },
  {
    frage: "Wird die Tüte nachproduziert?",
    antwort: "Nein. Die Comeback-Tüte erscheint in limitierter Auflage. Wenn sie ausverkauft ist, ist sie ausverkauft."
  },
  {
    frage: "Was kostet der Versand und wie lange dauert er?",
    antwort: "Der Versand kostet 4,95 Euro pro Bestellung nach Deutschland, Österreich und in die Schweiz. Die Lieferzeit beträgt in der Regel 2 bis 4 Werktage nach Zahlungseingang."
  },
  {
    frage: "Kann ich die Tüte zurückgeben?",
    antwort: "Ja. Als Verbraucherin oder Verbraucher hast du ein gesetzliches Widerrufsrecht von 14 Tagen. Das gilt auch für die Überraschungstüte, unabhängig davon, ob dir der Inhalt gefällt. Die Einzelheiten und das Muster-Widerrufsformular stehen in der Widerrufsbelehrung."
  },
  {
    frage: "Ist das hier ein echter Shop?",
    antwort: "Nein. Diese Seite ist ein Prototyp im Rahmen eines Studienprojekts der DHBW Mannheim. Es werden keine Bestellungen ausgelöst, keine Zahlungen abgewickelt und keine Daten übertragen."
  }
];

/* ---------------------------------------------------------------------
   QUIZ „Welcher Diddl bist du?“

   So funktioniert es:
   - Es gibt vier Ergebnisfiguren (DIDDL.quiz.figuren). Jede hat eine id.
   - Jede Frage hat vier Antworten. Jede Antwort hat ein Feld "figur",
     das auf genau eine Figur-id zeigt. Diese Figur bekommt einen Punkt.
   - Am Ende gewinnt die Figur mit den meisten Punkten. Bei Gleichstand
     gewinnt die Figur, die zuerst die höchste Punktzahl erreicht hat.

   Neue Frage hinzufügen: einfach einen weiteren Block in "fragen"
   anhängen. Der Fortschritt („Frage 2 von 5“) passt sich automatisch an.
   --------------------------------------------------------------------- */
DIDDL.quiz = {
  figuren: {
    diddl: {
      id: "diddl",
      name: "Diddl",
      untertitel: "Die Springmaus mit den großen Füßen",
      beschreibung: "Du kommst aus dem Käsekuchenland, zumindest im Herzen. Optimistisch, immer für eine Idee gut und mit Füßen, die dich überall hintragen. Wenn jemand eine Tauschrunde eröffnet, bist du die erste Stimme im Raum."
    },
    diddlina: {
      id: "diddlina",
      name: "Diddlina",
      untertitel: "Diddls Freundin, kreativ und herzlich",
      beschreibung: "Bei dir hat jedes Blatt Papier einen Plan, und jeder Brief bekommt mindestens einen Sticker. Du sammelst nicht nur, du gestaltest. Und du merkst dir, wer welches Motiv noch sucht."
    },
    pimboli: {
      id: "pimboli",
      name: "Pimboli",
      untertitel: "Der Knuffelteddy aus dem Wohnkoffer",
      beschreibung: "Du wohnst in einem Wohnkoffer in Diddls Käsehöhle – oder zumindest am liebsten unter einer Decke. Etwas schüchtern, sehr verspielt, mit einer Schwäche für Honig und Kuscheln. Überraschungen genießt du in Ruhe."
    },
    ackaturbo: {
      id: "ackaturbo",
      name: "Ackaturbo",
      untertitel: "Der Feuerschwanz-Minirabe",
      beschreibung: "Schnell, frech und neugierig: Du hast die Tüte schon aufgerissen, bevor jemand „Überraschung“ sagen konnte. Stillsitzen ist nicht dein Ding, aber wenn jemand etwas Neues entdeckt, bist du schon da."
    }
  },

  fragen: [
    {
      frage: "Vor dir liegt ein leeres Blatt Diddl-Papier. Was passiert?",
      antworten: [
        { text: "Ich schreibe sofort einen Brief an jemanden, der einen verdient hat.", figur: "diddl" },
        { text: "Ich male den Rand voll und klebe Sticker drauf, bevor ein Wort draufsteht.", figur: "diddlina" },
        { text: "Ich lege es in meine Mappe. Zu schön zum Beschreiben.", figur: "pimboli" },
        { text: "Ich falte einen Papierflieger. Da ist das Blatt wenigstens in Bewegung.", figur: "ackaturbo" }
      ]
    },
    {
      frage: "Tauschrunde auf dem Schulhof. Wie gehst du vor?",
      antworten: [
        { text: "Ich mache eine große Ansage und bringe alle zusammen.", figur: "diddl" },
        { text: "Ich habe eine Liste, wer was sucht, und vermittle.", figur: "diddlina" },
        { text: "Ich schaue erst mal zu und tausche nur mit Leuten, die ich mag.", figur: "pimboli" },
        { text: "Ich bin schon dreimal um den Hof gerannt und habe alles gesehen.", figur: "ackaturbo" }
      ]
    },
    {
      frage: "Dein Lieblingsplatz?",
      antworten: [
        { text: "Draußen, irgendwo mit Aussicht auf Käsekuchen.", figur: "diddl" },
        { text: "Am Schreibtisch, mit allen Stiften in Reichweite.", figur: "diddlina" },
        { text: "Unter einer Decke, am liebsten in einem Koffer.", figur: "pimboli" },
        { text: "Überall, solange es nicht lange derselbe ist.", figur: "ackaturbo" }
      ]
    },
    {
      frage: "Jemand überreicht dir eine Überraschungstüte. Deine Reaktion?",
      antworten: [
        { text: "Jubeln, dann alle einladen, beim Auspacken zuzuschauen.", figur: "diddl" },
        { text: "Vorsichtig öffnen und den Inhalt sofort schön anordnen.", figur: "diddlina" },
        { text: "Erst mal drücken. Die Tüte ist schon Geschenk genug.", figur: "pimboli" },
        { text: "Aufgerissen, bevor der Satz zu Ende war.", figur: "ackaturbo" }
      ]
    },
    {
      frage: "Und der Lieblingssnack?",
      antworten: [
        { text: "Käsekuchen. Gibt es eine andere Antwort?", figur: "diddl" },
        { text: "Etwas Selbstgebackenes, mit Verzierung.", figur: "diddlina" },
        { text: "Honig. Direkt aus dem Glas.", figur: "pimboli" },
        { text: "Egal, Hauptsache schnell und unterwegs.", figur: "ackaturbo" }
      ]
    }
  ]
};

/* ---------------------------------------------------------------------
   TECHNISCHE KONSTANTEN – bitte nicht ändern
   --------------------------------------------------------------------- */
DIDDL.speicherSchluessel = {
  warenkorb: "diddl_warenkorb_v1",
  consent: "diddl_consent_v1",
  bestellung: "diddl_letzte_bestellung_v1"
};

window.DIDDL = DIDDL;
