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
    kurz: "Eine Tüte voller Diddl – limitiert, überraschend und garantiert mit Block, Schreibwaren, Accessoire und Kuscheltier.",
    preisCent: 1999,           // 19,99 Euro, inkl. 19 % MwSt.
    mwstProzent: 19,
    warenwertMindestensCent: 1999, // geschätzter Mindest-Warenwert des Inhalts
    mengeMax: 5,               // maximale Stückzahl pro Bestellung
    bild: "assets/img/tuete-1.webp", // Bild im Warenkorb
    beschreibung: [
      "Die Diddl Comeback-Tüte ist unsere Überraschungstüte zum Diddl-Comeback. Drinnen steckt eine Auswahl aus der aktuellen Kollektion, zusammengestellt wie damals am Kiosk: Du weißt vorher nicht, welche Motive dich erwarten.",
      "Sicher ist: Ein Diddl-Block, ein Schreibwaren-Utensil, ein Accessoire und ein Kuscheltier sind immer dabei. Der geschätzte Warenwert liegt mindestens beim Kaufpreis. Die Tüte erscheint in limitierter Auflage und wird nicht nachproduziert."
    ],
    details: [
      { label: "Inhalt", wert: "Mindestens 4 Artikel: Block, Schreibwaren, Accessoire, Kuscheltier" },
      { label: "Auflage", wert: "Limitiert, keine Nachproduktion" },
      { label: "Verpackung", wert: "Bedruckte Papiertüte, verschlossen" },
      { label: "Versand", wert: "Deutschland, Österreich, Schweiz" },
      { label: "Artikelnummer", wert: "DEMO-2026-001" }
    ],
    garantiertEnthalten: [
      "1x Diddl-Block",
      "1x Schreibwaren-Utensil",
      "1x Diddl-Accessoire",
      "1x Diddl-Kuscheltier"
    ],
    galerie: [
      { src: "assets/img/tuete-1.webp", alt: "Zwei Hände halten rosafarbene Papiertüten mit dem Aufdruck „Diddl is back!“ in einem Einkaufszentrum.", breite: 1024, hoehe: 576 },
      { src: "assets/img/tuete-2.webp", alt: "Diddl-Comeback-Motiv mit Schriftzug „Diddl is back!“.", breite: 1920, hoehe: 1080, notiz: "Mögliche Inhalte der Diddl Comeback-Tüte" },
      { src: "assets/img/tuete-3.webp", alt: "Diddl-Produkte auf einem Verkaufstisch.", breite: 1200, hoehe: 800, notiz: "Mögliche Inhalte der Diddl Comeback-Tüte" },
      { src: "assets/img/tuete-5.jpg", alt: "Überblick über die Comeback-Kollektion: Rucksack, Kuscheltier, Notizbücher, Stifte, Tasse und Sticker mit Diddl-Motiven.", breite: 900, hoehe: 784, notiz: "Mögliche Inhalte der Diddl Comeback-Tüte" }
    ]
  }
};

/* ---------------------------------------------------------------------
   VERSAND UND ZAHLUNG
   --------------------------------------------------------------------- */
DIDDL.versand = {
  kostenCent: 495,             // 4,95 Euro pro Bestellung
  lieferzeitText: "3 bis 5 Werktage nach Zahlungseingang",
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
  hashtag: "#DiddlisBack",
  // Quelle: Verlinkungen auf diddl.de (Stand September 2026)
  instagram: "https://www.instagram.com/diddl_original",
  tiktok: "https://www.tiktok.com/@diddl_original",
  facebook: "https://www.facebook.com/DieDiddlmaus",
  youtube: "https://www.youtube.com/channel/UCt2q9qyNrg0_lAfLlLSKwDA"
};

/* ---------------------------------------------------------------------
   BEWERTUNGEN – BEISPIELANSICHT
   Achtung: Das sind keine echten Kundenbewertungen, sondern Beispiele,
   die zeigen, wie die Section aussehen würde. Sie werden auf der Seite
   als „Beispiel“ gekennzeichnet. Vor einem echten Betrieb müssen sie
   durch echte, nachprüfbare Bewertungen ersetzt oder entfernt werden.
   sterne: Zahl von 1 bis 5.
   --------------------------------------------------------------------- */
