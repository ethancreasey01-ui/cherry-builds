# Cherry Builds Site — Claude Context

## Project
Cherry Builds — home renovation specialists, Melbourne (Bayside, Mornington Peninsula).  
Services: kitchens, bathrooms, decking, waterproofing. VBA Licensed. 30+ years experience.

**Stack**: React SPA · Vite · Tailwind CSS · Framer Motion · Vercel  
**Live domain**: https://www.cherrybuilds.com.au (apex redirects to www)  
**Vercel team**: ethans-projects-9ae33fde · Project ID: prj_Z2K03iTPeoA8xOKTP4fQ8nAevAwJ  
**Repo**: https://github.com/ethancreasey01-ui/cherry-builds  
**GitHub remote**: connected — push to `master` to deploy (once Vercel GitHub integration is linked)

## Structure
Different from dsea-site — uses a pages folder:
- `index.html` — meta tags, canonical URL, Google tag (when added)
- `src/App.jsx` — router/layout shell
- `src/pages/Home.jsx` — main page content, contact form (~line 733), phone number (~line 99)

## Phone Number
**Display**: 0408 827 996 (see `src/tracking.js`)  
**Tel href**: `tel:0408827996`

## Contact Form
**Formspree endpoint**: `https://formspree.io/f/meewklkk` ✅ Live and tested.
Endpoint, hidden fields and the send + conversion event live in `src/enquiry.js`, shared by the full form (Home `Contact`)
and `src/components/QuickEnquiry.jsx` (call button + name/phone/need form at the top of each service page on phones,
`lg:hidden`; sends the same field names, with `last_name`/`email`/`suburb` empty). Inputs are forced to 16px under 768px in
`index.css` so iPhone Safari doesn't zoom. Going live needs nothing new: no new endpoint, keys or env vars.

## Google Ads
**Google Tag ID**: AW-17973575816  
✅ Base tag in `index.html` head  
✅ Phone click conversion (`AW-17973575816/BcHrCJ2gsLQcEIiBvPpC`) fires in `App.jsx` PhoneClickTracker on any `tel:` link click  
✅ Form submission conversion (`AW-17973575816/eCcUCJqgsLQcEIiBvPpC`) fires in `handleSubmit` after Formspree fetch resolves

## Performance Standards
- Videos: compress with ffmpeg before committing. Target <1MB each.  
  `ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -preset fast -vf "scale='min(720,iw)':-2" -an -movflags +faststart out.mp4`
- Gallery videos: use `loadedIndices` Set pattern — only load `src` on active ±2
- Images below fold: `loading="lazy"`
- Canonical URL: always `https://www.cherrybuilds.com.au/` — never a Vercel preview URL

## Launch Checklist
- [x] Confirm real client phone number — ✅ 0438 499 146 confirmed
- [x] Replace Formspree placeholder with real form ID — ✅ meewklkk
- [x] Set up Google Ads account + get tag ID — ✅ AW-17973575816
- [x] Add Google base tag to `index.html` head — ✅
- [x] Add phone swap snippet to `App` useEffect — ✅ PhoneClickTracker in App.jsx
- [x] Add form conversion event to `handleSubmit` — ✅
- [ ] Compress all videos <1MB
- [ ] Canonical URL points to production domain
- [ ] Connect GitHub remote for auto-deploy
- [ ] Test Tag Assistant with ad blocker OFF

## SEO prerender (build step)
`npm run build` = `vite build` then `scripts/prerender.mjs`, which renders every public route with React (`src/entry-server.jsx`)
into `dist/<route>/index.html` (real text, `<title>`, meta description, canonical, Open Graph, JSON-LD), writes
`dist/sitemap.xml` from the route list, and writes `dist/app-shell.html` (empty shell, noindex, no canonical) which
`vercel.json` serves for any URL that is not a real page. The browser hydrates the prerendered HTML (`src/main.jsx`).
- New page/route: add it to `<Routes>` in `App.jsx` AND to `ROUTES` in `src/entry-server.jsx` (data-driven ones follow the data automatically).
- Check: `npm run build && npm run check:seo` (title/description/canonical/OG/h1/JSON-LD per page); `npm run serve:dist` serves dist like Vercel (default :4173).
- JSON-LD uses only facts visible on the site: do not add ratings, opening hours, geo or price range unless they are shown on the page.
- Going live needs: owner OK, a Vercel preview check that `/services/x` serves `services/x/index.html`, then push.
