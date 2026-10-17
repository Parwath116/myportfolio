import { useEffect, useState } from 'react'
import { POSES, STAND_H, WALK_CYCLE } from '../assets/characters'
import useReducedMotion from '../hooks/useReducedMotion'

// Preload every pose once so swapping frames in the walk cycle never flickers.
let preloaded = false
function preloadPoses() {
  if (preloaded || typeof Image === 'undefined') return
  preloaded = true
  Object.values(POSES).forEach(({ src }) => {
    const img = new Image()
    img.src = src
  })
}

/**
 * The protagonist. Poses are separate transparent cut-outs, so movement is a real
 * frame-by-frame walk cycle (walk1 → walk2 → walk3 → walk2) rather than a slid still.
 *
 * The artwork faces LEFT. `flip` mirrors it to face right.
 *
 * pose     'stand' | 'wave' | 'point' | 'sit' | 'lookback' | 'walk'
 * height   on-screen height (px) of the STANDING pose; other poses scale to match
 * walkIn   walk in from the edge, then settle into `pose`
 * from     'right' (walks left, natural direction) | 'left' (walks right, mirrored)
 */
export default function GraffitiCharacter({
  pose = 'stand',
  height = 420,
  flip = false,
  walkIn = false,
  from = 'right',
  walkMs = 1200,
  className = '',
  style,
  label = 'Comic graffiti illustration of Parwath',
}) {
  const reduced = useReducedMotion()
  const [entering, setEntering] = useState(walkIn && !reduced)
  const [frame, setFrame] = useState(0)

  useEffect(preloadPoses, [])

  const walking = pose === 'walk' || entering

  useEffect(() => {
    if (!walking || reduced) return undefined
    const id = setInterval(() => setFrame((f) => (f + 1) % WALK_CYCLE.length), 140)
    return () => clearInterval(id)
  }, [walking, reduced])

  useEffect(() => {
    if (!entering) return undefined
    const t = setTimeout(() => setEntering(false), walkMs)
    return () => clearTimeout(t)
  }, [entering, walkMs])

  const key = walking && !reduced ? WALK_CYCLE[frame] : pose === 'walk' ? 'walk2' : pose
  const meta = POSES[key] || POSES.stand
  const imgH = (height * meta.h) / STAND_H
  const imgW = (imgH * meta.w) / meta.h
  const mirror = entering ? from === 'left' : flip

  const cls = [
    'char',
    entering ? `char--enter char--from-${from}` : '',
    walking && !reduced ? 'char--walking' : `char--${pose}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={cls}
      style={{ width: height * 0.62, height, '--walk-ms': `${walkMs}ms`, ...style }}
      role="img"
      aria-label={label}
    >
      <img
        className="char__img"
        src={meta.src}
        alt=""
        width={Math.round(imgW)}
        height={Math.round(imgH)}
        draggable="false"
        style={{ width: imgW, height: imgH, transform: mirror ? 'scaleX(-1)' : undefined }}
      />
      <span className="char__shadow" aria-hidden="true" />
    </div>
  )
}