DIDDL.bewertungen = [
  {
    vorname: "Lena",
    sterne: 5,
    text: "Ich hab die Tüte mit meiner kleinen Schwester zusammen aufgemacht. Sie kannte Diddl gar nicht, jetzt liegt der Block auf ihrem Schreibtisch."
  },
  {
    vorname: "Jonas",
    sterne: 5,
    text: "Der Kuscheltier-Diddl sieht aus wie der von 2001 aus meinem Kinderzimmer. Schneller Versand, alles heil angekommen."
  },
  {
    vorname: "Mira",
    sterne: 4,
    text: "Schöne Überraschung, das Duftpapier riecht wie damals. Ein Stern Abzug, weil ich mir zwei Tüten hätte bestellen sollen."
  }
];

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
      "Garantiert enthalten sind ein Diddl-Block, ein Schreibwaren-Utensil, ein Diddl-Accessoire und ein Diddl-Kuscheltier. Welche Motive und welche weiteren Artikel dazukommen, verraten wir vor dem Kauf nicht – das ist der Überraschungscharakter der Tüte.",
      "Der geschätzte Warenwert des Inhalts liegt immer bei mindestens 19,99 Euro."
    ]
  },
  {
    frage: "Kann ich mir bestimmte Motive oder Charaktere wünschen?",
    antwort: "Nein. Die Tüten werden vorab zusammengestellt, ein Anspruch auf bestimmte Motive oder Charaktere besteht nicht. Das gilt für alle vier Kategorien – Block, Schreibwaren, Accessoire und Kuscheltier. Tauschen ist aber ausdrücklich erwünscht – so wie früher auf dem Schulhof."
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
    antwort: "Der Versand kostet 4,95 Euro pro Bestellung nach Deutschland, Österreich und in die Schweiz. Die Lieferzeit beträgt in der Regel 3 bis 5 Werktage nach Zahlungseingang."
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
   QUIZ „Welcher Diddl-Charakter steckt in dir?“

   So funktioniert es:
   - Es gibt vier Ergebnisfiguren (DIDDL.quiz.figuren). Jede hat eine id.
   - Jede Frage hat vier Antworten. Jede Antwort hat ein Feld "figur",
     das auf genau eine Figur-id zeigt. Diese Figur bekommt einen Punkt.
   - Am Ende gewinnt die Figur mit den meisten Punkten. Bei Gleichstand
     gewinnt die Figur, die zuerst die höchste Punktzahl erreicht hat.

   Neue Frage hinzufügen: einfach einen weiteren Block in "fragen"
   anhängen. Der Fortschritt („Frage 2 von 5“) passt sich automatisch an.
   Jede Figur hat ein Bild (bild) aus assets/img/, das im Ergebnis
   als runder Sticker erscheint.
   --------------------------------------------------------------------- */
DIDDL.quiz = {
  titelZeile: "Diddl Charakter Quiz",
  frageTitel: "Welcher Diddl-Charakter steckt in dir?",
  einleitung: "5 Fragen, 4 Freunde aus dem Käsekuchenland. Finde heraus, ob du Diddl, Diddlina, Pimboli oder Wollywell bist!",
  kopfbild: { src: "assets/img/quiz-kopf.jpg", alt: "Wollywell, Diddl, Diddlina und Pimboli springen fröhlich vor rosafarbenem Hintergrund.", breite: 1200, hoehe: 700 },

  figuren: {
    diddl: {
      id: "diddl",
      name: "Diddl",
      untertitel: "Die Springmaus mit den großen Füßen",
      bild: "assets/img/figur-diddl.jpg",
      beschreibung: "Neugierig, mutig und immer bereit für das nächste Abenteuer – so wie die Maus mit den großen Füßen selbst. Du probierst lieber aus, statt lange zu überlegen, und genau das macht dich unwiderstehlich liebenswert."
    },
    diddlina: {
      id: "diddlina",
      name: "Diddlina",
      untertitel: "Diddls Freundin, kreativ und herzlich",
      bild: "assets/img/figur-diddlina.jpg",
      beschreibung: "Du liebst schöne Dinge, kleine Details und alles, was Herz hat. Mit deinem Gespür für Ästhetik und deiner herzlichen Art bringst du automatisch Farbe in den Alltag."
    },
    pimboli: {
      id: "pimboli",
      name: "Pimboli",
      untertitel: "Der Knuffelteddy aus dem Wohnkoffer",
      bild: "assets/img/figur-pimboli.jpg",
      beschreibung: "Kuschelig, treu und immer für andere da – der Knuffelteddy unter deinen Freund:innen. Bei dir fühlt sich jeder sofort geborgen, denn Nähe und Verlässlichkeit sind für dich das Wichtigste."
    },
    wollywell: {
      id: "wollywell",
      name: "Wollywell",
      untertitel: "Das verträumte Schaf aus dem Käsekuchenland",
      bild: "assets/img/figur-wollywell.jpg",
      beschreibung: "Verträumt, fantasievoll und ein bisschen wolkig unterwegs – du lebst am liebsten in deiner eigenen kleinen Welt. Deine Kreativität und Ruhe machen dich zu jemandem, bei dem andere gerne mal abschalten."
    }
  },

  // Die Antworten sind pro Frage bewusst in unterschiedlicher Reihenfolge,
  // damit nicht immer die erste Antwort zu Diddl führt.
  fragen: [
    {
      frage: "Wie sieht dein perfekter Nachmittag aus?",
      antworten: [
        { text: "Draußen unterwegs, irgendwas Neues entdecken.", figur: "diddl" },
        { text: "Zimmer neu dekorieren oder mein Lieblingsoutfit zusammenstellen.", figur: "diddlina" },
        { text: "Auf dem Sofa kuscheln, mit meinem Lieblingsmenschen oder Kuscheltier.", figur: "pimboli" },
        { text: "Kopfhörer auf, in Gedanken verloren, vor mich hin träumen oder malen.", figur: "wollywell" }
      ]
    },
    {
      frage: "Du bekommst eine Diddl Comeback-Tüte – was machst du zuerst?",
      antworten: [
        { text: "Mir Zeit lassen und die Vorfreude genießen, bevor ich reinschaue.", figur: "wollywell" },
        { text: "Sofort aufreißen, ich kann’s nicht erwarten!", figur: "diddl" },
        { text: "Hoffen, dass das Kuscheltier drin ist – mein neuer Bettnachbar.", figur: "pimboli" },
        { text: "Vorsichtig öffnen und mich über jedes hübsche Detail freuen.", figur: "diddlina" }
      ]
    },
    {
      frage: "Was hättest du in der Schule am liebsten gemacht?",
      antworten: [
        { text: "Zeit mit Freunden, Gruppenarbeiten.", figur: "pimboli" },
        { text: "Aus dem Fenster träumen oder Geschichten schreiben.", figur: "wollywell" },
        { text: "Sport oder irgendwas Aktives draußen.", figur: "diddl" },
        { text: "Kreatives Gestalten, Kunst, mein Mäppchen dekorieren.", figur: "diddlina" }
      ]
    },
    {
      frage: "Wie tröstest du eine gute Freundin oder einen guten Freund?",
      antworten: [
        { text: "Eine kleine, süße Überraschung basteln oder schenken.", figur: "diddlina" },
        { text: "Zuhören, ganz ruhig, ohne viele Worte.", figur: "wollywell" },
        { text: "Ablenken – wir machen sofort etwas Cooles zusammen.", figur: "diddl" },
        { text: "Ganz fest umarmen und einfach da sein.", figur: "pimboli" }
      ]
    },
    {
      frage: "Dein Lebensmotto?",
      antworten: [
        { text: "„Kopf in den Wolken, Herz am richtigen Fleck.“", figur: "wollywell" },
        { text: "„Zuhause ist, wo die Liebsten sind.“", figur: "pimboli" },
        { text: "„Kleine Dinge, große Wirkung.“", figur: "diddlina" },
        { text: "„Lieber ausprobieren als abwarten.“", figur: "diddl" }
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
