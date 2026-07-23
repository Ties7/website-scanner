# De Bon, Horeca Website Scanner

Vul een restaurant-website in, krijg een geautomatiseerd oordeel over SEO, performance en online zichtbaarheid — inclusief een AI-review op basis van onze eigen review-prompt.

## Status

In ontwikkeling. Zie het project board voor voortgang per issue: 
https://github.com/users/Ties7/projects/24

## Starten

npm install
npm run dev

Open http://localhost:4321 het formulier werkt ook met JavaScript 
uitgeschakeld.

## Architectuurkeuzes

### Waarom output: 'server' (astro.config.mjs)

Twee redenen:
1. Het formulier moet zonder JavaScript werken (progressive enhancement). Dat vereist dat de server per binnenkomend verzoek kan reageren op wat iemand instuurt, in plaats van vooraf gebouwde statische HTML te serveren.
2. Zodra scans worden opgeslagen in een database, moet elke bezoeker actuele data zien bij een statische build zou die data vastliggen op het moment van bouwen.

### Waarom scanner.js los van de route

Alle scan-logica staat in src/lib/scanner.js, niet in index.astro zelf. Dit houdt de route overzichtelijk, en maakt de logica later herbruikbaar (bijvoorbeeld in een los API-endpoint) zonder duplicatie.

### Progressive enhancement

Het formulier heeft geen action-attribuut, waardoor de browser de POST standaard naar dezelfde URL stuurt. Daardoor kan index.astro zowel het tonen van het formulier als het verwerken van de inzending afhandelen zonder JavaScript nodig, en zonder apart eindpunt.

## Scope voor dit assessment

Bewust wel in scope:
- PageSpeed API (SEO/performance-scores)
- Claude API (AI-review op basis van eigen prompt)
- Database: scan opslaan + geschiedenis tonen
- Verwijderen van scans (delete)
- Deploy naar Vercel

Bewust buiten scope, i.v.m. beschikbare tijd:
- JavaScript-enhancement (fetch i.p.v. page reload) — de non-JS versie is al voldoende bewijs voor progressive enhancement
