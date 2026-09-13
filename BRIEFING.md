# Briefing: Diddl Comeback-Tüte – Landingpage und Shop-Prototyp

Dieses Dokument ist der Arbeitsauftrag für Claude Code. Es ist gleichzeitig die
Projektdokumentation und liegt deshalb im Repository.

---

## 0. Rolle und Kontext

Du bist Design Lead und Frontend-Entwickler in einer Digitalagentur. Der Kunde ist
Diddl, eine Marke der Warimex-Gruppe. Anlass ist das Diddl-Comeback in der
DACH-Region und der Verkaufsstart der limitierten "Diddl Comeback-Tüte".

Das Projekt entsteht im Rahmen einer Portfolio-Prüfung im Modul "Channel
Publishing" (Studiengang Digitale Medien, DHBW Mannheim). Bewertet wird nicht nur
die Optik, sondern ob die Lösung begründet ist. Die Prüfungskriterien lauten:
Auswahl eines geeigneten Systems, strukturiert geplante Inhalte, Berücksichtigung
der Zielgruppen, nutzerfreundliche Oberfläche, technische Einbindung rechtlicher
Anforderungen, sinnvolle Verknüpfung digitaler Kanäle, nachvollziehbare
Dokumentation von Entscheidungen.

Die Systementscheidung ist bereits getroffen und lautet: individuelle
Webanwendung als statische Eigenentwicklung. Die Umsetzung erfolgt KI-gestützt
("Vibe Coding"). Das ist der Implementierungsansatz, nicht die Systemkategorie.
Halte diese Unterscheidung in der Dokumentation sauber durch.

---

## 1. Zielgruppe, Nutzerziel und gewünschte Handlung

Primäre Zielgruppe: Erwachsene zwischen Anfang 20 und Ende 40, die mit Diddl
aufgewachsen sind. Auslöser ist Nostalgie. Diese Gruppe kauft.

Sekundäre Zielgruppe: Kinder und Jugendliche (Gen Z / Gen Alpha), die über
Social-Media-Trends rund um limitierte Sammelobjekte neu erreicht werden.

Journey, die die Seite abbilden muss:
Einstieg ("Diddl ist zurück"), Orientierung (Comeback-Tüte sehen), Entscheidung
(ich will die Tüte), Handlung (kaufen), Bestätigung (Bestätigungsseite, die zur
Community und zu Social Media zurückführt).

Primärer Call to Action auf allen Seiten: die Comeback-Tüte kaufen.

---

## 2. Technische Rahmenbedingungen – nicht verhandelbar

Die Seite wird auf GitHub Pages gehostet. Daraus folgt:

- Reines HTML, CSS und JavaScript. Kein Node, kein npm, kein Build-Schritt, kein
  Framework, keine CDN-Abhängigkeiten zur Laufzeit.
- Alle Pfade relativ und ohne führenden Slash. Also `assets/css/style.css`, nicht
  `/assets/css/style.css`. GitHub Pages liefert Projektseiten unter einem
  Unterpfad aus, absolute Pfade brechen dort.
- Interne Links ebenfalls relativ: `produkt.html`, nicht `/produkt.html`.
- Dateinamen durchgehend klein, ohne Umlaute, ohne Leerzeichen. GitHub Pages ist
  case-sensitive.
- Eine leere Datei `.nojekyll` im Wurzelverzeichnis, damit GitHub den Ordner nicht
  durch Jekyll schickt.
- Eine `404.html` im Wurzelverzeichnis.
- Keine externen Requests im Live-Betrieb. Schriften werden lokal eingebunden,
  nicht über den Google-Fonts-CDN. Begründung für die Dokumentation: der CDN
  überträgt die IP-Adresse der Besucher an Google, das LG München hat das 2022
  ohne Einwilligung als DSGVO-Verstoß eingestuft. Selbst hosten löst das.
- Kein Tracking, keine Analytics, keine Social-Media-Embeds mit Fremdcode.

---

