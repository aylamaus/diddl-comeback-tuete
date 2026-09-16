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
4. [Contentpflege über das CMS](#4-contentpflege-über-das-cms)
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
(reines HTML, CSS, JavaScript; Hosting auf GitHub Pages), ergänzt um ein
**Git-basiertes Headless-CMS** (Sveltia CMS) für die Inhaltspflege. Die
Inhalte liegen als JSON-Dateien im Repository, das CMS ist eine reine
Redaktionsoberfläche ohne eigene Datenbank und ohne Server – jede Änderung
ist ein Git-Commit, den GitHub Pages automatisch ausliefert.

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

- **Redaktionsoberfläche nur für Inhalte, nicht für Struktur.** Über das CMS
  lassen sich Texte, Bilder, Preise, FAQ, Quiz und Bewertungen pflegen;
  neue Seiten oder Abschnitte brauchen weiterhin HTML-Kenntnisse.
- **Rechte nur über GitHub, kein Freigabeworkflow.** Wer als Collaborator
  Schreibrecht im Repository hat, veröffentlicht direkt; Entwürfe und
  Vier-Augen-Freigaben gibt es nicht (Sveltia CMS bietet keinen Editorial
  Workflow; Decap CMS könnte das über Pull Requests nachrüsten).
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
3. **Langfristig (Redaktion mit Freigaben, viele Seiten):** Wechsel auf ein
   Headless-CMS mit Rollen und Workflows (z. B. Decap mit Editorial Workflow
   oder ein gehostetes Headless-CMS); die hier definierten JSON-Strukturen in
   `content/` sind die Vorlage für die Datenmodelle.

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

## 4. Contentpflege über das CMS

Die Inhalte liegen als sechs JSON-Dateien in `content/` und werden über
**Sveltia CMS** gepflegt, ein Git-basiertes Headless-CMS: Die
Redaktionsoberfläche läuft im Browser unter `admin/`, liest und schreibt die
Dateien direkt im GitHub-Repository und erzeugt für jede Änderung einen
Commit (`CMS: Produkt „produkt“ aktualisiert`). Es gibt keine Datenbank und
keinen Server; GitHub Pages liefert die geänderten Dateien nach etwa einer
Minute aus.

| Datei | Bereich im CMS | Inhalt |
|---|---|---|
| `content/startseite.json` | Startseite | Hero, Über-Diddl-Slides (Text, Bild, Button), Teaser, Newsletter-Abschnitt |
| `content/produkt.json` | Produkt | Name, Texte, Preis in Euro, Mindest-Warenwert, Maximalmenge, Details, garantierter Inhalt, Galerie mit Notizen |
| `content/einstellungen.json` | Versand & Kanäle | Versandkosten, Lieferzeit, Länder, Zahlungsarten, Hashtag, Social-Links |
| `content/faq.json` | FAQ | Fragen und Antworten (Leerzeile = Absatz) |
| `content/quiz.json` | Quiz | Überschriften, Kopfbild, vier Figuren mit Bild, Fragen mit je vier Antworten und Zuordnung |
| `content/bewertungen.json` | Bewertungen (Beispiel) | Überschrift, Hinweistext, Einträge |

**So läuft eine Änderung**

1. `https://aylamaus.github.io/diddl-comeback-tuete/admin/` öffnen und mit
   GitHub anmelden (siehe Abschnitt 7, „Anmeldung im CMS“).
2. Bereich wählen, Feld ändern, Bild hochladen (landet in `assets/img/`).
3. „Speichern“ – das CMS committet auf `main`. Nach ein bis zwei Minuten ist
   die Änderung live; ggf. Seite hart neu laden (Cmd + Shift + R).

**Was das CMS absichert:** Pflichtfelder, Zahlenfelder mit Grenzen (Sterne
1–5, Menge 1–20), feste Anzahl bei Slides (3), Figuren (4) und Antworten
(4), Auswahlfelder für die Figur-Zuordnung. Ein kaputtes JSON ist damit
praktisch ausgeschlossen – anders als beim früheren Editieren einer
JavaScript-Datei im Texteditor.

**Wer darf ändern:** Alle GitHub-Accounts, die als Collaborator
Schreibrecht im Repository haben. Das ist die Rollen- und Rechteverwaltung
dieses Systems; Rechte entziehen = Collaborator entfernen. Jede Änderung ist
im Git-Log mit Autor und Zeitpunkt nachvollziehbar und rückgängig zu machen.

**Technik dahinter:** `assets/js/daten.js` lädt die JSON-Dateien per
`fetch`, rechnet Euro in Cent um, macht aus der Figurenliste eine Map und
stellt alles als `window.DIDDL` bereit. Erst dann starten Warenkorb, Quiz,
Galerie und die Textbindung der Startseite (Ereignis `diddl:bereit`).
Elemente mit `data-inhalt="startseite.hero.headline"` bekommen ihren Text
aus dem JSON, `data-inhalt-bild` und `data-inhalt-link` entsprechend Bild
und Link.

**Grenzen und Fallback:** Die HTML-Seiten enthalten die Texte zusätzlich
statisch – als Fallback ohne JavaScript und für Suchmaschinen. Diese
Fallback-Texte werden vom CMS **nicht** aktualisiert und können deshalb
mit der Zeit vom Live-Inhalt abweichen; das ist eine bewusste Grenze der
Build-freien Lösung (siehe 5.15). Die Rechtsseiten und die Struktur der
Seiten bleiben absichtlich außerhalb des CMS, damit Pflichttexte nicht
versehentlich verändert werden.

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
- **Entscheidung:** Ein schlankes Banner mit gleichwertigen Optionen „Nur
  notwendige“ und „Alle akzeptieren“, Links zu Datenschutzerklärung und
  Impressum, Wahl im `localStorage`, jederzeit über den Footer-Link
  „Cookie-Einstellungen“ änderbar. Es setzt nur die Variable
  `DIDDL.trackingErlaubt`. Nach Rückmeldung aus dem Rechts-Teilprojekt
  (14.09.2026) sind beide Buttons identisch gestaltet (Outline, gleiche
  Größe); „Alle akzeptieren“ ist nicht hervorgehoben.
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

### 5.7 Hero: Kampagnenfoto als Hintergrund, aber ohne Logo im Bild

- **Beobachtung:** Der erste Entwurf stellte Text und Banner untereinander,
  weil das Banner bereits das „Diddl is back!“-Logo enthält. Das
  Kundenfeedback vom 14.09.2026 wünschte das Foto als ganzes Hintergrundbild.
- **Risiko:** Text über dem Bild kollidiert mit Logo und Figuren, der
  Kontrast wäre unkalkulierbar.
- **Entscheidung:** Das Banner wurde auf 1920 × 500 px beschnitten, sodass
  das Logo wegfällt (`hero-banner-ohne-logo.jpg`); auf Mobile bleibt die
  Figurengruppe ohne Logo. Das Foto liegt unten in der Section, der Text
  darüber direkt auf der rosa Aquarellfläche (die zunächst gebaute
  Sticker-Karte wurde auf Kundenwunsch vom 16.09.2026 entfernt). Die
  Foto-Oberkante wird per `mask-image` weich in die Fläche eingeblendet,
  damit keine Kante entsteht. `<picture>` wählt weiterhin das passende Bild;
  das unbeschnittene Banner bleibt als `og:image` für Social-Media-Vorschauen.
- **Begründung:** Text und Figuren überlappen sich nicht, das Artwork wird
  nicht überdeckt, und der Hero wirkt als Vollbild wie gewünscht.

### 5.8 Bildformate und -größen

- **Beobachtung:** Einige Quelldateien waren 3–4 MB groß (3840 px breit).
  Das Briefing sah für drei Bilder das webp- bzw. png-Format vor.
- **Risiko:** Ladezeit auf Mobilfunk, Layout-Sprünge.
- **Entscheidung:** Alle großen Bilder auf maximal 1600 px verkleinert;
  mehrere Dateien wurden als JPEG statt webp/png abgelegt
  (`ueber-1-charaktere.jpg`, `tuete-5.jpg`, `hero-banner-ohne-logo.jpg`),
  weil auf dem Build-Rechner kein webp-Encoder verfügbar war und PNG für
  Fotos ungeeignet ist. Jedes Bild hat
  `width`/`height`, `loading="lazy"` (außer Hero und erstes Galeriebild) und
  einen deutschen Alt-Text.
- **Begründung:** Gesamtgewicht der Startseite bleibt unter 1 MB; das
  Format ist für die Nutzung irrelevant, die Dateinamen sind sprechend.

### 5.9 Akzentblau außerhalb der Briefing-Palette

- **Beobachtung:** Das Kundenfeedback vom 14.09.2026 wünschte blaue
  Hover-Zustände in Navigation und Footer und nannte `#14b2ff`. Das Briefing
  erlaubt nur die Tokens plus zwei abgeleitete Pastelltöne.
- **Risiko:** Ein Blau ohne Regeln würde die Palette verwässern; `#14b2ff`
  erreicht gegen Weiß nur 2,4:1 und ist damit als Textfarbe auf hellem
  Grund unzulässig.
- **Entscheidung:** Neuer Token `--akzent-blau: #14b2ff`, ausschließlich für
  Hover- und Fokus-Zustände: in der Navigation als 3 px starke Linie, die
  unter dem Menüpunkt aufzieht (seit 16.09.2026, vorher als Fläche), und als
  Link-/Iconfarbe auf dem dunklen Footer (4,75:1). Nie als Fließtext auf
  Hell, nie als Fläche mit heller Schrift. Der aktuelle Menüpunkt trägt die
  Linie dauerhaft.
- **Begründung:** Kundenwunsch wird erfüllt, die Kontrastregeln bleiben
  eingehalten, und die Erweiterung ist dokumentiert statt still eingeführt.

### 5.10 Beispiel-Bewertungen

- **Beobachtung:** Der Kunde wünschte eine Bewertungssektion mit drei
  Beispielen. Das Briefing verbietet erfundene Bewertungen; rechtlich sind
  fingierte Kundenbewertungen irreführende Werbung (§ 5b Abs. 3 UWG,
  Anhang Nr. 23b/23c).
- **Risiko:** Prüfende und Nutzer könnten die Texte für echt halten.
- **Entscheidung:** Section „Das sagen Diddl-Fans“ mit drei Karten, jede
  trägt das Etikett „Beispiel“, die Subline sagt ausdrücklich, dass die
  Stimmen erfunden sind. Die Texte liegen in `content/bewertungen.json`;
  der CMS-Bereich heißt ausdrücklich „Bewertungen (Beispiel)“.
- **Begründung:** Die Section zeigt das Layout, ohne zu täuschen. Vor einem
  echten Betrieb sind die Einträge zu ersetzen oder zu löschen.

### 5.11 Wellen an jedem Sectionwechsel und dezentes Einblenden

- **Beobachtung:** Der erste Entwurf setzte bewusst nur zwei Wellen und
  keine Scroll-Animationen (Briefing: kein „Fade-and-slide-up an jeder
  Section“). Das Kundenfeedback wünschte mehr Wellen und ein sanftes
  Einblenden als Extra.
- **Risiko:** Monotonie durch identische Trenner; Bewegung, die ablenkt oder
  Menschen mit Bewegungsempfindlichkeit stört.
- **Entscheidung:** Wellen an jedem Wechsel der Startseite, drei
  verschiedene Formen im Wechsel, Produkt- und Checkout-Seite bleiben ohne.
  Einblenden nur über die Deckkraft (kein Verschieben), einmalig,
  0,5 Sekunden, per `IntersectionObserver`; bei `prefers-reduced-motion`
  und ohne JavaScript ist alles sofort sichtbar.
- **Begründung:** Der Kundenwunsch wird erfüllt, ohne das Standardmuster
  „slide-up“ zu übernehmen und ohne Barrierefreiheit zu opfern.

### 5.12 Bild mit erkennbaren Personen nicht verwendet

- **Beobachtung:** Unter den nachgelieferten Bildern war ein Ladenfoto mit
  drei erkennbaren Personen (Pressefoto).
- **Risiko:** Persönlichkeitsrechte der Abgebildeten, fehlende Lizenz.
- **Entscheidung:** Nicht eingebaut; das Karussell nutzt stattdessen ein
  Ladenfoto mit Produkten, auf dem keine Person erkennbar ist. Mit dem
  Kunden abgestimmt.
- **Begründung:** Für einen öffentlich erreichbaren Prototyp ist das Risiko
  vermeidbar, der Nutzen des Bildes gering.

### 5.13 Passwortabfrage im Browser statt echtem Zugangsschutz

- **Beobachtung:** Der Prototyp soll für die Prüfenden online erreichbar
  sein, aber nicht von jedem geöffnet und nicht mit der offiziellen
  Diddl-Website verwechselt werden. Geprüft wurden StatiCrypt
  (Verschlüsselung jeder Seite mit Build-Schritt), Cloudflare Pages mit
  Basic-Auth-Middleware und Cloudflare Access.
- **Risiko:** Ein clientseitiger Passwortdialog ist kein Sicherheitsmechanismus:
  Die HTML-Dateien bleiben auf GitHub Pages öffentlich abrufbar, wer
  JavaScript deaktiviert oder den Quelltext liest, kommt an den Inhalt.
- **Entscheidung (Kundenwunsch 16.09.2026):** Eine einfache Passwortabfrage
  in der Seite (`assets/js/zugang.js`). Ein Inline-Skript im `<head>`
  versteckt die Seite, bis im `localStorage` eine Freigabe liegt; das
  Overlay prüft die Eingabe über einen SHA-256-Vergleich (das Passwort
  steht nicht im Klartext im Code), merkt sich die Freigabe pro Browser und
  hebt sich dann mit einer Wellenkante nach oben. Zusätzlich tragen alle
  Seiten `noindex, nofollow`, damit der Prototyp nicht in Suchmaschinen
  auftaucht.
- **Begründung:** Für den Zweck „Zugangshürde und Verwechslungsschutz“
  reicht das, ohne Hosting-Wechsel, Account oder Build-Schritt. Das
  Passwort wird den Prüfenden separat mitgeteilt. Für einen echten
  geschützten Bereich wäre serverseitiger Schutz nötig (z. B. Cloudflare
  Pages mit Basic Auth), siehe Abschnitt 8.

### 5.14 Git-basiertes Headless-CMS statt klassischem CMS

- **Beobachtung:** Die Vorlesung betont, dass Mitarbeitende Inhalte ohne
  Entwickler ändern können sollen. Der Prototyp ist eine statische Seite
  ohne Server und ohne Budget.
- **Risiko:** Ein klassisches CMS (WordPress u. a.) würde Datenbank,
  Hosting, Updates und Sicherheitspflege mitbringen – genau das, was die
  Systementscheidung vermeiden sollte.
- **Entscheidung:** Sveltia CMS als Git-basiertes Headless-CMS: eine
  statische Admin-Seite (`admin/`), die über die GitHub-API direkt die
  JSON-Dateien im Repository bearbeitet. Kein Server, keine Datenbank, keine
  Kosten; Rechte über GitHub-Collaborators; Historie über Git. Gewählt statt
  Decap CMS wegen der moderneren, deutschsprachigen Oberfläche, der
  schnelleren Bedienung und der Anmeldung per Zugriffstoken ohne
  zusätzlichen Auth-Server; Decap bleibt die Option, falls ein
  Freigabe-Workflow gebraucht wird. Das CMS-Skript wird nur auf der
  Admin-Seite von einem CDN geladen – die öffentliche Seite bleibt ohne
  externe Requests.
- **Begründung:** Erfüllt die Anforderung „schnelle Änderungen durch
  Mitarbeitende“ ohne die Systemkategorie zu wechseln: Die Seite bleibt eine
  statische Eigenentwicklung, das CMS ist ein Werkzeug darüber.

### 5.15 Inhalte als JSON, per fetch geladen

- **Beobachtung:** Bisher lagen die Inhalte in `assets/js/data.js`; ein CMS
  kann JavaScript nicht strukturiert bearbeiten.
- **Risiko:** JSON kann ein statisches HTML nicht ohne Build-Schritt
  „einbacken“; ohne JavaScript oder bei blockiertem `fetch` gäbe es keine
  Inhalte.
- **Entscheidung:** Inhalte in `content/*.json`, zur Laufzeit per `fetch`
  geladen (`daten.js`). Die HTML-Seiten behalten die Texte als statischen
  Fallback, der bei CMS-Änderungen nicht mitzieht; Preis, Transparenz-Kasten
  und Rechtstexte stehen ohnehin statisch im HTML.
- **Begründung:** Erhält den Verzicht auf einen Build-Schritt und bleibt
  ohne JavaScript lesbar; die Abweichung des Fallbacks ist dokumentiert und
  für den Prototyp akzeptabel. Ein späterer Build-Schritt (z. B. GitHub
  Action, die JSON ins HTML rendert) würde die Lücke schließen.

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
| Textkontrast | Berechnung nach WCAG-Formel | Text 12,4:1 bis 16,6:1; Links ≥ 4,99:1; Button-Text auf Violett 5,71:1; Hover-Pink 3,42:1 nur mit ≥ 18 px/700 (siehe 5.2); Akzentblau nur als Hover-Hintergrund mit dunklem Text (7,1:1) bzw. als Linkfarbe auf dunklem Footer (4,75:1) |
| Sichtbarer Fokus | Manuell im Browser, Tab-Reihenfolge Skip-Link → Logo → Navigation → Warenkorb → Burger | Pinker Doppelring (Pink außen, Hell innen) auf allen Flächen sichtbar; kein `outline: none` |
| Skip-Link | Erster Tab-Stopp auf jeder Seite | Springt zu `#hauptinhalt` |
| Passwortabfrage | `role="dialog"`, Label am Feld, Fehlermeldung als `role="alert"`, Fokus geht danach auf den Hauptinhalt; Animation entfällt bei `prefers-reduced-motion` | Umgesetzt |
| Tastaturbedienung Burger-Menü | `aria-expanded`, `aria-controls`, Escape schließt und setzt Fokus zurück | Funktioniert |
| Tastaturbedienung Karussell | Pfeiltasten links/rechts bei Fokus im Karussell, Punkt-Buttons mit `aria-label`, Statusmeldung `aria-live` | Funktioniert, Fokus wandert mit |
| Akkordeons | `<button aria-expanded>` steuert `hidden`; ohne JS alle offen | Funktioniert |
| Quiz | Antworten als Buttons, Fortschritt „Frage x von y“ per `aria-live`, Ergebnis als fokussierte `aria-live`-Region | Funktioniert |
| Checkout | Fehlermeldungen direkt am Feld, per `aria-describedby` verknüpft, `aria-invalid`, Fokus springt aufs erste Fehlerfeld; Schrittwechsel fokussiert die Überschrift | Funktioniert |
| `prefers-reduced-motion` | CSS-Media-Query setzt alle Animationen und Übergänge auf 0, Einblenden beim Scrollen wird übersprungen | Umgesetzt |
| Social-Icons ohne Textlabel | Jeder Link trägt ein `aria-label` („Diddl auf Instagram, öffnet in neuem Tab“) | Umgesetzt |
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
   `https://<benutzername>.github.io/diddl-comeback-tuete/` erreichbar
   (dieses Projekt: `https://aylamaus.github.io/diddl-comeback-tuete/`).
5. Prüfen: Startseite laden, Passwort eingeben, Browserkonsole öffnen
   (keine 404), eine Tüte in den Warenkorb legen, Seite neu laden (Warenkorb bleibt), Checkout bis zur
   Bestätigung durchspielen.

**Anmeldung im CMS (`admin/`)** – drei Wege, vom einfachsten zum
komfortabelsten:

1. **Mit Zugriffstoken:** Auf GitHub unter *Settings → Developer settings →
   Personal access tokens → Fine-grained tokens* ein Token nur für dieses
   Repository mit der Berechtigung *Contents: Read and write* erzeugen. Im
   CMS „Mit Zugriffstoken anmelden“ wählen und das Token einfügen. Kein
   weiterer Dienst nötig.
2. **Mit lokalem Repository:** In Chrome oder Edge „Mit lokalem Repository
   arbeiten“ wählen und den geklonten Ordner auswählen – Änderungen landen
   lokal und werden mit `git push` veröffentlicht.
3. **Mit GitHub-Login (OAuth):** Einmalig eine GitHub-OAuth-App anlegen und
   den kostenlosen Auth-Worker `sveltia-cms-auth` auf Cloudflare deployen,
   dessen URL als `base_url` in `admin/config.yml` eintragen. Danach genügt
   „Mit GitHub anmelden“.

**Warum kein Build-Schritt nötig ist:** Alle Pfade sind relativ
(`assets/css/style.css`, nicht `/assets/…`), Dateinamen sind klein
geschrieben und ohne Umlaute, `.nojekyll` verhindert, dass GitHub den Ordner
durch Jekyll schickt. Jede Änderung wird mit `git push` live.

**Nach dem Deployment nachgezogen:** Die `og:image`-Angaben in den
`<head>`-Bereichen zeigen als einzige Pfade absolut auf
`https://aylamaus.github.io/diddl-comeback-tuete/assets/img/…`, weil
Social-Media-Crawler keine relativen Bildpfade auflösen. Zieht das Repo um,
müssen diese neun Zeilen angepasst werden (Suchen und Ersetzen).

---

## 8. Offene Punkte und Risiken

| Punkt | Status | Auswirkung |
|---|---|---|
| **Rechtstexte** (Impressum, Datenschutz, Widerruf/AGB) | Vom Rechts-Teilprojekt geliefert und am 14.09.2026 eingepflegt; Anbieter ist das Projektteam c/o DHBW Mannheim | Erledigt; vor einem kommerziellen Betrieb erneut juristisch prüfen |
| **Bildrechte** | Alle Bilder stammen aus dem Projektordner (Referenzmaterial); Rechteinhaber: Depesche / Thomas Goletz, dpa, Händler | Prototyp nur für Prüfungszwecke; keine Veröffentlichung ohne Lizenz |
| **Charakterbilder für das Quiz** | Vier Bilder aus der 3D-Serie nachgeliefert (`figur-*.jpg`), im Ergebnis als runder Sticker; Farbflächen (Diddl und Diddlina = Rosa, Pimboli = Flieder, Wollywell = Violett) | Erledigt |
| **Beispiel-Bewertungen** | Drei erfundene, als „Beispiel“ gekennzeichnete Stimmen (siehe 5.10) | Vor echtem Betrieb ersetzen oder entfernen |
| **Schriftdateien** | Chewy 400, Quicksand 400/600/700 liegen als woff2 vor | Erledigt |
| **Kein echtes Payment** | Checkout simuliert; keine Datenübertragung | Ausbauweg siehe Abschnitt 2 |
| **Newsletter** | Nur Frontend-Erfolgsmeldung, kein Double-Opt-In-Versand | Dienst anbinden, sobald ein Backend/Formulardienst gewählt ist |
| **404 bei verschachtelten Pfaden** | `404.html` nutzt relative Pfade; bei URLs mit Unterordner (`/repo/foo/bar`) laden Stylesheet und Bilder nicht | Für Projektseiten akzeptiert; alternativ `<base href>` nach Deployment setzen |
| **Fallback-Texte** | Startseite, Produkt, FAQ und Bewertungen stehen zusätzlich statisch im HTML | Werden vom CMS nicht aktualisiert (siehe 5.15); bei größeren Änderungen im HTML nachziehen |
| **CMS-Login per OAuth** | `base_url` in `admin/config.yml` noch nicht gesetzt | Anmeldung per Zugriffstoken funktioniert sofort; OAuth-Worker optional (Abschnitt 7) |
| **Annahmen im Prototyp** | Versandkosten 4,95 €, Lieferzeit 3–5 Werktage (wie AGB), Länder DE/AT/CH, Artikelnummer `DEMO-2026-001`, Beiname „Das verträumte Schaf aus dem Käsekuchenland“ für Wollywell | Frei gesetzte Demo-Werte, keine Angaben der Marke; über das CMS änderbar |
| **Zahlungslogos** | Als Text-Badges umgesetzt, keine Markenlogos | Bei Bedarf offizielle Logodateien der Anbieter einbinden |
| **Screenreader-Test** | Nicht durchgeführt | Vor Livegang mit VoiceOver/NVDA prüfen |
| **Passwortabfrage** | Nur im Browser (siehe 5.13), kein echter Zugangsschutz; alle Seiten `noindex` | Für echten Schutz serverseitig lösen; vor einem Launch Abfrage entfernen und `noindex` zurücknehmen |

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
| `hero-banner.webp` | `diddl-is-back-hero-banner-dektop-diddel-rosa-lafueliki.jpg.webp` | `og:image` für Social-Media-Vorschauen | unverändert (1920 × 800) |
| `hero-banner-ohne-logo.jpg` | dieselbe Quelle | Hero Desktop | auf 1920 × 500 beschnitten, damit das Logo im Bild wegfällt |
| `hero-gruppe.webp` | `diddl-header-2.webp` | Hero Mobile, Newsletter-Section | unverändert (730 × 391) |
| `ueber-1-wiese.jpg` | `neue Bilder 16September/WhatsApp Image 2026-09-16 at 09.51.41.jpeg` (3D-Artwork, Diddl Studios) | Carousel Slide 1 | unverändert (900 × 1119) |
| `ueber-1-charaktere.jpg` | `04548352-bb25-49fd-a065-4bbb1a6a757e.jpg-3.webp` | Carousel Slide 2 | auf 1600 px verkleinert, JPEG |
| `ueber-3-laden.jpg` | `neue Bilder 14September/kann auch für carousel über diddl section genutzt werden.jpeg` | Carousel Slide 3 | auf 1200 px verkleinert |
| `tuete-1.webp` | `diddl-einkaufstuten.webp` | Produkt Hauptbild, Warenkorb, Teaser Startseite | unverändert |
| `tuete-2.webp` | `diddl-is-back-.webp` | Produktgalerie | unverändert |
| `tuete-3.webp` | `dpa-com-60828636-2-jpg.webp` | Produktgalerie | unverändert (dpa-Bild) |
| `tuete-4.jpg` | `a69c6f23-07f4-4cd7-8a36-a669299a2902_w640_r1_fpx45_fpy45.jpg` | Collage Schreibwaren (aus der Galerie entfernt, 16.09.2026) | unverändert |
| `tuete-5.jpg` | `FpZcpaFQ7E2He3qO3mSkeNtUfEZsX1-metacHJvZHVrdGVfbW9iLnBuZw==--2.png` | Produktgalerie | JPEG statt PNG |
| `inhalt-block.jpg` | `neue Bilder 14September/Das im Shop als 1x Block Darstellung.jpg` | Was steckt drin: Block | auf 1200 px Höhe verkleinert |
| `tuete-4.jpg` | siehe oben | Was steckt drin: Schreibwaren | – |
| `inhalt-accessoire.webp` | `Diddl.webp` (vorher `inhalt-schreibwaren.webp`) | Was steckt drin: Accessoire | unverändert |
| `inhalt-kuscheltier.jpg` | `neue Bilder 16September/WhatsApp Image 2026-09-16 at 09.52.42.jpeg` | Was steckt drin: Kuscheltier | auf 1200 px verkleinert |
| `quiz-kopf.jpg` | `neue Bilder 14September/Header oder Hintergrundfoto beim Start des Quizzes.png.jpeg` | Kopfbild Quiz | unverändert (1200 × 700) |
| `figur-diddl.jpg`, `figur-diddlina.jpg`, `figur-pimboli.jpg`, `figur-wollywell.jpg` | `neue Bilder 14September/diddl.jpg` usw. | Quiz-Ergebnis | unverändert (349 × 348) |

Nicht (mehr) verwendet: `diddl-comeback-dresden-108.jpg.avif` (Ladenfoto mit
erkennbaren Personen, siehe 5.12), `diddl-mau-20804.jpeg`, `61it4vMiy2L.jpg`
(Tasse) und `DEZTEL6XNZEGTF5BWMOADRQW2E.jpg` – ersetzt durch nachgelieferte Bilder. Weitere Quellenangaben laut
Rechts-Teilprojekt: MDR (Julia Schönfeld, 21.07.2026), Der Spiegel
(Nadine Schwickart, 19.08.2026), vedes.com.

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
| `--bg-dark` | `#5d0872` | Footer, Wollywell-Sticker, Links auf Flieder |
| `--btn` | `#9929cf` | Primär-Buttons, Links, Rahmen |
| `--btn-hover` | `#ff2f7f` | Hover, Fokusring, Wellen-Unterstreichung, Diddlina-Sticker |
| `--pastel-rosa` *(abgeleitet)* | `#ffe6f0` | `#ff2f7f` + 88 % Weiß – Hero, Sticker-Etiketten, Diddl-Sticker |
| `--pastel-flieder` *(abgeleitet)* | `#ebd4f5` | `#9929cf` + 80 % Weiß – Teaser-Section, flache Karten, Pimboli-Sticker |
| `--akzent-blau` *(Kundenwunsch 14.09.2026)* | `#14b2ff` | nur Hover/Fokus in Navigation und Footer, siehe 5.9 |

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
  Flieder (Teaser) → Hell (Bewertungen) → Rosa (Quiz) → Flieder
  (Newsletter) → Violett (Footer). Wellen-Trenner als Inline-SVG an jedem
  Wechsel, drei Formen im Wechsel (siehe 5.11).
- Bildformen: Karussell-Bilder in Blütenform, Teaser-Bild als Blob – beides
  über Inline-SVG-`clipPath` mit `objectBoundingBox`, ohne externe Assets.
- Drei Kartentypen statt einer: *Sticker-Karte* (weiß, heller Halo, weicher
  Schatten, Radius 24), *flache Karte* (Pastell, kein Schatten, Radius 16),
  *Hinweiskasten* (violetter/pinker Rahmen mit Etikett).
- Der Hero ist die eine laute Stelle. Ab der Produktseite wird es sachlich,
  der Checkout ist nüchtern.
- Bewegung als Antwort auf Nutzeraktionen (Akkordeon, Toast, Quiz-Ergebnis,
  Slide-Wechsel) plus ein dezentes Einblenden der Sections beim Scrollen
  (nur Deckkraft). `prefers-reduced-motion` schaltet alles ab.

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
Pfeile im Buttontext, Slide-up-Animationen. Stattdessen: organische
Bildformen (Blüte, Blob), eine Collage aus vier Kacheln mit unterschiedlichen
Ecken für „Was steckt drin?“, Wellen in drei Formen.

---

## Anhang B: Dateistruktur

```
index.html                  Startseite: Hero, Über Diddl, Teaser, Quiz
produkt.html                Produktdetailseite mit Galerie und Transparenz-Kasten
warenkorb.html              Warenkorb und Checkout in drei Schritten
bestellbestaetigung.html    Bestätigung mit Kanalverknüpfung
faq.html                    Häufige Fragen (aus content/faq.json)
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
  js/daten.js               lädt content/*.json und stellt window.DIDDL bereit
  js/app.js                 Header, Warenkorb-Zustand, Toast, Karussell, Akkordeon,
                            FAQ- und Bewertungs-Aufbau, Textbindung, Newsletter,
                            Consent, Einblenden
  js/produkt.js             Galerie, Mengenwahl, In den Warenkorb
  js/warenkorb.js           Warenkorb, Checkout-Schritte, Validierung, Bestätigung
  js/quiz.js                Diddl-Quiz (Ergebnis mit Charakterbild)
  js/zugang.js              Passwortabfrage (siehe 5.13)
  img/                      Bilder (siehe Quellenverzeichnis)
  fonts/                    Chewy und Quicksand als woff2
content/
  startseite.json           Texte und Bilder der Startseite
  produkt.json              Produktdaten, Preis, Galerie
  einstellungen.json        Versand, Zahlungsarten, Kampagne/Social
  faq.json                  Häufige Fragen
  quiz.json                 Quizfragen und Figuren
  bewertungen.json          Beispiel-Bewertungen
admin/
  index.html                Redaktionsoberfläche (Sveltia CMS)
  config.yml                CMS-Konfiguration: Felder, Backend, Bildordner
```

Abweichung vom Briefing: Karussell und Akkordeon liegen in `app.js` statt
in `produkt.js`, weil beide auf mehreren Seiten gebraucht werden (Karussell:
Startseite und Produktgalerie; Akkordeon: Produktseite und FAQ).
`produkt.js` nutzt die gemeinsame Karussell-Funktion für die Galerie.
