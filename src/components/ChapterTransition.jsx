import { useEffect } from 'react'
import GraffitiCharacter from './GraffitiCharacter'

const BANDS = ['#FF6B35', '#19D3E6', '#FF4FA3', '#FFD447', '#171717', '#FF6B35']
export const TRANSITION_MS = 1500
const SWAP_AT = 800

/**
 * Paint-swipe between chapters. Bands of paint sweep across and cover the old mural,
 * the chapter is swapped while everything is covered, then the paint wipes off to reveal
 * the new mural. The character walks across in front the whole time.
 * dir = 1 → walking right (next); dir = -1 → walking left (previous).
 */
export default function ChapterTransition({ dir, onSwap, onDone }) {
  useEffect(() => {
    const swap = setTimeout(onSwap, SWAP_AT)
    const done = setTimeout(onDone, TRANSITION_MS + 160)
    return () => {
      clearTimeout(swap)
      clearTimeout(done)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tall = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.5, 380) : 340

  return (
    <div className={`swipe swipe--${dir > 0 ? 'next' : 'prev'}`} aria-hidden="true">
      {BANDS.map((color, i) => (
        <div
          key={i}
          className="swipe__band"
          style={{ '--c': color, '--i': i, '--n': BANDS.length }}
        />
      ))}
      <div className="swipe__walker" style={{ '--tms': `${TRANSITION_MS}ms` }}>
        <GraffitiCharacter pose="walk" height={tall} flip={dir > 0} />
      </div>
    </div>
  )
}