## 3. Dateistruktur

Lege exakt diese Struktur an:

```
index.html                  Startseite
produkt.html                Produktdetailseite Comeback-Tüte
warenkorb.html              Warenkorb und Checkout
bestellbestaetigung.html    Bestätigungsseite nach dem Kauf
faq.html                    Häufige Fragen
impressum.html              Platzhalter
datenschutz.html            Platzhalter
widerruf.html               Platzhalter (Widerrufsbelehrung und AGB)
404.html                    Fehlerseite
.nojekyll
README.md                   Dokumentation, siehe Abschnitt 12
assets/
  css/style.css             gesamtes Styling, ein File
  js/data.js                zentrale Inhaltsdaten (Produkt, FAQ, Quiz)
  js/app.js                 Header, Navigation, Warenkorb-Zustand, Toast, Footer-Logik
  js/produkt.js             Bildergalerie, Mengenwahl, Akkordeons
  js/warenkorb.js           Warenkorb-Ansicht und Checkout-Schritte
  js/quiz.js                Diddl-Quiz
  img/                      Bilder, siehe Abschnitt 5
  fonts/                    Quicksand und Chewy als woff2
```

`assets/js/data.js` ist bewusst die einzige Stelle, an der Produktdaten, Preis,
FAQ-Einträge und Quizfragen stehen. Das ist die Antwort auf die Prüfungsfrage
"Wer pflegt die Inhalte?": eine Redakteurin ohne Programmierkenntnisse kann diese
Datei in einem Texteditor anpassen. Kommentiere sie entsprechend ausführlich auf
Deutsch.

Header und Footer werden auf jeder Seite als statisches HTML wiederholt, nicht
per JavaScript injiziert. Grund: die Seite muss auch ohne JavaScript lesbar und
navigierbar sein, und Suchmaschinen sollen den Inhalt direkt sehen. Halte die
Markup-Blöcke identisch, damit Änderungen leicht nachvollziehbar bleiben.

---

## 4. Design

### Design-Tokens

Lege diese als CSS Custom Properties in `:root` an und verwende ausschließlich
diese Werte, keine zusätzlichen Grautöne:

```
--text-dark:    #39091c
--text-light:   #fdfbfd
--bg-light:     #fdfbfd
--bg-dark:      #5d0872
--btn:          #9929cf
--btn-hover:    #ff2f7f
--btn-text:     #fdfbfd
```

Ergänze maximal zwei abgeleitete Pastelltöne für Flächen und Karten, hergeleitet
aus dem Violett und dem Pink, und dokumentiere sie im README.

