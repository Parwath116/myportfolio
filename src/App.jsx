import { useCallback, useEffect, useState } from 'react'
import CinematicIntro from './components/CinematicIntro'
import ChapterNavigation from './components/ChapterNavigation'
import ChapterTransition from './components/ChapterTransition'
import ProjectDetailModal from './components/ProjectDetailModal'
import OriginChapter from './chapters/OriginChapter'
import BuilderChapter from './chapters/BuilderChapter'
import InternshipChapter from './chapters/InternshipChapter'
import FutureChapter from './chapters/FutureChapter'
import useReducedMotion from './hooks/useReducedMotion'
import { CHAPTERS } from './data/story'
import { PROJECTS } from './data/projects'

// URL hash like #chapter-3 jumps straight into the story (handy for sharing with reviewers).
function chapterFromHash() {
  const m = /chapter-(\d)/.exec(window.location.hash)
  const n = m ? Number(m[1]) - 1 : -1
  return n >= 0 && n < CHAPTERS.length ? n : -1
}

function projectFromSearch() {
  try {
    const p = new URLSearchParams(window.location.search).get('project')
    return p ? PROJECTS.find((x) => x.id === p) || null : null
  } catch {
    return null
  }
}

const ENDING_AFTER_MS = 7000

export default function App() {
  const reduced = useReducedMotion()
  const initial = chapterFromHash()

  // ── Single source of truth ────────────────────────────────────────────────
  // chapter    which chapter is showing
  // intro      'playing' | 'leaving' (fading out over Chapter 1) | 'gone'
  // transition { dir } while a paint-swipe is running, else null
  // ending     true once the visitor has lingered → character looks back, Next pulses
  // project    the project open in the detail panel
  const [chapter, setChapter] = useState(Math.max(initial, 0))
  const [intro, setIntro] = useState(initial >= 0 ? 'gone' : 'playing')
  const [transition, setTransition] = useState(null)
  const [pendingTo, setPendingTo] = useState(null)
  const [ending, setEnding] = useState(false)
  const [project, setProject] = useState(projectFromSearch)

  const storyVisible = intro !== 'playing'
  const busy = transition !== null

  const go = useCallback(
    (to) => {
      if (busy || project || to === chapter || to < 0 || to >= CHAPTERS.length) return
      if (reduced) {
        setChapter(to)
        return
      }
      setPendingTo(to)
      setTransition({ dir: to > chapter ? 1 : -1 })
    },
    [busy, project, chapter, reduced],
  )

  const onSwap = useCallback(() => {
    setChapter((c) => (pendingTo === null ? c : pendingTo))
  }, [pendingTo])

  const onDone = useCallback(() => {
    setTransition(null)
    setPendingTo(null)
  }, [])

  const beginStory = useCallback(() => {
    setIntro('leaving')
    setTimeout(() => setIntro('gone'), 900)
  }, [])

  const skipIntro = useCallback(() => setIntro('gone'), [])

  // Keyboard: ← / → move between chapters once the story has started.
  useEffect(() => {
    if (intro !== 'gone') return undefined
    const onKey = (e) => {
      if (e.target.closest?.('[role="tablist"], input, textarea')) return
      if (e.key === 'ArrowRight') go(chapter + 1)
      if (e.key === 'ArrowLeft') go(chapter - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [intro, chapter, go])

  // Keep the URL hash in sync (without adding history entries).
  useEffect(() => {
    if (intro === 'gone') {
      const search = window.location.search || ''
      window.history.replaceState(null, '', `${search}#chapter-${chapter + 1}`)
    }
  }, [chapter, intro])

  // After a while in a chapter, the character looks back and "Next" nudges the visitor on.
  useEffect(() => {
    setEnding(false)
    if (!storyVisible) return undefined
    const t = setTimeout(() => setEnding(true), ENDING_AFTER_MS)
    return () => clearTimeout(t)
  }, [chapter, storyVisible])

  const current = CHAPTERS[chapter]
  const common = { chapter: current, ending }

  return (
    <div className="app">
      {storyVisible && (
        <main className="stage" aria-hidden={intro === 'leaving' ? true : undefined}>
          <div className="sr-only" aria-live="polite">
            {`Chapter ${current.n} of ${CHAPTERS.length}: ${current.title}`}
          </div>

          {chapter === 0 && <OriginChapter key="c0" {...common} />}
          {chapter === 1 && <BuilderChapter key="c1" {...common} onOpenProject={setProject} />}
          {chapter === 2 && <InternshipChapter key="c2" {...common} />}
          {chapter === 3 && <FutureChapter key="c3" {...common} />}

          <ChapterNavigation current={chapter} onGo={go} disabled={busy} ending={ending} />
        </main>
      )}

      {transition && <ChapterTransition dir={transition.dir} onSwap={onSwap} onDone={onDone} />}

      {project && <ProjectDetailModal project={project} onClose={() => setProject(null)} />}

      {intro !== 'gone' && <CinematicIntro onBegin={beginStory} onSkip={skipIntro} leaving={intro === 'leaving'} />}
    </div>
  )
}
