# Diddl Comeback-Tüte – Landingpage und Shop-Prototyp

Statische Webanwendung (HTML, CSS, JavaScript) für den Verkaufsstart der
limitierten „Diddl Comeback-Tüte“ in der DACH-Region. Entstanden als
Portfolio-Prüfung im Modul „Channel Publishing“ (Digitale Medien,
DHBW Mannheim). Der Prototyp läuft ohne Build-Schritt auf GitHub Pages.

> **Hinweis:** Dieser Shop ist ein Prototyp im Rahmen eines Studienprojekts.
> Es werden keine Bestellungen ausgelöst, keine Zahlungen abgewickelt und
> keine Daten übertragen. Die Seite steht in keiner Verbindung zur Marke
> Diddl oder zur Warimex-Gruppe. Alle Bildrechte liegen bei den jeweiligen
> Rechteinhabern.

---

## Inhalt

1. [Projekt und Praxisfall](#1-projekt-und-praxisfall)
2. [Systementscheidung](#2-systementscheidung)
3. [Abgrenzung: Vibe Coding ist der Implementierungsansatz](#3-abgrenzung-vibe-coding-ist-der-implementierungsansatz)
4. [Contentpflege über data.js](#4-contentpflege-über-datajs)
5. [Entscheidungslog](#5-entscheidungslog)
6. [Barrierefreiheit](#6-barrierefreiheit)
7. [Deployment auf GitHub Pages](#7-deployment-auf-github-pages)
8. [Offene Punkte und Risiken](#8-offene-punkte-und-risiken)
9. [Quellenverzeichnis Bilder](#9-quellenverzeichnis-bilder)
- [Anhang A: Designkonzept](#anhang-a-designkonzept)
- [Anhang B: Dateistruktur](#anhang-b-dateistruktur)

---

## 1. Projekt und Praxisfall

Diddl, die Springmaus mit den großen Füßen, kehrt nach dem Comeback in
Frankreich und Belgien (Oktober 2025) seit Sommer 2026 auch in Deutschland,
Österreich und der Schweiz zurück. Zum Start gibt es die **Diddl
Comeback-Tüte**: eine Überraschungstüte für 19,99 Euro mit garantiert einem
Diddl-Block, einem Schreibwaren-Utensil und einem Kuscheltier, in limitierter
Auflage ohne Nachproduktion.

**Zielgruppen**

- Primär: Erwachsene zwischen Anfang 20 und Ende 40, die mit Diddl
  aufgewachsen sind. Auslöser ist Nostalgie, diese Gruppe kauft.
- Sekundär: Kinder und Jugendliche (Gen Z / Gen Alpha), die über
  Social-Media-Trends rund um limitierte Sammelobjekte erreicht werden.

**Abgebildete Journey**

| Phase | Seite / Element |
|---|---|
| Einstieg „Diddl ist zurück“ | `index.html`, Hero |
| Orientierung | Über-Diddl-Karussell, Teaser, `produkt.html` |
| Entscheidung | Produktseite mit Transparenz-Kasten und Preis |
| Handlung | `warenkorb.html`, Checkout in drei Schritten |
| Bestätigung und Rückführung in die Kanäle | `bestellbestaetigung.html` mit Hashtag, Instagram, TikTok, Quiz |

Der primäre Call to Action auf allen Seiten ist der Kauf der Comeback-Tüte.
Die Zielgruppe kommt überwiegend über TikTok und Instagram, also vom
Smartphone. Deshalb ist die Seite mobile first gebaut.

---

## 2. Systementscheidung

**Entscheidung: individuelle Webanwendung als statische Eigenentwicklung**
(reines HTML, CSS, JavaScript; Hosting auf GitHub Pages).

### Warum nicht WordPress, Website-Builder oder Shopsystem?

| Argument | Bedeutung für diesen Praxisfall |
|---|---|
| Klein geschnittener Funktionsumfang | Ein Produkt, fünf Inhaltsseiten, ein Quiz. Ein CMS- oder Shop-Kern würde mehr Komplexität mitbringen als genutzt wird. |
| Volle Kontrolle über Nutzerführung und Funnel | Hero → Produkt → Warenkorb → Bestätigung ist exakt so gebaut, wie es die Kampagne braucht, ohne Theme-Kompromisse. |
| Keine Lizenzkosten | Kein Shopify-Abo, keine Premium-Plugins, keine Builder-Gebühr. |
| Kostenloses Hosting | GitHub Pages liefert statische Dateien ohne Serverkosten aus. |
| Keine laufende Wartung eines CMS-Kerns | Keine Updates, keine Plugin-Sicherheitslücken, kein Datenbank-Backup. |
| Datenschutz durch Reduktion | Keine Datenbank, kein Tracking, keine externen Requests, Schriften lokal. |

### Grenzen der Entscheidung (ehrlich benannt)

- **Keine redaktionelle Oberfläche.** Inhalte werden in `assets/js/data.js`
  in einem Texteditor gepflegt, nicht in einem Backend.
- **Keine Rollen- und Rechteverwaltung, keine Freigabeworkflows.** Wer
  Schreibzugriff auf das Repository hat, kann alles ändern.
- **Kein echtes Zahlungssystem.** Der Checkout ist eine Simulation. Es gibt
  keine Bestellverwaltung, keinen Lagerbestand, keine Rechnungsstellung.
- **Keine Mehrsprachigkeit, keine Suche, keine Personalisierung.**
- Das statische Hosting kann keine serverseitige Logik ausführen, also auch
  kein Double-Opt-In für den Newsletter verarbeiten.

### Ausbauweg bei wachsendem Bedarf

1. **Kurzfristig (Kampagne bleibt klein):** Newsletter an einen
   DSGVO-konformen Dienst mit Double-Opt-In anbinden (Formular-Endpunkt),
   Checkout an einen gehosteten Zahlungsdienst (z. B. Payment-Link oder
   Checkout-Session) übergeben. Die statische Seite bleibt bestehen.
2. **Mittelfristig (mehrere Produkte, echte Bestellungen):** Headless-Commerce
   oder ein gehostetes Shopsystem für Warenkorb, Zahlung, Bestellverwaltung,
   Steuer und Versand. Die Landingpage kann als Frontend davor bleiben.
3. **Langfristig (Redaktion, Freigaben, viele Seiten):** Headless-CMS oder
   klassisches CMS mit Rollen, Workflows und Medienverwaltung; die hier
   definierte Content-Struktur (`data.js`) ist die Vorlage für die Datenmodelle.

---

## 3. Abgrenzung: Vibe Coding ist der Implementierungsansatz

Die **Systemkategorie** ist „individuelle Webanwendung als statische
Eigenentwicklung“. Das beantwortet die Frage *was* betrieben wird.

Der **Implementierungsansatz** ist KI-gestützte Entwicklung („Vibe Coding“):
Ein Briefing mit Anforderungen, Design-Tokens und Qualitätskriterien wurde
an ein KI-System (Claude Code) übergeben, das Code erzeugt, getestet und in
kleinen Commits dokumentiert hat. Das beantwortet die Frage *wie* gebaut wurde.

Beides ist unabhängig voneinander: Dieselbe statische Eigenentwicklung hätte
auch von Hand geschrieben werden können, und ein WordPress-Theme ließe sich
ebenfalls KI-gestützt entwickeln. Der Ansatz ändert nichts an der Bewertung
des Systems (Hosting, Wartung, Pflege, Grenzen) – er ändert die
Produktionsgeschwindigkeit und verlangt dafür ein präzises Briefing und einen
Qualitätsdurchgang durch Menschen. Das vollständige Briefing liegt als
[`BRIEFING.md`](BRIEFING.md) im Repository; die Git-Historie dokumentiert
die Arbeitsschritte.

---

## 4. Contentpflege über data.js

`assets/js/data.js` ist die einzige Stelle, an der Produktdaten, Preise,
Versandkosten, FAQ-Einträge, Quizfragen und Social-Media-Links stehen. Die
Datei ist ausführlich auf Deutsch kommentiert und kann von einer Redakteurin
ohne Programmierkenntnisse in einem Texteditor bearbeitet werden.

**Was dort geändert werden darf**

| Bereich | Feld | Beispiel |
|---|---|---|
| Produkt | `name`, `kurz`, `beschreibung`, `details`, `preisCent`, `mengeMax`, `garantiertEnthalten`, `galerie` | Preis auf 24,99 € ändern: `preisCent: 2499` |
| Versand | `kostenCent`, `lieferzeitText`, `laender`, `zahlungsarten` | |
| Kampagne | `hashtag`, Social-Links | |
| FAQ | `frage`, `antwort` (Text oder Liste von Absätzen), Reihenfolge | Eintrag anhängen oder löschen |
| Quiz | `fragen` (Frage, vier Antworten mit `figur`), `figuren` (Name, Untertitel, Beschreibung) | Sechste Frage anhängen – Fortschritt „Frage x von y“ passt sich automatisch an |

**Was nicht geändert werden darf**

- Die `id`-Felder (`comeback-tuete`, `diddl`, `pimboli` …), sie werden vom
  Code referenziert.
- `DIDDL.speicherSchluessel` (Schlüssel im localStorage).
- Die Struktur (Klammern, Kommas, Anführungszeichen). Ein fehlendes Komma
  macht die Datei ungültig – dann bleibt der Warenkorb leer und das Quiz
  erscheint nicht. Nach jeder Änderung die Seite im Browser prüfen.

**Zusammenspiel mit dem HTML**

Damit die Seiten auch ohne JavaScript lesbar bleiben (Progressive
Enhancement, SEO), stehen Produktbeschreibung, Produktdetails und FAQ zusätzlich
als statisches HTML in `produkt.html` und `faq.html`. Mit JavaScript werden
diese Bereiche aus `data.js` neu aufgebaut, `data.js` ist also führend.
Redaktionshinweis: Wer Texte in `data.js` ändert, sollte die statischen
Fallback-Texte in den beiden HTML-Dateien mitziehen. Header und Footer sind
bewusst auf jeder Seite als identisches statisches HTML wiederholt (kein
JavaScript-Injecting), damit Navigation und Rechtslinks ohne Skript
funktionieren und Suchmaschinen sie direkt sehen.

---

## 5. Entscheidungslog

Format: Beobachtung → Risiko → Entscheidung → Begründung.

### 5.1 Selbst gehostete Schriften

- **Beobachtung:** Chewy und Quicksand stehen bei Google Fonts bereit; die
  Einbindung über den CDN wäre eine Zeile.
- **Risiko:** Beim Laden über den Google-Fonts-CDN wird die IP-Adresse der
  Besucher an Google übertragen. Das LG München hat das 2022 ohne
  Einwilligung als DSGVO-Verstoß eingestuft.
- **Entscheidung:** Beide Schriften liegen als woff2 in `assets/fonts/` und
  werden per `@font-face` mit `font-display: swap` eingebunden. Es gibt keine
  externen Requests im Live-Betrieb.
- **Begründung:** Vollständige Kontrolle, kein Einwilligungsbedarf, keine
  Abhängigkeit von Drittservern, schnelleres Laden durch gleiche Origin.

### 5.2 Kontrast des Hover-Zustands

- **Beobachtung:** `--btn-hover` (#ff2f7f) erreicht gegen die Buttonschrift
  (#fdfbfd) nur 3,42:1.
- **Risiko:** WCAG AA verlangt 4,5:1 für normalen Text; der Hover-Zustand
  würde durchfallen.
- **Entscheidung:** Alle Button-Labels sind mindestens 18 px groß und in
  Schriftschnitt 700 gesetzt. Damit greift die Large-Text-Schwelle von 3:1.
  Der Fokusring nutzt dasselbe Pink (3,42:1 gegen Hell und gegen Dunkel) und
  erfüllt damit die 3:1-Anforderung für Nicht-Text-Kontrast.
- **Begründung:** Die Markenfarbe bleibt erhalten, die Anforderung wird über
  Typografie statt über eine Farbänderung erfüllt. Zusätzlich sind
  Link-Farben auf der Flieder-Fläche auf `--bg-dark` umgestellt, weil das
  Standard-Violett dort nur 4,27:1 erreicht (jetzt 8,76:1).

### 5.3 Platzierung des Warenwert-Hinweises (Mystery-Box)

- **Beobachtung:** Bei Überraschungsprodukten ist der Inhalt vor dem Kauf
  unbekannt; die Preisangabe könnte als irreführend wahrgenommen werden.
- **Risiko:** Verbraucherschutz: Käufer treffen eine Entscheidung ohne zu
  wissen, was sie bekommen. Versteckt man die Bedingungen in einem
  Akkordeon, ist das ein klassisches Dark Pattern.
- **Entscheidung:** Ein hervorgehobener Kasten direkt unter dem Preis, ohne
  Klick sichtbar, nennt Mindest-Warenwert, garantierten Inhalt, fehlenden
  Anspruch auf Motive und das Widerrufsrecht. Erst darunter folgen die
  Akkordeons.
- **Begründung:** Wesentliche Vertragsinformationen müssen vor der
  Kaufhandlung wahrnehmbar sein; der Kasten schützt Käufer und den Anbieter
  vor dem Vorwurf einer irreführenden Preisangabe.

### 5.4 Beschriftung des Bestellbuttons

- **Beobachtung:** Übliche Shop-Buttons heißen „Kaufen“ oder „Bestellung
  abschicken“.
- **Risiko:** § 312j Abs. 3 BGB verlangt, dass der Button eindeutig auf die
  Zahlungspflicht hinweist; sonst kommt kein wirksamer Vertrag zustande.
- **Entscheidung:** Der Button trägt wörtlich „Zahlungspflichtig bestellen“.
  Direkt darüber steht eine Checkbox zur Kenntnisnahme von Widerrufsbelehrung
  und Datenschutz sowie ein Satz, der die Bedeutung des Buttons erklärt.
- **Begründung:** Die Button-Lösung ist gesetzlich vorgeschrieben; die
  wörtliche Übernahme ist die rechtssicherste Variante.

### 5.5 Consent-Banner

- **Beobachtung:** Die Seite setzt keine Cookies und lädt keine
  Drittanbieter. Der Warenkorb nutzt `localStorage`, ist technisch notwendig
  und damit einwilligungsfrei (§ 25 Abs. 2 TDDDG).
- **Risiko:** Ohne Banner wäre eine spätere Erweiterung um Analytics oder
  Social-Embeds nicht abgesichert; mit einem übertriebenen Banner würde
  Einwilligung suggeriert, wo keine nötig ist.
- **Entscheidung:** Ein schlankes Banner mit gleichwertigen Optionen „Alle
  akzeptieren“ und „Nur notwendige“, Link zur Datenschutzerklärung, Wahl im
  `localStorage`, jederzeit über den Footer-Link „Cookie-Einstellungen“
  änderbar. Es setzt nur die Variable `DIDDL.trackingErlaubt`.
- **Begründung:** In dieser Ausbaustufe ist das Banner technisch nicht
  zwingend. Es existiert, weil (a) die Kampagne absehbar Reichweitenmessung
  braucht und der Mechanismus dann bereits steht, (b) das Banner transparent
  erklärt, was lokal gespeichert wird, und (c) beide Optionen gleichwertig
  gestaltet sind – kein Nudging.

### 5.6 Statische Seiten statt JavaScript-Routing

- **Beobachtung:** Eine Single-Page-Anwendung mit clientseitigem Routing
  würde Übergänge flüssiger machen.
- **Risiko:** GitHub Pages kennt kein serverseitiges Rewriting; Deep-Links
  auf Unterseiten würden auf `404.html` landen. Ohne JavaScript wäre nichts
  erreichbar, Suchmaschinen sähen leere Seiten.
- **Entscheidung:** Neun eigenständige HTML-Dateien mit relativen Links;
  Header und Footer als wiederholtes statisches Markup.
- **Begründung:** Jede URL ist direkt aufrufbar und teilbar (wichtig für
  Social-Media-Verlinkung), alle Inhalte sind ohne JavaScript lesbar, und
  die Seite ist ohne Build-Schritt deploybar.

### 5.7 Hero-Text neben statt über dem Bild

- **Beobachtung:** Das Kampagnenbanner enthält bereits Logo und Figuren.
- **Risiko:** Text über dem Bild würde mit dem Logo kollidieren und den
  Kontrast unkalkulierbar machen.
- **Entscheidung:** Headline, Subline und Button stehen auf einer
  Pastellfläche mit weichen Farbblobs; das Banner sitzt darunter in einem
  weißen Sticker-Rahmen. Die Bildwahl (Desktop-Banner vs. Mobile-Gruppe)
  läuft über `<picture>`.
- **Begründung:** Lesbarkeit und Kontrast bleiben garantiert; das Original-
  Artwork wird nicht überdeckt.

### 5.8 Bildformate und -größen

- **Beobachtung:** Einige Quelldateien waren 3–4 MB groß (3840 px breit).
  Das Briefing sah für drei Bilder das webp- bzw. png-Format vor.
- **Risiko:** Ladezeit auf Mobilfunk, Layout-Sprünge.
- **Entscheidung:** Alle großen Bilder auf maximal 1600 px verkleinert; drei
  Dateien wurden als JPEG statt webp/png abgelegt (`ueber-1-charaktere.jpg`,
  `ueber-3-comeback.jpg`, `tuete-5.jpg`), weil auf dem Build-Rechner kein
  webp-Encoder verfügbar war und PNG für Fotos ungeeignet ist. Jedes Bild hat
  `width`/`height`, `loading="lazy"` (außer Hero und erstes Galeriebild) und
  einen deutschen Alt-Text.
- **Begründung:** Gesamtgewicht der Startseite bleibt unter 1 MB; das
  Format ist für die Nutzung irrelevant, die Dateinamen sind sprechend.

---

## 6. Barrierefreiheit

**Geprüft wurde**

| Kriterium | Prüfung | Ergebnis |
|---|---|---|
| Semantik, eine `<h1>` pro Seite, Überschriftenhierarchie ohne Sprünge | Skript über alle neun Seiten | Alle Seiten bestanden |
| `lang="de"`, `<title>` und `<meta description>` pro Seite | Skript | Bestanden |
| Alle Bilder mit `alt`, `width`, `height` | Skript | Bestanden |
| Alle Formularfelder mit verknüpftem `<label>` | Skript | Bestanden |
| Relative Pfade, keine toten Links, Anker vorhanden | Skript | Bestanden |
| Textkontrast | Berechnung nach WCAG-Formel | Text 12,4:1 bis 16,6:1; Links ≥ 4,99:1; Button-Text auf Violett 5,71:1; Hover-Pink 3,42:1 nur mit ≥ 18 px/700 (siehe 5.2) |
| Sichtbarer Fokus | Manuell im Browser, Tab-Reihenfolge Skip-Link → Logo → Navigation → Warenkorb → Burger | Pinker Doppelring (Pink außen, Hell innen) auf allen Flächen sichtbar; kein `outline: none` |
| Skip-Link | Erster Tab-Stopp auf jeder Seite | Springt zu `#hauptinhalt` |
| Tastaturbedienung Burger-Menü | `aria-expanded`, `aria-controls`, Escape schließt und setzt Fokus zurück | Funktioniert |
| Tastaturbedienung Karussell | Pfeiltasten links/rechts bei Fokus im Karussell, Punkt-Buttons mit `aria-label`, Statusmeldung `aria-live` | Funktioniert, Fokus wandert mit |
| Akkordeons | `<button aria-expanded>` steuert `hidden`; ohne JS alle offen | Funktioniert |
| Quiz | Antworten als Buttons, Fortschritt „Frage x von y“ per `aria-live`, Ergebnis als fokussierte `aria-live`-Region | Funktioniert |
| Checkout | Fehlermeldungen direkt am Feld, per `aria-describedby` verknüpft, `aria-invalid`, Fokus springt aufs erste Fehlerfeld; Schrittwechsel fokussiert die Überschrift | Funktioniert |
| `prefers-reduced-motion` | CSS-Media-Query setzt alle Animationen und Übergänge auf 0 | Umgesetzt |
| Ohne JavaScript | Firefox mit deaktiviertem JS, 375 px | Alle Inhalte lesbar, Navigation im Fluss, Slides untereinander, Akkordeons offen; Warenkorb, Quiz und Karussell-Steuerung entfallen erwartungsgemäß |
| Responsiv | 360, 375, 768, 1280 px | Kein horizontales Scrollen, Navigation ab 768 px einzeilig |

**Bekannte Einschränkungen:** Es wurde kein Screenreader-Test mit VoiceOver
oder NVDA durchgeführt. Die Wischgeste am Karussell hat keine Alternative
für Switch-Nutzer außer den Pfeil-Buttons (die vorhanden sind).

---

## 7. Deployment auf GitHub Pages

1. Neues Repository auf GitHub anlegen, z. B. `diddl-comeback-tuete`
   (öffentlich, ohne README-Vorlage).
2. Lokal im Ordner `diddl-comeback-tuete/`:
   ```bash
   git remote add origin https://github.com/<benutzername>/diddl-comeback-tuete.git
   git push -u origin main
   ```
3. Auf GitHub: **Settings → Pages → Build and deployment**.
   Source: „Deploy from a branch“, Branch: `main`, Ordner: `/ (root)`.
   Speichern.
4. Nach ein bis zwei Minuten ist die Seite unter
   `https://<benutzername>.github.io/diddl-comeback-tuete/` erreichbar.
5. Prüfen: Startseite laden, Browserkonsole öffnen (keine 404), eine Tüte in
   den Warenkorb legen, Seite neu laden (Warenkorb bleibt), Checkout bis zur
   Bestätigung durchspielen.

**Warum kein Build-Schritt nötig ist:** Alle Pfade sind relativ
(`assets/css/style.css`, nicht `/assets/…`), Dateinamen sind klein
geschrieben und ohne Umlaute, `.nojekyll` verhindert, dass GitHub den Ordner
durch Jekyll schickt. Jede Änderung wird mit `git push` live.

**Nach dem Deployment nachziehen:** Die `og:image`-Angaben in den
`<head>`-Bereichen sind relativ. Social-Media-Crawler brauchen absolute
URLs; nach dem ersten Deployment `assets/img/hero-banner.webp` durch
`https://<benutzername>.github.io/diddl-comeback-tuete/assets/img/hero-banner.webp`
ersetzen (Suchen und Ersetzen über alle HTML-Dateien).

---

## 8. Offene Punkte und Risiken

| Punkt | Status | Auswirkung |
|---|---|---|
| **Rechtstexte** (Impressum, Datenschutz, Widerruf/AGB) | Platzhalter in eckigen Klammern, sichtbarer Hinweiskasten auf jeder Seite | Vor einem echten Betrieb zwingend vom Rechts-Teilprojekt zu liefern |
| **Bildrechte** | Alle Bilder stammen aus dem Projektordner (Referenzmaterial); Rechteinhaber: Depesche / Thomas Goletz, dpa, Händler | Prototyp nur für Prüfungszwecke; keine Veröffentlichung ohne Lizenz |
| **Charakterbilder für das Quiz** | Keine freigestellten Einzelbilder vorhanden; Ergebnis als farbige Sticker-Karte (Diddl = Rosa, Diddlina = Pink, Pimboli = Flieder, Ackaturbo = Violett) | Bilder können später in `quiz.js` (Funktion `ergebnisZeigen`) ergänzt werden |
| **Schriftdateien** | Chewy 400, Quicksand 400/600/700 liegen als woff2 vor | Erledigt |
| **Kein echtes Payment** | Checkout simuliert; keine Datenübertragung | Ausbauweg siehe Abschnitt 2 |
| **Newsletter** | Nur Frontend-Erfolgsmeldung, kein Double-Opt-In-Versand | Dienst anbinden, sobald ein Backend/Formulardienst gewählt ist |
| **`og:image` relativ** | Siehe Abschnitt 7 | Nach Deployment auf absolute URL setzen |
| **404 bei verschachtelten Pfaden** | `404.html` nutzt relative Pfade; bei URLs mit Unterordner (`/repo/foo/bar`) laden Stylesheet und Bilder nicht | Für Projektseiten akzeptiert; alternativ `<base href>` nach Deployment setzen |
| **Fallback-Texte** | Produktbeschreibung und FAQ stehen zusätzlich statisch im HTML | Bei Änderungen in `data.js` mitpflegen (Abschnitt 4) |
| **Annahmen im Prototyp** | Versandkosten 4,95 €, Lieferzeit 2–4 Werktage, Länder DE/AT/CH, Artikelnummer `DEMO-2026-001` | Frei gesetzte Demo-Werte, keine Angaben der Marke; über `data.js` änderbar |
| **Screenreader-Test** | Nicht durchgeführt | Vor Livegang mit VoiceOver/NVDA prüfen |

---

## 9. Quellenverzeichnis Bilder

Alle Bilder wurden aus dem Projektordner `Inspiration Vorlagen uä/`
übernommen, umbenannt und verkleinert. Die Rechte liegen bei den jeweiligen
Rechteinhabern (Diddl-Artwork: © Thomas Goletz / Depesche). Der Prototyp
nutzt sie ausschließlich zu Prüfungszwecken.

| Zieldatei | Quelldatei im Projektordner | Einsatz | Bearbeitung |
|---|---|---|---|
| `logo-diddl-is-back.png` | `logo-diddl-2025.png` | Header | Striche auf `--text-dark` umgefärbt, Alphakanal beibehalten (die Quelle hatte entgegen dem Briefing bereits einen Alphakanal) |
| `logo-diddl-is-back-hell.png` | `logo-diddl-2025.png` | Footer | Striche auf `--text-light`, weiße Füllflächen transparent |
| `favicon.png` | `logo-diddl-2025.png` | Favicon | Ausschnitt Mausgesicht auf Pastell-Rosa, 128 px |
| `hero-banner.webp` | `diddl-is-back-hero-banner-dektop-diddel-rosa-lafueliki.jpg.webp` | Hero Desktop | unverändert (1920 × 800) |
| `hero-gruppe.webp` | `diddl-header-2.webp` | Hero Mobile | unverändert (730 × 391) |
| `ueber-1-charaktere.jpg` | `04548352-bb25-49fd-a065-4bbb1a6a757e.jpg-3.webp` | Carousel Slide 1 | auf 1600 px verkleinert, JPEG |
| `ueber-2-nostalgie.jpg` | `diddl-mau-20804.jpeg` | Carousel Slide 2 | auf 1600 px verkleinert |
| `ueber-3-comeback.jpg` | `Bildschirmfoto 2026-09-13 um 14.06.51.png` | Carousel Slide 3 | auf 1600 px verkleinert, JPEG |
| `tuete-1.webp` | `diddl-einkaufstuten.webp` | Produkt Hauptbild, Warenkorb | unverändert |
| `tuete-2.webp` | `diddl-is-back-.webp` | Produktgalerie | unverändert |
| `tuete-3.webp` | `dpa-com-60828636-2-jpg.webp` | Produktgalerie | unverändert (dpa-Bild) |
| `tuete-4.jpg` | `a69c6f23-07f4-4cd7-8a36-a669299a2902_w640_r1_fpx45_fpy45.jpg` | Produktgalerie | unverändert |
| `tuete-5.jpg` | `FpZcpaFQ7E2He3qO3mSkeNtUfEZsX1-metacHJvZHVrdGVfbW9iLnBuZw==--2.png` | Produktgalerie | JPEG statt PNG |
| `inhalt-block.jpg` | `diddl-notizblock-100.jpg` | Was steckt drin | auf 1200 px verkleinert |
| `inhalt-plueschtier.jpg` | `DEZTEL6XNZEGTF5BWMOADRQW2E.jpg` | Was steckt drin | auf 1600 px verkleinert |
| `inhalt-schreibwaren.webp` | `Diddl.webp` | Was steckt drin | unverändert |
| `inhalt-tasse.jpg` | `61it4vMiy2L.jpg` | Teaser Startseite | auf 1000 px verkleinert |

Schriften: [Chewy](https://fonts.google.com/specimen/Chewy) (SIL Open Font
License) und [Quicksand](https://fonts.google.com/specimen/Quicksand)
(SIL Open Font License), als woff2 lokal in `assets/fonts/`.

Social-Media-Links: offizielle Kanäle laut Verlinkung auf diddl.de
(Instagram und TikTok `@diddl_original`, Facebook `DieDiddlmaus`, YouTube-Kanal),
Stand September 2026.

---

## Anhang A: Designkonzept

### Palette

| Token | Wert | Rolle |
|---|---|---|
| `--text-dark` | `#39091c` | Fließtext, Headlines |
| `--text-light` / `--bg-light` | `#fdfbfd` | Grundfläche, Schrift auf Dunkel |
| `--bg-dark` | `#5d0872` | Footer, Ackaturbo-Sticker, Links auf Flieder |
| `--btn` | `#9929cf` | Primär-Buttons, Links, Rahmen |
| `--btn-hover` | `#ff2f7f` | Hover, Fokusring, Wellen-Unterstreichung, Diddlina-Sticker |
| `--pastel-rosa` *(abgeleitet)* | `#ffe6f0` | `#ff2f7f` + 88 % Weiß – Hero, Sticker-Etiketten, Diddl-Sticker |
| `--pastel-flieder` *(abgeleitet)* | `#ebd4f5` | `#9929cf` + 80 % Weiß – Teaser-Section, flache Karten, Pimboli-Sticker |

Schatten sind aus dem Violett gemischt (`rgba(93, 8, 114, 0.14)`), nicht aus
Grau, damit keine zusätzlichen Grautöne entstehen.

### Typo-Rollen

- **Display (Chewy 400):** `h1` fluid `clamp(2.75rem, 8vw, 5.5rem)`,
  `h2` `clamp(2rem, 5vw, 3.25rem)`, `h3` 28 px. Zeilenhöhe 1,02–1,15,
  nie Versalien.
- **Fließtext (Quicksand 400):** 17 px / 1,6, Zeilenlänge `max-width: 62ch`.
- **Labels, Navigation, Preise (Quicksand 600).**
- **Buttons (Quicksand 700, ≥ 18 px).**
- Skala: 14 / 17 / 18 / 22 / 28 / fluid h2 / fluid h1.

### Layoutkonzept

- Mobile first, Container 1152 px, Textseiten 736 px.
- Flächenrhythmus der Startseite: Pastell-Rosa (Hero) → Hell (Über Diddl) →
  Flieder (Teaser) → Hell (Quiz) → Violett (Footer). Wellen-Trenner als
  Inline-SVG nur an zwei Stellen, in zwei verschiedenen Formen.
- Drei Kartentypen statt einer: *Sticker-Karte* (weiß, heller Halo, weicher
  Schatten, Radius 24), *flache Karte* (Pastell, kein Schatten, Radius 16),
  *Hinweiskasten* (violetter/pinker Rahmen mit Etikett).
- Der Hero ist die eine laute Stelle. Ab der Produktseite wird es sachlich,
  der Checkout ist nüchtern.
- Bewegung nur als Antwort auf Nutzeraktionen: Akkordeon, Toast,
  Quiz-Ergebnis, Slide-Wechsel. `prefers-reduced-motion` schaltet alles ab.

### Drei Leitprinzipien

1. **Nostalgie zeigen, nicht behaupten.** Die Original-Illustrationen tragen
   die Emotion; Text bleibt kurz, Chewy nur für Headlines.
2. **Laut oben, ruhig unten.** Der Hero darf schreien, der Kaufprozess wird
   ernst genommen.
3. **Ehrlich und erreichbar.** Transparenz-Kasten ohne Klick, Prototyp-Hinweis
   überall, alles per Tastatur und ohne JavaScript lesbar.

### Bewusst vermiedene Muster

Identische Karten mit identischem Grau-Schatten, ALL-CAPS-Eyebrows,
einzelne farbige Wörter in Headlines, nummerierte Marker ohne Reihenfolge,
Pfeile im Buttontext, Fade-and-slide-up an jeder Section. Stattdessen: eine
pinke Wellen-Unterstreichung unter Startseiten-`h2`, eine einzige Neigung
(Teaser-Foto, –2°), eine Sticker-Collage in drei Größen für „Was steckt drin?“.

---

## Anhang B: Dateistruktur

```
index.html                  Startseite: Hero, Über Diddl, Teaser, Quiz
produkt.html                Produktdetailseite mit Galerie und Transparenz-Kasten
warenkorb.html              Warenkorb und Checkout in drei Schritten
bestellbestaetigung.html    Bestätigung mit Kanalverknüpfung
faq.html                    Häufige Fragen (aus data.js)
impressum.html              Platzhalter mit Pflichtgliederung
datenschutz.html            Platzhalter mit Pflichtgliederung
widerruf.html               Widerrufsbelehrung, Muster-Formular, AGB (Platzhalter)
404.html                    Fehlerseite
favicon.ico                 Favicon (zusätzlich zu assets/img/favicon.png)
.nojekyll                   GitHub Pages ohne Jekyll
README.md                   diese Dokumentation
BRIEFING.md                 Arbeitsauftrag (Kopie von Prompts/PROMPT.md)
assets/
  css/style.css             gesamtes Styling, ein File, Tokens in :root
  js/data.js                zentrale Inhaltsdaten (Produkt, Versand, FAQ, Quiz, Kanäle)
  js/app.js                 Header, Warenkorb-Zustand, Toast, Karussell, Akkordeon,
                            FAQ-Aufbau, Newsletter, Consent
  js/produkt.js             Galerie, Mengenwahl, In den Warenkorb
  js/warenkorb.js           Warenkorb, Checkout-Schritte, Validierung, Bestätigung
  js/quiz.js                Diddl-Quiz
  img/                      Bilder (siehe Quellenverzeichnis)
  fonts/                    Chewy und Quicksand als woff2
```

Abweichung vom Briefing: Karussell und Akkordeon liegen in `app.js` statt
in `produkt.js`, weil beide auf mehreren Seiten gebraucht werden (Karussell:
Startseite und Produktgalerie; Akkordeon: Produktseite und FAQ).
`produkt.js` nutzt die gemeinsame Karussell-Funktion für die Galerie.
