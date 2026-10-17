import { useEffect, useState } from 'react'
import useReducedMotion from './useReducedMotion'

// Counts from 0 to `target` once `active` is true. Respects reduced motion.
export default function useCountUp(target, { active = true, ms = 1200, decimals = 2 } = {}) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(reduced ? target : 0)

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, ms, reduced])

  return value.toFixed(decimals)
}