Kontrasthinweis, bitte umsetzen: `--btn-hover` (#ff2f7f) erreicht gegen weiße
Schrift nur rund 3,4:1 und verfehlt damit WCAG AA für normalen Text. Setze
Button-Labels deshalb auf mindestens 18 Pixel und Schriftschnitt 700, dann greift
die Large-Text-Schwelle von 3:1. Notiere diese Entscheidung im README unter
Barrierefreiheit.

### Typografie

Überschriften: Chewy (nur ein Schnitt, 400).
Fließtext: Quicksand (400 und 600, bei Bedarf 700 für Buttons).

Beide liegen als woff2 in `assets/fonts/` und werden per `@font-face` mit
`font-display: swap` eingebunden. Falls die Dateien beim Bauen noch nicht
vorhanden sind, schreibe die `@font-face`-Regeln trotzdem, hinterlege einen
sinnvollen Fallback-Stack und vermerke es als offenen Punkt im README.

Setze eine klare Typo-Skala. Chewy ist ein kräftiger Display-Font, gib
Überschriften genug Luft und setze sie nicht in Versalien. Zeilenlänge im
Fließtext unter 75 Zeichen.

### Anmutung

Die Referenzbilder aus dem Projektordner geben die Richtung vor: Pastellflächen,
weiche organische Blob- und Wellenformen als Übergänge zwischen Sections, stark
abgerundete Karten, Sticker-Optik, weiche Schatten, viel Weißraum, große
verspielte Headlines. Fröhlich und süß, aber aufgeräumt genug, dass ein
Kaufprozess ernst genommen wird.

Arbeite in zwei Durchgängen. Erstelle zuerst einen kompakten Designplan mit
Palette, Typo-Rollen, Layoutkonzept und drei Leitprinzipien, prüfe ihn gegen
dieses Briefing und revidiere alles, was generisch wirkt. Erst danach Code
schreiben.

Vermeide diese Standardmuster, sie wirken generiert: identische Karten mit
identischem Radius und identischem grauem Schatten für alles, ALL-CAPS-Eyebrows
über jeder Überschrift, ein einzelnes farblich hervorgehobenes Wort in einer
Headline, nummerierte Marker 01/02/03 bei Inhalten, die keine Reihenfolge haben,
Pfeile im Buttontext, Fade-and-slide-up-Animationen an jeder Section.

Setze deine Mutigkeit an einer Stelle ein. Der Hero darf laut sein, der Rest
bleibt ruhig. Bewegung nur dort, wo sie eine Nutzeraktion beantwortet: Akkordeon
öffnen, Toast beim Hinzufügen zum Warenkorb, Quiz-Ergebnis erscheinen.
`prefers-reduced-motion` respektieren.

Mobile first. Die Zielgruppe kommt primär über TikTok und Instagram, also vom
Smartphone.

---

## 5. Bildmaterial

Die Originaldateien liegen im Projektordner. Benenne sie beim Kopieren nach
`assets/img/` wie folgt um. Wenn eine Datei fehlt, baue einen sichtbar
gekennzeichneten Platzhalter mit korrektem Seitenverhältnis ein, statt das Layout
zu ändern.

| Zieldatei | Quelle | Einsatz |
|---|---|---|
| logo-diddl-is-back.png | logo-diddl-2025.png | Header, Footer |
| hero-banner.webp | diddl-is-back-hero-banner-dektop-diddel-rosa-lafueliki.webp | Hero, Desktop |
| hero-gruppe.webp | diddl-header-2.webp | Hero, Mobile |
| ueber-1-charaktere.webp | 04548352-bb25-49fd-a065-4bbb1a6a757e.webp | Carousel Slide 1 |
| ueber-2-nostalgie.jpg | diddl-mau-20804.jpeg | Carousel Slide 2 |
| ueber-3-comeback.png | Bildschirmfoto_2026-09-13_um_14_06_51.png | Carousel Slide 3 |
| tuete-1.webp | diddl-einkaufstuten.webp | Hauptbild Produkt |
| tuete-2.webp | diddl-is-back-.webp | Produktgalerie |
| tuete-3.webp | dpa-com-60828636-2.webp | Produktgalerie |
| tuete-4.jpg | a69c6f23-07f4-4cd7-8a36-a669299a2902.jpg | Produktgalerie |
| tuete-5.png | FpZcpaFQ7E2He3qO3mSkeNtUfEZsX1-produkte-mob.png | Produktgalerie |
| inhalt-block.jpg | diddl-notizblock-100.jpg | Inhalt der Tüte |
| inhalt-plueschtier.jpg | DEZTEL6XNZEGTF5BWMOADRQW2E.jpg | Inhalt der Tüte |
| inhalt-schreibwaren.webp | Diddl.webp | Inhalt der Tüte |
| inhalt-tasse.jpg | 61it4vMiy2L.jpg | Teaser-Section |

Wichtig: `logo-diddl-2025.png` hat keinen Alphakanal, es liegt schwarz auf reinem
Weiß. Stelle es frei (Weiß transparent), bevor du es auf farbigen Flächen
verwendest.

Jedes Bild braucht ein aussagekräftiges `alt`-Attribut auf Deutsch, `loading="lazy"`
außer beim Hero, sowie `width` und `height`, damit kein Layout-Sprung entsteht.

---

## 6. Startseite (index.html)

### Header, sticky

Links das Diddl-Logo, verlinkt auf die Startseite. In der Mitte drei
Navigationspunkte: "Über Diddl" (Anker `#ueber-diddl`), "Diddl Comeback-Tüte"
(`produkt.html`), "Geheim" (Anker `#geheim`). Rechts ein Button mit
Einkaufskorb-Icon, der zu `warenkorb.html` führt und die Anzahl der Artikel als
Badge zeigt. Auf Mobile ein Burger-Menü, per Tastatur bedienbar, mit korrekten
`aria-expanded`- und `aria-controls`-Attributen.

Das Icon zeichnest du als Inline-SVG, keine Icon-Bibliothek.

### Hero

Headline "Diddl ist zurück!", Subline "Entdecke die Diddl Comeback-Tüte",
CTA-Button "Mehr erfahren", der zu `produkt.html` führt. Bild: `hero-banner.webp`
auf Desktop, `hero-gruppe.webp` auf Mobile, per `<picture>` gelöst.

### Über Diddl (`#ueber-diddl`)

Ein Carousel mit genau drei Slides. Jeder Slide ist zweispaltig: eine Hälfte
Text, eine Hälfte Bild. Auf Mobile untereinander.

Slide 1, Was ist Diddl: die Springmaus mit den großen Füßen, erfunden 1990 von
Thomas Goletz, Kultstatus in den 90ern und frühen 2000ern, Diddl-Blätter als
Sammel- und Tauschobjekt, Zuhause im Käsekuchenland. Nenne zwei bis drei Freunde
beim Namen: Diddlina, Pimboli der Knuffelteddy, Ackaturbo der Feuerschwanz-Rabe.

Slide 2, Warum das Comeback: Rückkehr zuerst in Frankreich und Belgien im Oktober
2025, seit Sommer 2026 auch in der DACH-Region. Die Kollektionen erscheinen in
limitierter Auflage und werden nicht nachproduziert. Nostalgie trifft auf eine
neue Generation, die analoge Dinge wiederentdeckt: Briefe, Sticker, Zeichnen.

Slide 3, Anteaser Comeback-Tüte, mit CTA-Button auf `produkt.html`.

Bedienung: Pfeil-Buttons mit `aria-label`, Punkt-Indikatoren, Wischgeste auf
Touch, Pfeiltasten links und rechts bei Fokus. Kein Autoplay. Die Slides bleiben
ohne JavaScript untereinander lesbar.

### Comeback-Tüte Teaser

Headline "Entdecke die Comeback-Tüte", ein Absatz Fließtext, CTA-Button
"Jetzt sichern" auf `produkt.html`, dazu ein Foto. Der Text nennt den
Überraschungscharakter, die limitierte Auflage und was garantiert drin ist.

### Diddl-Quiz (`#geheim`)

Siehe Abschnitt 9.

### Footer

Links: Logo, darunter die Social-Media-Handles Instagram, Facebook, TikTok,
YouTube als Inline-SVG-Icons mit Textlabel. Die Links zeigen auf die offiziellen
Diddl-Kanäle und öffnen in einem neuen Tab mit `rel="noopener"`.

Mitte: Links zu "Über Diddl" (`index.html#ueber-diddl`), "Diddl Comeback-Tüte"
(`produkt.html`), "FAQ" (`faq.html`), "Impressum" (`impressum.html`). Ergänze
"Datenschutz" und "Widerruf und AGB", weil beide rechtlich verpflichtend sind.

Rechts: Newsletter-Anmeldung. Überschrift "Mausiger Diddl Newsletter", Absatz
"Melde dich beim Diddl Newsletter an, um keine Neuigkeiten zu verpassen!",
E-Mail-Feld mit zugehörigem `<label>`, Checkbox für die Einwilligung mit Verweis
auf die Datenschutzerklärung, Button "Anmelden". Nach dem Absenden erscheint ein
Hinweis auf das Double-Opt-In-Verfahren. Es gibt kein Backend, also nur eine
Erfolgsmeldung im Frontend und ein deutlicher Hinweis darauf.

Ganz unten eine Zeile mit dem Prototyp-Hinweis aus Abschnitt 10.

---

## 7. Produktseite (produkt.html)

Zweispaltig auf Desktop, links Bild, rechts Text. Auf Mobile untereinander.

Links: Bildergalerie im Carousel-Stil mit `tuete-1` bis `tuete-5`, Thumbnails
darunter, Tastaturbedienung wie beim Über-Diddl-Carousel.

Rechts, in dieser Reihenfolge:

1. Überschrift "Diddl Comeback-Tüte"
2. Ein beschreibender Satz
3. Abschnitt "Beschreibung"
4. Abschnitt "Produktdetails"
5. Preis 19,99 Euro, direkt darunter kleiner: "inkl. 19 % MwSt., zzgl.
   Versandkosten" mit Link auf die Versandinformationen
6. Mengenauswahl, Minus- und Plus-Button plus Zahlenfeld, Bereich 1 bis 5, mit
   `aria-live`-Rückmeldung
7. Button "In den Warenkorb"
8. Verfügbarkeitshinweis: limitierte Auflage, wird nicht nachproduziert

Darunter Akkordeons:
- "Was steckt drin?"
- "Lieferung und Zahlung"
- "Widerruf und Rückgabe"

Akkordeons als `<button>` mit `aria-expanded`, Inhalte per `hidden` gesteuert, bei
deaktiviertem JavaScript alle offen.

### Transparenz zur Mystery-Box – prüfungsrelevant

Deutlich sichtbar, nicht versteckt in einem Akkordeon, sondern als eigener
hervorgehobener Kasten direkt unter dem Preis:

- Der geschätzte Warenwert des Inhalts liegt immer bei mindestens 19,99 Euro.
- Welche konkreten Artikel in der Tüte sind, wird vor dem Kauf nicht verraten.
- Garantiert enthalten sind: 1x Diddl-Block, 1x Schreibwaren-Utensil,
  1x Diddl-Kuscheltier.
- Es besteht kein Anspruch auf bestimmte Motive oder Charaktere.
- Hinweis auf das gesetzliche Widerrufsrecht mit Link auf `widerruf.html`.

Begründe im README, warum dieser Kasten oberhalb der Akkordeons steht:
Verbraucherschutz bei Überraschungsprodukten und Vermeidung einer irreführenden
Preisangabe.

---

## 8. Warenkorb und Checkout (warenkorb.html)

Zustand im `localStorage` unter dem Schlüssel `diddl_warenkorb_v1`, Format
`[{ "id": "comeback-tuete", "menge": 2 }]`. Produktstammdaten kommen aus
`data.js`, nie aus dem Storage. Alle Schreib- und Lesezugriffe in
`try/catch`, damit die Seite auch bei blockiertem Storage funktioniert.

Ein Klick auf "In den Warenkorb" auf der Produktseite aktualisiert den Badge im
Header und zeigt einen Toast "In den Warenkorb gelegt" mit einem Link "Zum
Warenkorb". Der Toast verschwindet nach einigen Sekunden, ist per Tastatur
schließbar und wird über `role="status"` angekündigt.

Checkout in drei Schritten auf einer Seite, mit sichtbarer Fortschrittsanzeige:

Schritt 1, Warenkorb: Artikelliste mit Bild, Name, Einzelpreis, Mengenänderung,
Entfernen-Button, Zwischensumme, Versandkosten 4,95 Euro, Gesamtsumme, Hinweis
"inkl. 19 % MwSt.". Leerer Warenkorb bekommt eine eigene Ansicht mit einem Satz
und einem Button zur Produktseite, keine leere Tabelle.

Schritt 2, Lieferung und Zahlung: Formularfelder Vorname, Nachname, E-Mail,
Straße und Hausnummer, PLZ, Ort, Land. Zahlungsart als Radiogruppe: Rechnung,
PayPal, Kreditkarte. Validierung ausschließlich clientseitig, Fehlermeldungen
stehen direkt am Feld, sind über `aria-describedby` verknüpft und sagen, was zu
tun ist.

Schritt 3, Prüfen und bestellen: Zusammenfassung aller Angaben, Checkbox zur
Kenntnisnahme von Widerrufsbelehrung und Datenschutz, danach der Bestellbutton.

Der Bestellbutton trägt exakt die Beschriftung "Zahlungspflichtig bestellen".
Das ist die gesetzlich vorgeschriebene Button-Lösung nach § 312j Absatz 3 BGB.
Halte dich wörtlich daran und dokumentiere es.

Es werden keine Daten übertragen. Nach dem Absenden wird der Warenkorb geleert
und auf `bestellbestaetigung.html` weitergeleitet.

### Bestellbestaetigung.html

Bestätigungstext, eine erfundene Bestellnummer, ein Hinweis, dass es sich um eine
Demo handelt und keine Bestellung ausgelöst wurde. Dann die Anbindung an die
Kanäle: Aufforderung, das Unboxing unter einem Kampagnen-Hashtag zu teilen, mit
Links zu Instagram und TikTok, und ein Verweis auf das Diddl-Quiz. Das schließt
die Journey und erfüllt das Prüfungskriterium zur Kanalverknüpfung.

---

## 9. Diddl-Quiz

Ort: Section `#geheim` unten auf der Startseite. Der Navigationspunkt heißt
"Geheim", die Überschrift in der Section nennt den Inhalt klar: "Welcher Diddl
bist du?".

Aufbau: 5 Fragen, jeweils 4 Antwortmöglichkeiten. Jede Antwort zahlt auf genau
eine von vier Figuren ein. Am Ende gewinnt die Figur mit den meisten Punkten,
bei Gleichstand die zuerst erreichte.

Die vier Ergebnisfiguren mit gesicherten Eigenschaften:
- Diddl, die Springmaus mit den großen Füßen, aus dem Käsekuchenland, optimistisch
  und immer für eine Idee gut
- Diddlina, Diddls Freundin, kreativ und herzlich
- Pimboli, der Knuffelteddy, wohnt in einem Wohnkoffer in Diddls Käsehöhle, eher
  schüchtern, verspielt, liebt Honig und Kuscheln
- Ackaturbo, der Feuerschwanz-Minirabe, schnell, frech und neugierig

Fragen sollen leicht, nostalgisch und selbstironisch sein, keine Persönlichkeits-
diagnostik. Themen: Umgang mit einer leeren Seite Diddl-Papier, Verhalten beim
Sammeln und Tauschen, Lieblingsplatz, Reaktion auf eine Überraschung,
Lieblingssnack.

Ergebnisansicht: Figurname als Chewy-Headline, zwei bis drei Sätze Beschreibung,
Button "Nochmal spielen" und Button "Comeback-Tüte ansehen" auf `produkt.html`.
Dazu ein Teilen-Button, der per `navigator.share` arbeitet und auf
Zwischenablage-Kopie zurückfällt.

Fragen, Antworten, Zuordnung und Ergebnistexte gehören vollständig in
`data.js`, damit sie ohne Codeänderung gepflegt werden können. Wird eine Frage
ergänzt, darf nichts anderes angepasst werden müssen.

Fortschrittsanzeige "Frage 2 von 5", Tastaturbedienung, Ergebnis per
`aria-live="polite"` angekündigt.

Für die Ergebnisfiguren liegen keine freigestellten Einzelbilder vor. Setze
stattdessen eine farbige Sticker-Karte und vermerke das Bild als offenen Punkt im
README.

---

## 10. Rechtliches – alles als gekennzeichneter Platzhalter

`impressum.html`, `datenschutz.html` und `widerruf.html` bekommen die korrekte
Gliederung mit allen Pflichtabschnitten, aber Platzhaltertext. Jeder Platzhalter
ist im Fließtext klar erkennbar in eckigen Klammern, etwa
`[PLATZHALTER: vertretungsberechtigte Person]`. Setze zusätzlich ganz oben auf
jeder dieser Seiten einen sichtbaren Hinweiskasten, dass die Inhalte noch vom
Rechts-Teilprojekt geliefert werden.

Impressum: Anbieter, Anschrift, Vertretung, Kontakt, Registereintrag,
Umsatzsteuer-ID, Verantwortlicher für den Inhalt, Hinweis auf die
EU-Streitschlichtungsplattform, Erklärung zur Verbraucherschlichtung.

Datenschutz: Verantwortlicher, Kontaktdaten, Zwecke und Rechtsgrundlagen,
Newsletter mit Double-Opt-In, lokale Speicherung des Warenkorbs, Hosting bei
GitHub Pages mit Serverlogs und Drittlandbezug USA, Betroffenenrechte,
Widerspruchsrecht, Beschwerderecht bei der Aufsichtsbehörde.

Widerruf und AGB: Widerrufsbelehrung mit Muster-Widerrufsformular, Hinweise zum
Vertragsschluss, Zahlung, Lieferung, Eigentumsvorbehalt, Gewährleistung.

### Cookie- und Consent-Banner

Die Seite setzt aktuell keine Tracking-Cookies. Der Warenkorb nutzt
`localStorage` und ist technisch notwendig, also einwilligungsfrei. Baue trotzdem
ein schlankes Consent-Banner mit den gleichwertigen Optionen "Alle akzeptieren"
und "Nur notwendige" sowie einem Link zur Datenschutzerklärung. Es setzt
ausschließlich eine Variable, die später Tracking freischalten würde. Die Wahl
wird im `localStorage` gespeichert und ist über einen Footer-Link
"Cookie-Einstellungen" jederzeit änderbar. Dokumentiere im README, warum das
Banner in dieser Ausbaustufe technisch nicht zwingend ist und trotzdem existiert.

### Prototyp-Hinweis

In jedem Footer und zusätzlich prominent im Checkout:
"Dieser Shop ist ein Prototyp im Rahmen eines Studienprojekts der DHBW Mannheim.
Es werden keine Bestellungen ausgelöst, keine Zahlungen abgewickelt und keine
Daten übertragen. Diese Seite steht in keiner Verbindung zur Marke Diddl oder zur
Warimex-Gruppe. Alle Bildrechte liegen bei den jeweiligen Rechteinhabern."

---

## 11. Qualitätsanforderungen

Barrierefreiheit:
- Semantisches HTML, eine `<h1>` pro Seite, saubere Überschriftenhierarchie
- Sichtbarer Fokusring auf allen interaktiven Elementen, nie `outline: none` ohne
  Ersatz
- Skip-Link zum Hauptinhalt
- Vollständige Tastaturbedienung von Navigation, Carousels, Akkordeons, Quiz und
  Checkout
- Alle Formularfelder mit verknüpftem `<label>`
- Textkontrast mindestens 4,5:1, Ausnahme wie in Abschnitt 4 beschrieben
- `prefers-reduced-motion` respektiert
- Sprache `lang="de"`

SEO und Metadaten:
- Individueller `<title>` und `<meta name="description">` pro Seite
- Open-Graph-Tags mit Bild für gute Vorschauen beim Teilen auf Social Media
- Favicon
- Sprechende Dateinamen

Performance:
- Bilder auf sinnvolle Maße bringen, `loading="lazy"` außer im Hero
- Kein unnötiges JavaScript, keine Polyfills

Responsiv: mindestens 360, 768 und 1280 Pixel Breite prüfen.

Progressive Enhancement: ohne JavaScript bleiben alle Inhalte lesbar, alle
internen Links funktionieren, nur Warenkorb, Quiz und Carousel-Steuerung
entfallen.

---

## 12. README.md

Das README ist Teil der Prüfungsleistung. Es enthält:

1. Kurzbeschreibung des Projekts und des Praxisfalls
2. Systementscheidung: warum statische Eigenentwicklung statt WordPress,
   Website-Builder oder Shopsystem. Argumente: klein geschnittener Funktions-
   umfang, volle Kontrolle über Nutzerführung und Funnel, keine Lizenzkosten,
   kostenloses Hosting, keine laufende Wartung eines CMS-Kerns und seiner
   Plugins. Nenne ehrlich die Grenzen: keine redaktionelle Oberfläche, keine
   Rollen- und Rechteverwaltung, keine Freigabeworkflows, kein echtes
   Zahlungssystem. Beschreibe, welcher Ausbauweg bei wachsendem Bedarf sinnvoll
   wäre.
3. Abgrenzung: Vibe Coding ist der Implementierungsansatz, nicht die
   Systemkategorie.
4. Contentpflege: wie `data.js` funktioniert, was dort geändert werden darf, was
   nicht.
5. Entscheidungslog: mindestens sechs Einträge im Format Beobachtung, Risiko,
   Entscheidung, Begründung. Enthalten sein müssen die selbst gehosteten
   Schriften, der Kontrast des Hover-Zustands, die Platzierung des
   Warenwert-Hinweises, die Beschriftung des Bestellbuttons, das Consent-Banner
   und die Entscheidung für statische Seiten statt JavaScript-Routing.
6. Barrierefreiheit: was geprüft wurde und wie.
7. Deployment: Schritt-für-Schritt-Anleitung für GitHub Pages.
8. Offene Punkte und Risiken: Rechtstexte ausstehend, Bildrechte, fehlende
   Charakterbilder, fehlende Schriftdateien, kein echtes Payment.
9. Quellenverzeichnis für alle Bilder.

---

## 13. Arbeitsweise

Arbeite in dieser Reihenfolge und halte nach jedem Schritt kurz an, damit ich
gegenlesen kann:

1. Designplan nach Abschnitt 4, inklusive Selbstkritik und Revision
2. Dateigerüst, `style.css` mit Tokens, `data.js`, Header und Footer
3. Startseite komplett
4. Produktseite komplett
5. Warenkorb, Checkout, Bestätigungsseite
6. Quiz
7. FAQ, Rechtsseiten, 404
8. Qualitätsdurchgang: Tastatur, Mobile, Kontraste, JavaScript deaktiviert
9. README

Schreibe Commits in kleinen, nachvollziehbaren Schritten mit deutschen
Commit-Nachrichten. Die Git-Historie ist Teil der Dokumentation.

Alle Texte im Frontend auf Deutsch, Tonalität herzlich und verspielt, aber ohne
Ausrufezeichen-Gewitter. Duzen. Keine erfundenen Fakten über die Marke, die nicht
in diesem Briefing stehen. Keine erfundenen Zahlen zu Auflagen, Verkäufen oder
Bewertungen.

---

## 14. Definition of Done

- Alle neun HTML-Seiten existieren und sind untereinander erreichbar
- Die Seite läuft nach `git push` ohne Build-Schritt auf GitHub Pages, alle Bilder
  und Styles laden, keine 404 in der Browserkonsole
- Ein Artikel lässt sich hinzufügen, die Menge ändern, entfernen, und der Kauf
  lässt sich bis zur Bestätigungsseite durchspielen
- Der Warenkorb überlebt einen Seitenwechsel und einen Reload
- Das Quiz liefert je nach Antwortmuster unterschiedliche Ergebnisse
- Die gesamte Seite ist ohne Maus bedienbar, der Fokus ist immer sichtbar
- Alle Rechtsseiten sind vorhanden, gegliedert und als Platzhalter gekennzeichnet
- Der Bestellbutton heißt wörtlich "Zahlungspflichtig bestellen"
- Der Warenwert-Hinweis zur Mystery-Box ist ohne Klick sichtbar
- Das README enthält alle neun Punkte aus Abschnitt 12
