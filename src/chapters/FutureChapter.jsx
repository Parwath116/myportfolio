import { useEffect, useRef, useState } from 'react'
import StoryChapter from '../components/StoryChapter'
import GraffitiCharacter from '../components/GraffitiCharacter'
import Narrator from '../components/Narrator'
import { Skyline } from '../components/Doodles'
import { POSTERS } from '../assets/characters'
import useCharHeight from '../hooks/useCharHeight'
import { FUTURE } from '../data/story'

// Strokes that the character "sprays" onto the unfinished wall, one per click.
const MARKS = [
  {
    d: 'M30 150C70 60 120 60 160 130S250 190 290 90',
    c: '#FF6B35',
    w: 16,
    fact: 'Earpods are non-negotiable',
  },
  {
    d: 'M40 60h110M40 82h70',
    c: '#19D3E6',
    w: 12,
    fact: 'I binge movies and like film background scores',
  },
  {
    d: 'M210 40l16 38 40 3-31 25 10 39-35-22-35 22 10-39-31-25 40-3z',
    c: '#FFD447',
    w: 9,
    fact: 'Loud, energetic music: The Weeknd, Anirudh',
  },
  {
    d: 'M60 190C110 160 170 214 250 170',
    c: '#FF4FA3',
    w: 14,
    fact: 'Exam went well? Same routine next time: right sock and right shoe first',
  },
]

export default function FutureChapter({ chapter, ending }) {
  const h = useCharHeight(0.44, 260, 420)
  const initialMarks = (() => {
    try {
      const m = Number(new URLSearchParams(window.location.search).get('marks'))
      return m >= 1 && m <= MARKS.length ? m : 1
    } catch {
      return 1
    }
  })()
  const [marks, setMarks] = useState(initialMarks)
  const [activeFact, setActiveFact] = useState(initialMarks - 1)
  const [spraying, setSpraying] = useState(false)
  const timer = useRef(null)
  const signed = marks >= MARKS.length

  useEffect(() => () => clearTimeout(timer.current), [])

  const addMark = () => {
    if (signed) return
    const next = marks + 1
    setMarks(next)
    setActiveFact(next - 1)
    setSpraying(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSpraying(false), 1000)
  }

  const pose = spraying ? 'point' : ending ? 'lookback' : 'stand'
  const poster = POSTERS.future

  return (
    <StoryChapter chapter={chapter} className="chapter--future">
      <Skyline color="#2a1030" windows="#FFD447" className="future__skyline" litEvery={4} />

      <div className="future">
        <figure className="poster poster--future" style={{ '--r': '-2deg' }}>
          <img src={poster.src} alt={poster.alt} width={poster.w} height={poster.h} loading="lazy" decoding="async" />
        </figure>

        <section className="future__center" aria-label="The next version of me">
          <Narrator mood="thinking">What kind of engineer do I want to become?</Narrator>
          <p className="sticker sticker--paper future__statement">{FUTURE.statement}</p>
          <p className="future__closing">{FUTURE.closing}</p>

          <div className="future__links" role="group" aria-label="Social and code profiles">
            <a
              href="https://github.com/Parwath116"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--profile btn--github"
              aria-label="Parwath on GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/parwath-sri-raju-k-95247a2b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--profile btn--linkedin"
              aria-label="Parwath on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </section>

        <section className="future__wallwrap" aria-label="An unfinished graffiti wall">
          <div className="wall" role="img" aria-label={`Unfinished wall with ${marks} of ${MARKS.length} marks painted${signed ? ', signed Parwath Sri Raju K.' : ''}`}>
            <svg viewBox="0 0 320 240" className="wall__svg" aria-hidden="true" focusable="false">
              {MARKS.map((m, i) => (
                <g
                  key={i}
                  className={`mark-group ${i < marks ? 'is-interactive' : ''}`}
                  onClick={() => i < marks && setActiveFact(i)}
                  role={i < marks ? 'button' : undefined}
                  tabIndex={i < marks ? 0 : -1}
                  onKeyDown={(e) => {
                    if (i < marks && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      setActiveFact(i)
                    }
                  }}
                  aria-label={i < marks ? `Mark ${i + 1}: ${m.fact}` : undefined}
                >
                  <path d={m.d} fill="none" stroke="#171717" strokeWidth={m.w + 7} strokeLinecap="round" strokeLinejoin="round" pathLength="1" className={`mark mark--outline ${i < marks ? 'is-on' : ''}`} />
                  <path d={m.d} fill="none" stroke={m.c} strokeWidth={m.w} strokeLinecap="round" strokeLinejoin="round" pathLength="1" className={`mark ${i < marks ? 'is-on' : ''}`} />
                </g>
              ))}
            </svg>
            {marks === 0 && <span className="wall__hint">an unfinished wall…</span>}
            <p className={`signature ${signed ? 'is-on' : ''}`} aria-hidden={!signed}>
              {FUTURE.signature}
            </p>
          </div>

          {activeFact !== null && MARKS[activeFact] && (
            <div className="wall__fact sticker sticker--paper" aria-live="polite">
              <span className="wall__fact-tag" style={{ background: MARKS[activeFact].c }}>
                FACT #{activeFact + 1}
              </span>
              <p className="wall__fact-text">{MARKS[activeFact].fact}</p>
            </div>
          )}

          <div className="wall__pips" role="tablist" aria-label="Revealed mark facts">
            {MARKS.map((m, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                disabled={i >= marks}
                onClick={() => setActiveFact(i)}
                className={`wall__pip ${i === activeFact ? 'is-active' : ''} ${i < marks ? 'is-revealed' : ''}`}
                aria-selected={i === activeFact}
                aria-label={`Mark ${i + 1}: ${i < marks ? m.fact : 'Not revealed yet'}`}
                style={{ '--c': m.c }}
              >
                <span className="wall__pip-num">{i + 1}</span>
              </button>
            ))}
          </div>

          <div className="future__actions">
            <button type="button" className="btn btn--mark" onClick={addMark} disabled={signed}>
              {signed ? 'SIGNED ✔' : marks === 0 ? 'ADD A MARK' : 'ADD ANOTHER MARK'}
            </button>
            <span className="future__count" aria-live="polite">
              {signed ? 'The story continues.' : `${marks} / ${MARKS.length}`}
            </span>
          </div>

          <div className="future__char">
            <GraffitiCharacter pose={pose} height={h} walkIn from="right" walkMs={1100} label="Parwath's character adding marks to the wall" />
          </div>
        </section>
      </div>
    </StoryChapter>
  )
}
