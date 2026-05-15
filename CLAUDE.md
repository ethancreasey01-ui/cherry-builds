# Cherry Builds Site — Claude Context

## Project
Cherry Builds — home renovation specialists, Melbourne (Bayside, Mornington Peninsula).  
Services: kitchens, bathrooms, decking, waterproofing. VBA Licensed. 30+ years experience.

**Stack**: React SPA · Vite · Tailwind CSS · Framer Motion · Vercel  
**Live domain**: https://cherrybuilds.com.au  
**Vercel team**: ethans-projects-9ae33fde · Project ID: prj_Z2K03iTPeoA8xOKTP4fQ8nAevAwJ  
**Repo**: https://github.com/ethancreasey01-ui/cherry-builds  
**GitHub remote**: connected — push to `master` to deploy (once Vercel GitHub integration is linked)

## Structure
Different from dsea-site — uses a pages folder:
- `index.html` — meta tags, canonical URL, Google tag (when added)
- `src/App.jsx` — router/layout shell
- `src/pages/Home.jsx` — main page content, contact form (~line 733), phone number (~line 99)

## Phone Number
**Display**: 0438 499 146  
**Tel href**: `tel:0438499146`  
⚠️ Confirm this is the real client number before going live — may still be a placeholder.

## Contact Form
**Formspree endpoint**: `https://formspree.io/f/placeholder` ← NOT SET UP  
Action: replace `placeholder` with real Formspree form ID before launch.

## Google Ads
⚠️ NOT SET UP YET  
When configured, follow this pattern (learned from dsea-site):
- Base Google tag goes in `index.html` head
- Phone swap snippet goes in `App` useEffect (NOT index.html — React SPA, DOM is empty when head scripts run)
- Form conversion event fires inside `handleSubmit` AFTER Formspree fetch resolves

## Performance Standards
- Videos: compress with ffmpeg before committing. Target <1MB each.  
  `ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -preset fast -vf "scale='min(720,iw)':-2" -an -movflags +faststart out.mp4`
- Gallery videos: use `loadedIndices` Set pattern — only load `src` on active ±2
- Images below fold: `loading="lazy"`
- Canonical URL: always `https://cherrybuilds.com.au/` — never a Vercel preview URL

## Launch Checklist
- [ ] Confirm real client phone number
- [ ] Replace Formspree placeholder with real form ID
- [ ] Set up Google Ads account + get tag ID
- [ ] Add Google base tag to `index.html` head
- [ ] Add phone swap snippet to `App` useEffect
- [ ] Add form conversion event to `handleSubmit`
- [ ] Compress all videos <1MB
- [ ] Canonical URL points to production domain
- [ ] Connect GitHub remote for auto-deploy
- [ ] Test Tag Assistant with ad blocker OFF
