# MARYS BEAUTY – Website

Produktionsreife Webseite für ein Kosmetikstudio, gebaut mit **Astro**, **Sanity** (Headless-CMS) und **Planity** (externe Terminbuchung), gehostet auf **Cloudflare Pages**.

Diese Datei richtet sich an Entwickler:innen. Für die Inhaberin gibt es eine separate, nicht-technische Anleitung: [ANLEITUNG-INHABERIN.md](./ANLEITUNG-INHABERIN.md).

## Inhaltsverzeichnis

1. [Technologie-Stack](#1-technologie-stack)
2. [Projektstruktur](#2-projektstruktur)
3. [Lokal starten](#3-lokal-starten)
4. [Sanity-Projekt anlegen](#4-sanity-projekt-anlegen)
5. [Sanity-Schemas bereitstellen](#5-sanity-schemas-bereitstellen)
6. [Sanity Studio veröffentlichen](#6-sanity-studio-veröffentlichen)
7. [GitHub-Repository einrichten](#7-github-repository-einrichten)
8. [Cloudflare Pages verbinden & deployen](#8-cloudflare-pages-verbinden--deployen)
9. [Eigene Domain verbinden](#9-eigene-domain-verbinden)
10. [Automatisches Deployment bei Sanity-Änderungen](#10-automatisches-deployment-bei-sanity-änderungen)
11. [Planity-Integration aktivieren](#11-planity-integration-aktivieren)
12. [Sitemap & Google Search Console](#12-sitemap--google-search-console)
13. [Zugänge sicher übergeben](#13-zugänge-sicher-übergeben)
14. [Laufende Kosten & Wartung](#14-laufende-kosten--wartung)
15. [Qualitätssicherung](#15-qualitätssicherung)
16. [Übergabe-Checkliste](#16-übergabe-checkliste)

---

## 1. Technologie-Stack

| Bereich | Technologie |
|---|---|
| Framework | [Astro](https://astro.build) 7 (statischer Output, `output: 'static'`) |
| Sprache | TypeScript |
| Styling | Bootstrap 5.3 (per Sass eingebunden, eigene Design-Tokens) + eigenes CSS |
| CMS | [Sanity](https://www.sanity.io) (Headless, eigenständiges Studio in `studio/`) |
| Terminbuchung | [Planity](https://www.planity.com) (externer Link bzw. optionales White-Label-Modul) |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub → Cloudflare Pages (automatischer Build bei jedem Push) + Sanity-Webhook → Cloudflare Deploy Hook |

Bewusste Entscheidung: Es gibt **keinen eigenen Anwendungsserver** und **keine selbst betriebene Datenbank**. Die Seite ist zu 100 % statisch; alle Inhalte werden zum Build-Zeitpunkt aus Sanity geladen.

Für den Zugriff auf Sanity wird direkt `@sanity/client` und `@sanity/image-url` verwendet (nicht das `@sanity/astro`-Integrationspaket). Das hält die Abhängigkeiten schlank, vermeidet eine zusätzliche React-Abhängigkeit im Frontend-Bundle (`@sanity/astro` bringt React für das optionale Visual-Editing mit) und passt zum Ziel „möglichst wenig JavaScript". Das Studio selbst (unter `studio/`) ist ein eigenständiges, separates Projekt und bringt React nur dort mit, wo es tatsächlich gebraucht wird – im CMS, nicht auf der öffentlichen Webseite.

## 2. Projektstruktur

```
.
├── src/
│   ├── components/      Wiederverwendbare Astro-Komponenten (Header, Footer, Seo, ...)
│   ├── layouts/         BaseLayout.astro (HTML-Grundgerüst, lädt siteSettings)
│   ├── lib/              Sanity-Client, GROQ-Queries, Bildhelfer, Fallback-Inhalte
│   ├── pages/            Eine Datei = eine Route (Astro-Dateisystem-Routing)
│   ├── styles/           Bootstrap-Overrides (SCSS) + globales CSS
│   └── types/            TypeScript-Typen für Sanity-Inhalte
├── public/                Statische Dateien (Favicon, _headers, ...)
├── studio/                Eigenständiges Sanity-Studio-Projekt (eigenes package.json!)
│   ├── schemaTypes/       Alle Sanity-Schemas (Dokumente + wiederverwendbare Objekte)
│   ├── structure/         Kuratierte, deutsche Studio-Navigation
│   └── sanity.config.ts
├── astro.config.mjs
├── .env.example           Vorlage für die Astro-Umgebungsvariablen
└── package.json
```

**Wichtig:** `studio/` ist ein eigenständiges Node-Projekt mit eigenem `package.json` und eigenem `node_modules`. `npm install` im Hauptverzeichnis installiert **nicht** die Studio-Abhängigkeiten – dafür separat in `studio/` installieren (siehe unten). So bleibt der Cloudflare-Build der öffentlichen Webseite schlank und unabhängig vom CMS-Admin-Tool.

## 3. Lokal starten

Voraussetzungen: [Node.js](https://nodejs.org) ≥ 22 (siehe `.node-version`) und npm.

```bash
npm install
cp .env.example .env
```

Die Platzhalter können bleiben, solange noch kein Sanity-Projekt existiert. Die Seite zeigt dann automatisch die Startinhalte aus `src/lib/content.ts`.

```bash
npm run dev
```

Die Seite ist danach unter `http://localhost:4321` erreichbar.

Weitere Befehle:

```bash
npm run build    # Typprüfung (astro check) + Produktions-Build nach dist/
npm run preview  # Produktions-Build lokal ansehen
npm run check    # Nur die TypeScript-/Astro-Typprüfung
```

## 4. Sanity-Projekt anlegen

**Einfachster Weg (empfohlen), da `studio/` bereits ein fertiges Projekt mit eigenen Schemas ist:**

1. Kostenloses Konto auf [sanity.io/manage](https://www.sanity.io/manage) erstellen.
2. Dort **„Create project"** klicken, einen Projektnamen vergeben (z. B. „Marys Beauty"). Beim Dataset die Standardoption **„production" (öffentlich)** wählen.
3. Die angezeigte **Projekt-ID** (8-stelliger Code) kopieren.
4. Projekt-ID eintragen:
   - In `studio/.env` (aus `studio/.env.example` kopieren): `SANITY_STUDIO_PROJECT_ID=<deine-id>`
   - In der `.env` der Webseite im Hauptverzeichnis: `SANITY_PROJECT_ID=<deine-id>`

**Alternative für erfahrene Entwickler:innen:** Statt Schritt 1–3 kann im Ordner `studio/` auch `npx sanity init --env .env` ausgeführt werden (loggt per Browser ein, legt das Projekt an und schreibt die Projekt-ID automatisch in `studio/.env`). Da `studio/` bereits vollständige Schemas enthält, bei der Rückfrage nach vorhandenen Dateien **nicht** überschreiben lassen.

Dataset-Name: Standard `production` ist für dieses Projekt ausreichend (kein separates Staging-Dataset nötig, da Cloudflare Pages bereits Preview-Deployments für Pull Requests bietet, siehe Abschnitt 8).

Da das Sanity-Dataset standardmäßig **öffentlich lesbar** ist, braucht die Webseite für den Lesezugriff kein Token (`SANITY_API_READ_TOKEN` kann leer bleiben). Nur falls das Dataset bewusst auf „privat" gestellt wird, muss dort ein Lese-Token (Rolle „Viewer") hinterlegt werden – niemals ein Schreib-Token, und niemals ins Repository einchecken.

## 5. Sanity-Schemas bereitstellen

Die Schemas liegen bereits fertig in `studio/schemaTypes/` und werden automatisch geladen, sobald das Studio gestartet wird – ein separates „Deployen" der Schemas ist nicht nötig. Zum lokalen Bearbeiten:

```bash
cd studio
npm run dev
```

Das Studio ist dann unter `http://localhost:3333` erreichbar. Die Navigation ist bereits auf Deutsch kuratiert (siehe `studio/structure/index.ts`) und zeigt genau die im Projektauftrag geforderten Bereiche:

- **Startseite** (Hero, Kurzvorstellung, Vorteile, Galerie-Vorschau)
- **Behandlungen** (Kategorien + einzelne Behandlungen)
- **Über uns & Team**
- **Galerie** (Seite + einzelne Bilder)
- **Kontakt – Seite** (Texte; die eigentlichen Kontaktdaten kommen aus den Website-Einstellungen)
- **Allgemeine Website-Einstellungen** (Studioname, Logo, Adresse, Öffnungszeiten, Social Media, Planity-Link, Standard-SEO)
- **Rechtliches** (Impressum, Datenschutzerklärung)

„Singleton"-Seiten (z. B. Website-Einstellungen) lassen sich nicht duplizieren oder löschen – es gibt technisch immer nur genau ein Dokument.

**Startinhalte importieren:** Damit das Studio nicht leer beginnt, liegt unter `studio/seed/` ein fertiger Datensatz mit Kontaktdaten, Logo, Fotos, Behandlungen und Seitentexten. Einmalig nach dem Anlegen des Projekts ausführen:

```bash
cd studio
npx sanity dataset import seed/initial-content.ndjson production --missing
```

`--missing` überspringt Dokumente, die bereits existieren. Der Datensatz wird aus `src/lib/content.ts` erzeugt (`node scripts/generate-sanity-seed.ts`).

Die Webseite ergänzt fehlende Sanity-Felder automatisch aus `src/lib/content.ts` (siehe `getContent` in `src/lib/site.ts`).

## 6. Sanity Studio veröffentlichen

Damit die Inhaberin das Studio über einen eigenen Link erreicht (ohne dass Sie als Entwickler:in lokal etwas starten müssen), wird das Studio separat bei Sanity gehostet (aktuell offiziell unterstützter Weg, Stand dieses Projekts):

```bash
cd studio
npx sanity deploy
```

Der Assistent fragt nach einem Studio-Hostnamen (z. B. `marysbeauty` → erreichbar unter `https://marysbeauty.sanity.studio`). Dieser Link ist der Zugang für die Inhaberin zur Pflege aller Inhalte.

Nach inhaltlichen Schema-Änderungen (neue Felder etc.) einfach erneut `npx sanity deploy` ausführen.

## 7. GitHub-Repository einrichten

```bash
git init
git add .
git commit -m "Initial commit: Marys Beauty Website"
```

Dann auf [github.com](https://github.com) ein neues, leeres Repository anlegen (ohne README/License, da bereits vorhanden) und verbinden:

```bash
git remote add origin https://github.com/<dein-account>/<repo-name>.git
git branch -M main
git push -u origin main
```

**Wichtig:** Die `.gitignore` schließt `.env`-Dateien, `node_modules/` und Build-Ausgaben bereits aus. Vor dem ersten Push einmal `git status` prüfen, damit wirklich keine `.env`-Datei mit echten Zugangsdaten versehentlich mit eingecheckt wird.

Das Studio (`studio/`) kann entweder im selben Repository verbleiben (einfachster Weg, so wie hier aufgesetzt) oder bei Bedarf später in ein eigenes Repository ausgelagert werden.

## 8. Cloudflare Pages verbinden & deployen

1. Cloudflare-Konto erstellen bzw. einloggen → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Das GitHub-Repository auswählen und autorisieren.
3. Build-Einstellungen:
   - **Framework preset:** Astro (falls nicht automatisch erkannt: manuell)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (Hauptverzeichnis – **nicht** `studio/`, das ist ein separates Projekt)
4. Unter **Environment variables** die Variablen aus `.env.example` eintragen (mindestens `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`, `PUBLIC_PLANITY_URL`). `SANITY_API_READ_TOKEN` nur setzen, falls das Dataset privat ist.
5. **Production branch:** `main`.
6. **Deploy speichern** – Cloudflare baut die Seite jetzt bei jedem Push auf `main` automatisch neu.

Cloudflare Pages erstellt automatisch auch **Preview-Deployments** für Pull Requests (keine weitere Konfiguration nötig) – jeder PR bekommt eine eigene Vorschau-URL.

## 9. Eigene Domain verbinden

1. Im Cloudflare-Pages-Projekt → **Custom domains** → **Set up a custom domain**.
2. Domain eingeben (z. B. `www.marysbeauty.de`). Liegt die Domain bereits bei Cloudflare (empfohlen), wird der DNS-Eintrag automatisch gesetzt. Liegt sie bei einem anderen Anbieter, zeigt Cloudflare die nötigen CNAME-/A-Einträge an.
3. HTTPS wird von Cloudflare Pages automatisch per kostenlosem SSL-Zertifikat eingerichtet (Universal SSL) – keine manuelle Konfiguration nötig.
4. Die Domain für Sitemap, Canonical-URLs und Open-Graph-Tags steht fest in `astro.config.mjs` (`siteUrl`). Bei einem Domainwechsel dort anpassen und neu deployen.

## 10. Automatisches Deployment bei Sanity-Änderungen

Ziel: Veröffentlicht die Inhaberin in Sanity eine Änderung, baut sich die Webseite **ohne euer Zutun** automatisch neu.

```
Sanity (Inhalt veröffentlichen)
   → Sanity-Webhook
   → Cloudflare Pages Deploy Hook
   → Neuer Astro-Build (lädt aktuelle Sanity-Daten)
   → Aktualisierte Webseite online
```

**Schritt 1 – Cloudflare Deploy Hook erstellen:**

1. Cloudflare-Pages-Projekt → **Settings** → **Builds & deployments** → **Deploy hooks**.
2. Neuen Hook anlegen, z. B. Name „Sanity Content Update", Branch `main`.
3. Cloudflare zeigt eine **Deploy-Hook-URL** an. Diese URL ist **vertraulich** – sie funktioniert wie ein Passwort (jeder, der sie kennt, kann einen Deploy auslösen). Nicht ins Repository einchecken, nicht öffentlich teilen.

**Schritt 2 – Sanity-Webhook einrichten:**

1. Auf [sanity.io/manage](https://www.sanity.io/manage) → Projekt auswählen → **API** → **Webhooks** → **Create webhook**.
2. **Name:** z. B. „Cloudflare Deploy"
3. **URL:** die Deploy-Hook-URL aus Schritt 1 einfügen.
4. **Dataset:** `production`
5. **Trigger on:** Create, Update, Delete (alle drei aktivieren)
6. **Filter** (GROQ) – verhindert unnötige Build-Schleifen durch Zwischenspeicherungen von Entwürfen:
   ```groq
   !(_id in path("drafts.**"))
   ```
   Dieser Filter sorgt dafür, dass **nur** beim tatsächlichen Veröffentlichen (Klick auf „Publish", nicht beim automatischen Zwischenspeichern von Entwürfen) ein Build ausgelöst wird.
7. **HTTP method:** `POST`
8. **API version:** aktuelles Datum
9. Webhook speichern und aktivieren.

Ab jetzt löst jede Veröffentlichung in Sanity automatisch einen neuen Cloudflare-Build aus, der die aktuellen, veröffentlichten Inhalte lädt (die Astro-Seiten rufen bei jedem Build per `sanityFetch(...)` die aktuellen Daten aus Sanity ab, siehe `src/lib/sanity.ts`).

## 11. Planity-Integration aktivieren

Alle Buchungs-Buttons laufen über `src/lib/booking.ts`. Das Verhalten ergibt sich allein aus den Feldern in Sanity:

| Gepflegt in Sanity | Verhalten |
|---|---|
| nichts (aktueller Stand) | Buttons führen auf `/termin`, dort stehen Telefon und E-Mail |
| Planity-Buchungslink | Buttons öffnen direkt die Planity-Seite des Studios |
| White-Label-Einbettungscode | Buttons führen auf `/termin`, dort läuft die Buchung eingebettet |

**Variante A – Einfacher Buchungslink (empfohlen):**

In Sanity unter „Allgemeine Website-Einstellungen" → Feld „Planity-Buchungslink" die echte Planity-URL des Studios eintragen. Die reine Startseite `https://www.planity.com/` gilt als Platzhalter und wird ignoriert.

**Variante B – Offizielles White-Label-Modul (optional, muss von Planity freigeschaltet sein):**

1. Im Planity-Pro-Konto des Studios prüfen, ob das White-Label-Buchungsmodul verfügbar ist (ggf. bei Planity anfragen/freischalten lassen).
2. Den von Planity bereitgestellten, offiziellen Einbettungscode kopieren.
3. In Sanity unter „Allgemeine Website-Einstellungen" → Feld „Planity White-Label-Einbettungscode" **unverändert** einfügen.
4. Der Code wird dann auf der Buchungsseite ausgeführt (`src/pages/termin.astro`).

**Wichtiger Hinweis:** `public/_headers` enthält für `/termin` eine eigene Content-Security-Policy, die Inline-Skripte und `*.planity.com` erlaubt. Lädt der Einbettungscode Dateien von weiteren Domains, müssen diese in beiden `/termin`-Blöcken ergänzt werden, sonst blockiert der Browser sie. Nach dem Einfügen die Buchung einmal auf der Live-Seite testen, da die Header nur auf Cloudflare greifen.

Die Seite funktioniert in jedem Fall vollständig, auch ganz ohne White-Label-Modul (reine Variante A).

## 12. Sitemap & Google Search Console

Die Sitemap wird bei jedem Build automatisch erzeugt und ist unter `https://ihre-domain.de/sitemap.xml` erreichbar, aktuell `https://marysbeautyco.de/sitemap.xml` (erzeugt von `@astrojs/sitemap`, in `astro.config.mjs` zu einer einzigen Datei zusammengefasst). Die `robots.txt` (`src/pages/robots.txt.ts`) verweist automatisch darauf. Die Domain stammt aus `siteUrl` in `astro.config.mjs`.

1. [Google Search Console](https://search.google.com/search-console) öffnen → **Property hinzufügen** → Domain eingeben.
2. Domainverifizierung: Da die Domain über Cloudflare läuft, am einfachsten per **DNS-TXT-Eintrag** (Google zeigt den nötigen Eintrag an, Cloudflare → DNS → Eintrag hinzufügen) oder alternativ per HTML-Meta-Tag (in `src/layouts/BaseLayout.astro` im `<head>` ergänzen).
3. Nach erfolgreicher Verifizierung: **Sitemaps** → neue Sitemap einreichen: `sitemap.xml`.
4. Google crawlt die Seite danach eigenständig; die Lokale SEO (Name, Adresse, Telefon als `schema.org/BeautySalon`-Daten) wird automatisch aus den Website-Einstellungen generiert (`src/components/Seo.astro`).

## 13. Zugänge sicher übergeben

Nach Fertigstellung folgende Zugänge an die Inhaberin übergeben (idealerweise über einen Passwort-Manager mit Freigabefunktion, nicht per unverschlüsselter E-Mail):

- Link zum Sanity Studio (`https://<studioname>.sanity.studio`) + Sanity-Login (die Inhaberin sollte sich am besten selbst ein eigenes Sanity-Konto anlegen und als „Administrator" oder „Editor" zum Projekt eingeladen werden, statt sich gemeinsame Zugangsdaten zu teilen).
- Zugang zum Planity-Konto des Studios (falls nicht bereits vorhanden).
- Domain-Registrar-Zugang (falls die Domain nicht ohnehin schon der Inhaberin gehört).
- Optional: Lesezugriff auf das GitHub-Repository und das Cloudflare-Projekt, falls die Inhaberin künftig einen anderen technischen Dienstleister einbinden möchte.

Die Inhaberin benötigt **keinen** Zugriff auf Quellcode, GitHub oder Cloudflare für den täglichen Betrieb – dafür reicht der Sanity-Studio-Link.

## 14. Laufende Kosten & Wartung

| Dienst | Kostenmodell (Stand Projekterstellung) |
|---|---|
| Cloudflare Pages | Kostenloser Plan reicht für diese Seite i. d. R. vollständig aus |
| Sanity | Kostenloser Plan reicht für diese Inhaltsmenge i. d. R. aus (Limits für Nutzer:innen/Datenvolumen beachten) |
| Planity | Laufende Kosten gemäß Planity-Vertrag des Studios (unabhängig von dieser Webseite) |
| Domain | Jährliche Registrierungsgebühr beim Domain-Registrar |

**Verbleibende Wartungsaufgaben**, auch bei einer statischen Seite:

- Gelegentliches Aktualisieren der npm-Abhängigkeiten (`npm outdated`, dann gezielt `npm update` bzw. Major-Updates einzeln prüfen) – ca. 1–2× jährlich ausreichend, kein laufender Aufwand.
- Beobachten, ob Sanity oder Planity größere Breaking Changes ankündigen (selten, aber möglich bei Headless-Diensten).
- `npm audit` gelegentlich prüfen. Hinweis: `studio/` (das CMS-Admin-Tool, nicht die öffentliche Webseite) zeigt aktuell einige `npm audit`-Warnungen in Zusatzfunktionen der `@sanity/cli`-Werkzeugkette (YAML/TOML-Parsing für selten genutzte Zusatzbefehle wie „Blueprints"). Diese betreffen ausschließlich das lokal/manuell ausgeführte CLI-Tool zur Inhaltsverwaltung, nicht den Code der ausgelieferten Webseite – dennoch regelmäßig per `npm audit` im Blick behalten und bei neuen, saubereren `@sanity/cli`-Versionen aktualisieren.
- SSL-Zertifikat, Deploy-Hooks etc. laufen bei Cloudflare/Sanity automatisch – kein manuelles Eingreifen nötig.

## 15. Qualitätssicherung

Vor jedem Release lokal ausführen:

```bash
npm run build   # beinhaltet TypeScript-/Astro-Typprüfung (astro check) + Produktions-Build
```

Dieser Befehl deckt ab: fehlende Imports, fehlerhafte Astro-Komponenten, TypeScript-Fehler, sowie (durch den erfolgreichen Build) dass alle GROQ-Abfragen syntaktisch gültig sind. Da alle Sanity-Abfragen über `sanityFetch()` (`src/lib/sanity.ts`) laufen und bei fehlendem/leerem Ergebnis automatisch auf die Platzhalterinhalte in `src/lib/content.ts` zurückfallen, bricht der Build **nicht** ab, selbst wenn einzelne Sanity-Inhalte noch nicht gepflegt sind.

Manuell vor dem Live-Schalten zusätzlich prüfen:

- Alle Seiten im Browser durchklicken (Start, Behandlungen, Über uns, Galerie, Kontakt, Impressum, Datenschutz, 404-Seite).
- Darstellung auf einem schmalen (Smartphone-)Viewport testen.
- Lighthouse-Audit (Chrome DevTools) für Performance/SEO/Accessibility laufen lassen.
- Sanity Studio (`npm run dev` in `studio/`) einmal mit echten Inhalten befüllen und prüfen, ob alles korrekt auf der Webseite erscheint.

Für das `studio/`-Projekt gilt entsprechend `npx tsc --noEmit` bzw. `npx sanity build` als Minimal-Check.

## 16. Übergabe-Checkliste

- [ ] Echtes Sanity-Projekt angelegt, Projekt-ID in Cloudflare-Umgebungsvariablen hinterlegt
- [ ] Sanity Studio deployed (`npx sanity deploy`), Link funktioniert
- [ ] Alle Platzhalterinhalte (`src/lib/content.ts` diente nur als Fallback) durch echte Inhalte in Sanity ersetzt: Öffnungszeiten, Team, Galerie, Behandlungstexte
- [ ] Echter Planity-Buchungslink hinterlegt
- [ ] Logo prüfen (`public/brand/`, wird beim Seed-Import auch in Sanity angelegt)
- [ ] Impressum und Datenschutzerklärung durch rechtlich geprüfte Fassungen ersetzt (aktuell bewusst nur Platzhalter-Musterstrukturen!)
- [ ] GitHub-Repository erstellt und Code gepusht
- [ ] Cloudflare Pages verbunden, Build erfolgreich, `siteUrl` in `astro.config.mjs` korrekt
- [ ] Eigene Domain verbunden, HTTPS aktiv
- [ ] Sanity-Webhook → Cloudflare-Deploy-Hook eingerichtet und getestet (eine Teständerung in Sanity veröffentlichen und prüfen, ob die Webseite sich automatisch aktualisiert)
- [ ] Sitemap bei Google Search Console eingereicht
- [ ] Zugänge an die Inhaberin übergeben (siehe Abschnitt 13)
- [ ] Inhaberin hat [ANLEITUNG-INHABERIN.md](./ANLEITUNG-INHABERIN.md) erhalten bzw. deren Inhalt mündlich/per Kurzschulung durchgegangen
