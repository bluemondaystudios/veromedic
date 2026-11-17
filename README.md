# veromedic
The official website for Veromed Private Clinic (Veromed Primary Health Care), Groblersdal, Limpopo: https://veromedclinic.co.za

A static, single-page site with no build step:

- `index.html`: page content (services, about, hours and location, contact)
- `styles.css`: styles. The brand colours come from the logo and are set at the top of the file.
- `script.js`: live "Open now / Closed" status (South African time), highlights today in the hours table, mobile menu
- `assets/logo-mark.svg`: logo mark (green ring, red cross)

To preview it, open `index.html` in a browser. To deploy, upload the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel).

Opening hours are set in two places: the HTML (`index.html`) and the `HOURS` table in `script.js`. Update both when they change.

Hosted on GitHub Pages from `main` (root), with the custom domain set in `CNAME`. `assets/og-image.png` is the preview image shown when the link is shared on WhatsApp or Facebook. After changing `styles.css` or `script.js`, increase the `?v=` number on their links in `index.html` so browsers fetch the new files.
