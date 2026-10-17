import { useEffect, useRef } from 'react'
import { Splat, Star, Squiggle } from './Doodles'

const SPLATS = {
  orange: ['#FF6B35', '#FFD447', '#FF4FA3'],
  cyan: ['#19D3E6', '#FF4FA3', '#FFD447'],
  pink: ['#FF4FA3', '#19D3E6', '#FFD447'],
  yellow: ['#FFD447', '#FF6B35', '#19D3E6'],
}

/**
 * Shared full-screen "mural" shell for every chapter: wall texture, colour splashes,
 * eyebrow + title + subtitle, and a content slot. Each chapter is its own scene.
 */
export default function StoryChapter({ chapter, children, className = '' }) {
  const headingRef = useRef(null)
  const [a, b, c] = SPLATS[chapter.accent] || SPLATS.orange

  useEffect(() => {
    if (window.location.search.includes('bottom')) {
      const scrollDown = () => {
        const el = document.querySelector('.chapter')
        if (el) el.scrollTop = el.scrollHeight
      }
      scrollDown()
      setTimeout(scrollDown, 200)
      setTimeout(scrollDown, 800)
    } else {
      headingRef.current?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <section
      className={`chapter chapter--${chapter.accent} ${className}`}
      aria-labelledby={`chapter-${chapter.id}-title`}
    >
      <div className="chapter__bg" aria-hidden="true">
        <Splat color={a} size={520} className="bg-splat bg-splat--1" opacity={0.9} />
        <Splat color={b} size={380} className="bg-splat bg-splat--2" opacity={0.85} />
        <Splat color={c} size={300} className="bg-splat bg-splat--3" opacity={0.8} />
        <Star color={c} size={54} className="bg-doodle bg-doodle--1" />
        <Star color={a} size={36} className="bg-doodle bg-doodle--2" />
        <Squiggle color={b} width={170} className="bg-doodle bg-doodle--3" />
        <div className="chapter__halftone" />
      </div>

      <div className="chapter__inner">
        <header className="chapter__head">
          <p className="eyebrow">CHAPTER {String(chapter.n).padStart(2, '0')}</p>
          <h1
            id={`chapter-${chapter.id}-title`}
            className="chapter__title"
            tabIndex={-1}
            ref={headingRef}
          >
            {chapter.title}
          </h1>
          <p className="chapter__subtitle">{chapter.subtitle}</p>
        </header>
        {children}
      </div>
    </section>
  )
}
