import { useEffect, useState } from 'react'

// Responsive on-screen height (px) for the character: a fraction of the viewport height,
// clamped, and smaller on narrow screens.
export default function useCharHeight(fraction = 0.5, min = 240, max = 480) {
  const calc = () => {
    if (typeof window === 'undefined') return max
    const narrow = window.innerWidth < 760
    const f = narrow ? Math.min(fraction, 0.36) : fraction
    return Math.round(Math.max(min * (narrow ? 0.8 : 1), Math.min(max, window.innerHeight * f)))
  }
  const [h, setH] = useState(calc)
  useEffect(() => {
    const onResize = () => setH(calc())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraction, min, max])
  return h
}
