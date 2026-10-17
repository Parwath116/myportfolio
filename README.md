# Parwath Sri Raju K. — My Story

A static React + Vite site: cinematic intro, four chapters, a walking comic-graffiti character, project wall with detail panels.

## Run
```
npm install
npm run dev        # local dev server
npm run build      # production build in dist/
npm run preview    # serve dist/ locally
```

## Deploy
- **Netlify:** drag the `dist/` folder onto app.netlify.com/drop (or connect the repo: build `npm run build`, publish `dist`).
- **GitHub Pages:** push the repo, build, and publish `dist/` (e.g. `gh-pages` branch or a Pages workflow). `base: './'` is already set in `vite.config.js`, so project sub-paths work.
- Share a chapter directly with `#chapter-2` etc. at the end of the URL (skips the intro).

## Replace placeholders with real content
| What | Where |
|---|---|
| Photos (school, NCC, dance, Rotaract, hackathons, internship…) | Put files in `public/photos/`, then set the matching key in `src/data/photos.js` to `'./photos/yourfile.jpg'` |
| Project screenshots, diagrams, repo/live/report links, "my contribution" text | `src/data/projects.js` (leave `null`/`''` until real — the UI shows a labelled placeholder) |
| Story facts and DRAFT copy (lines marked `// DRAFT`) | `src/data/story.js` |
| Character poses | `src/assets/characters/` (+ map in `index.js`) |
| Colours / fonts | CSS variables at the top of `src/index.css` |

## Structure
`components/` CinematicIntro, GraffitiCharacter (walk-cycle), ChapterNavigation, ChapterTransition (paint swipe), StoryChapter, ProjectCard, ProjectDetailModal, PhotoPlaceholder, Narrator, Doodles · `chapters/` the four chapters · `data/` all content · `App.jsx` holds the single source of truth (chapter, intro, transition, ending, open project).

## Accessibility
Skip intro (button + Esc), ←/→ keys change chapter, keyboard-operable tabs/modal (Esc closes, focus trapped), `prefers-reduced-motion` disables walking/swipes/particles, images lazy-loaded.
