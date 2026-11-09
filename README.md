# Aryan Gupta - Portfolio

React + Vite + Tailwind + GSAP ScrollTrigger + Lenis + Lucide.

## Run locally
```bash
npm install
cp .env.example .env     # Windows: copy .env.example .env
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).
Build for production: `npm run build` (output in `dist/`), preview with `npm run preview`.

## Where things live
All content is in `src/data/site.js`: name, links, skills, projects, certifications, goodies, learning path, nav.
Static files are in `public/`:
- `public/images/Profile.jpeg` - your photo
- `public/projects/` - project screenshots and `resume.pdf`
- `public/certificates/` - certificate PDFs, `public/certificates/previews/` - preview images
- `public/goodies/` - Google Cloud Arcade goodies photos

## Add a new certificate
1. Put the PDF in `public/certificates/` (no spaces in the name), e.g. `google-cloud-basics.pdf`.
2. Make a preview image of its first page and save it in `public/certificates/previews/` as `google-cloud-basics.jpg` (about 1100px wide).
   Easy ways: open the PDF and screenshot it, or run `pdftoppm -jpeg -scale-to-x 1100 -scale-to-y -1 -singlefile file.pdf google-cloud-basics`.
3. Add an entry at the TOP of `certifications` in `src/data/site.js` (newest first):
```js
{
  title: 'Certificate name',
  issuer: 'Issuing organization',
  platform: 'Coursera',          // optional
  date: 'Nov 8, 2026',           // optional
  file: 'google-cloud-basics.pdf',
  preview: 'google-cloud-basics.jpg'
},
```
View opens the PDF in a new tab; Download saves the original PDF.

## Add goodies photos (Achievements)
1. Put the photo in `public/goodies/` (jpg/png/webp), e.g. `arcade-goodies-1.jpg`.
2. Add an entry to `goodies` in `src/data/site.js`:
```js
goodies: [
  { title: 'Arcade Goodies', text: 'Short one-line description.', image: 'arcade-goodies-1.jpg' },
],
```
While the list is empty, the section shows a "coming soon" card.

## Projects
Edit `projects` in `src/data/site.js`. An empty `github` / `demo` value shows a disabled button; paste the URL to enable it.
To add screenshots to a project, put images in `public/projects/` and list them in its `images` array (Tic-Tac-Toe currently shows a placeholder board).

## Learning Path
Edit `learningPath` and `currentLearning` in `src/data/site.js`. Add `years: '...'` to a stage only if you want to show years.

## Contact form
1. Create a free form at https://formspree.io and copy the form ID (the part after `/f/`).
2. Local: put it in `.env` as `VITE_FORMSPREE_ID=yourid`.
3. Vercel: Project Settings > Environment Variables > add `VITE_FORMSPREE_ID`, then redeploy.

## Deploy on Vercel
Import the GitHub repo, framework preset Vite, build `npm run build`, output `dist`. Add `VITE_FORMSPREE_ID` under Environment Variables.
