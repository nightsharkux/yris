# Yris · Weiden Housing Basics

A short, practical housing course for international students: renting, registering and living well in Germany, adapted for Weiden in der Oberpfalz. It ends with an exam and a verifiable certificate.

<table>
<tr>
<td><a href="https://yris-nine.vercel.app"><img src="docs/qr-live.png" alt="QR code linking to the live Yris site" width="160"></a></td>
<td>

**Live site:** <https://yris-nine.vercel.app>
Scan the code with a phone to open it.

</td>
</tr>
</table>

## What it covers

| Module | Topics |
|---|---|
| Introduction to German housing | Types of accommodation, rental terminology, finding housing safely |
| Rental agreements and legal responsibilities | Signing a contract, tenant rights, tenant, landlord responsibilities, reporting problems |
| Anmeldung and official responsibilities | Registration requirements, Wohnungsgeberbestätigung, changing address, important documents |
| Apartment maintenance and care | Preventing mold, bathroom and kitchen maintenance |

## Features

- Lessons, a practice exam and a final exam with a pass mark.
- A verifiable certificate, with a QR code.
- English and German interface.
- Light and dark theme and a responsive layout.
- A staff area to edit lessons and manage documents.

## How it works

Plain HTML, CSS and ES modules. There is no build step and no backend: progress, results and settings are stored in the browser (`localStorage`). The staff passcode is chosen on first use and kept only as a salted PBKDF2 hash. `vercel.json` sets a strict Content Security Policy and other security headers.

```
index.html      page shell
css/styles.css  design (glass cards, teal accent, light/dark)
js/app.js       routing and screens
js/course.js    lesson content
js/exam.js      exam blueprint and scoring
js/i18n.js      English / German text
```

## Run it locally

Any static server works:

```bash
npx serve .
# or
python -m http.server 8080
```

Then open the address it prints.

## Deploy

Deployed on [Vercel](https://vercel.com) as a static site; `vercel.json` is all the configuration it needs.

## Note

Yris is an independent student project and not an official service of any city, housing provider or university. It gives general guidance, not legal advice; check contracts and registration rules with the relevant authority.

Related: [Citrus](https://github.com/nightsharkux/Citrus), [Folio](https://github.com/nightsharkux/folio), [NFC Participation](https://github.com/nightsharkux/nfc-participation).
