import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import GraffitiCharacter from './GraffitiCharacter'
import useReducedMotion from '../hooks/useReducedMotion'
import useCharHeight from '../hooks/useCharHeight'
import { INTRO_LINE } from '../data/story'
import { Arrow } from './Doodles'

const WORDS = ['PARWATH', 'SRI', 'RAJU', 'K.']
const COLORS = ['#FF6B35', '#19D3E6', '#FF4FA3', '#FFD447']

// Tiny deterministic PRNG so the "paint burst" looks random but is stable between renders.
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/**
 * Scene timeline (all skippable):
 *   dark   → black screen, flickering spotlight, letterbox bars
 *   title  → name is revealed letter by letter
 *   char   → the character walks in and waves
 *   ready  → "CLICK MY NAME TO BEGIN"
 *   burst  → name explodes into paint, character walks off, hand-off to Chapter 1
 */
export default function CinematicIntro({ onBegin, onSkip, leaving }) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState(reduced ? 'ready' : 'dark')
  const phaseRef = useRef(phase)
  phaseRef.current = phase
  const charH = useCharHeight(0.5, 260, 520)

  useEffect(() => {
    if (reduced) return undefined
    const t = [
      setTimeout(() => setPhase((p) => (p === 'dark' ? 'title' : p)), 700),
      setTimeout(() => setPhase((p) => (p === 'title' ? 'char' : p)), 3300),
      setTimeout(() => setPhase((p) => (p === 'char' ? 'ready' : p)), 5200),
    ]
    return () => t.forEach(clearTimeout)
  }, [reduced])

  // Esc skips the intro.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSkip])

  const letters = useMemo(() => {
    const r = rng(42)
    let i = 0
    return WORDS.map((w) =>
      w.split('').map((ch) => ({
        ch,
        i: i++,
        dx: Math.round((r() - 0.5) * 900),
        dy: Math.round((r() - 0.9) * 600),
        rot: Math.round((r() - 0.5) * 540),
      })),
    )
  }, [])

  const sparks = useMemo(() => {
    const r = rng(7)
    return Array.from({ length: 46 }, (_, i) => {
      const a = r() * Math.PI * 2
      const d = 160 + r() * 520
      return {
        i,
        x: Math.round(Math.cos(a) * d),
        y: Math.round(Math.sin(a) * d * 0.7),
        s: 8 + Math.round(r() * 26),
        c: COLORS[i % COLORS.length],
        t: Math.round(r() * 160),
      }
    })
  }, [])

  const begin = useCallback(() => {
    if (phaseRef.current === 'burst' || phaseRef.current === 'dark' || phaseRef.current === 'title') return
    if (reduced) {
      onBegin()
      return
    }
    setPhase('burst')
    setTimeout(onBegin, 1250)
  }, [onBegin, reduced])

  const showName = phase !== 'dark'
  const showChar = phase === 'char' || phase === 'ready' || phase === 'burst'
  const canClick = phase === 'char' || phase === 'ready'

  return (
    <div className={`intro intro--${phase} ${leaving ? 'is-leaving' : ''}`} role="region" aria-label="Opening title sequence">
      <div className="intro__beam" aria-hidden="true" />
      <div className="intro__grain" aria-hidden="true" />
      <div className="intro__bar intro__bar--top" aria-hidden="true" />
      <div className="intro__bar intro__bar--bottom" aria-hidden="true" />

      <button type="button" className="intro__skip" onClick={onSkip}>
        SKIP INTRO <span aria-hidden="true">▶▶</span>
      </button>

      <div className="intro__stage">
        <button
          type="button"
          className={`intro__name ${showName ? 'is-on' : ''} ${phase === 'burst' ? 'is-burst' : ''} ${canClick ? 'is-clickable' : ''}`}
          onClick={begin}
          disabled={!canClick}
          aria-label="Parwath Sri Raju K. Click my name to begin"
        >
          {letters.map((word, wi) => (
            <span className="intro__word" key={wi} aria-hidden="true">
              {word.map((l) => (
                <span
                  className="l"
                  key={l.i}
                  style={{ '--i': l.i, '--dx': `${l.dx}px`, '--dy': `${l.dy}px`, '--rot': `${l.rot}deg` }}
                >
                  {l.ch}
                </span>
              ))}
            </span>
          ))}
          <span className="intro__accent intro__accent--1" aria-hidden="true" />
          <span className="intro__accent intro__accent--2" aria-hidden="true" />
        </button>

        <p className={`intro__cta ${phase === 'ready' ? 'is-on' : ''}`} aria-hidden={phase !== 'ready'}>
          <Arrow color="#FFD447" size={64} className="intro__cta-arrow" flip />
          <span>CLICK MY NAME TO BEGIN</span>
        </p>
      </div>

      {showChar && (
        <div className={`intro__char ${phase === 'burst' ? 'is-leaving' : ''}`}>
          {phase !== 'burst' && (
            <p className={`bubble intro__bubble ${phase === 'ready' ? 'is-on' : ''}`}>{INTRO_LINE}</p>
          )}
          {phase === 'burst' ? (
            <GraffitiCharacter key="leave" pose="walk" height={charH} flip />
          ) : (
            <GraffitiCharacter key="enter" pose="wave" height={charH} walkIn from="right" walkMs={1600} />
          )}
        </div>
      )}

      {phase === 'burst' && (
        <>
          <div className="intro__flash" aria-hidden="true" />
          <div className="intro__sparks" aria-hidden="true">
            {sparks.map((s) => (
              <i
                key={s.i}
                className="spark"
                style={{ '--x': `${s.x}px`, '--y': `${s.y}px`, '--s': `${s.s}px`, '--c': s.c, '--t': `${s.t}ms` }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
