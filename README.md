# KGV — King Global Ventures Website

Parent-brand website for KGV, showcasing its ventures (APEX-10, Sanihancer,
Organic Super Mulch), leadership, accreditations, and news.

## Stack

Plain **HTML / CSS / vanilla JS** — no build step, no Node required.
- **GSAP + ScrollTrigger** (via CDN) power the Home page's pinned hero /
  scroll-mask reveal, modeled on the [Vita Travel](https://vita-travel.webflow.io/)
  reference the client provided.
- **Inter** (Google Fonts) for typography.
- A small hand-rolled chatbot widget (`js/chatbot.js`) that routes visitors
  to the right product/contact info. It is **not** an AI — no API calls, no
  ongoing cost.

This was chosen over a Next.js/Vite pipeline because Node.js isn't installed
on the dev machine yet, and the site is deploying to GitHub Pages (a static
host) anyway — so a build step buys nothing here.

## Structure

```
index.html      Home (hero + mission + ventures + stats + leadership teaser)
about.html      Full mission, leadership profile, accreditations, testing, news
services.html   "Our Ventures" — APEX-10 / Sanihancer / Organic Super Mulch detail
contact.html    Contact details + form (not yet wired to a backend — see below)

css/
  variables.css   Gold & black design tokens
  base.css        Reset + typography
  components.css  Nav, buttons, cards, footer, chatbot widget
  animations.css  Hero pin/mask + scroll-reveal utilities

js/
  main.js         Nav toggle, scroll effects, active link, stat counters, reveal-on-scroll
  hero-scroll.js  GSAP ScrollTrigger pinned hero (Home only)
  chatbot.js      Static contact-routing chatbot (edit CONTACT constants at top)

images/
  logo/ products/ accreditations/ press/ team/ hero/   ← drop supplied assets here
```

## Running locally

No build step — just open `index.html` in a browser, or serve the folder
with any static server, e.g.:

```bash
npx serve .
```

(or Python's `python -m http.server`, or VS Code's "Live Server" extension.)

## Still pending / TODO

- [ ] Real logo/wordmark (currently a placeholder gold circle "KGV")
- [ ] Hero background photo (`images/hero/`)
- [ ] Product photos for APEX-10, Sanihancer, Organic Super Mulch (`images/products/`)
- [ ] CEO headshot (`images/team/`)
- [ ] Accreditation badge images (`images/accreditations/`)
- [ ] Test result certificates/summaries
- [ ] News/press article content + logos
- [ ] Real phone/email/address — replace placeholders in `js/chatbot.js`
      and in each page's footer/contact section
- [ ] Decide "Our Ventures" vs "Services" naming (currently `services.html` /
      "Our Ventures" in nav — easy to rename)
- [ ] Wire the contact form to an actual mail service (Formspree, Getform,
      EmailJS, or a serverless function) — intentionally left unconnected
      until we decide together, since it means sending visitor data to a
      third party
- [ ] Deploy to GitHub Pages once content is in place

## Deploying to GitHub Pages (when ready)

1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Site goes live at `https://<username>.github.io/<repo>/`.

No build step needed — GitHub Pages serves these files directly.
