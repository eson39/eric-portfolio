# Eric's Portfolio

A glassmorphism personal portfolio built with plain HTML, CSS, and JavaScript.

## Sections

- **About** — intro plus LinkedIn, GitHub, and Resume buttons
- **Skills** — categorized skill pills
- **Projects** — project cards with tags and links
- **Education** — schools and key courses

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

Then visit the URL shown in the terminal (usually http://localhost:3000).

## Customize

Edit [`data.js`](data.js) for your name, bio, about page copy, skills, projects, and links.

- Home shows a short About preview + only the first few featured projects (`homeProjectCount`)
- [`about.html`](about.html) has the full About story
- [`projects.html`](projects.html) lists every project

Add screenshots under `assets/projects/` and point each project’s `image` field in [`data.js`](data.js) to the file (PNG/JPG/SVG/WebP all work). Click a preview to open a larger lightbox view.
