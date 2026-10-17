import { PHOTOS } from '../data/photos'

/**
 * Shows the real photo when one is set in src/data/photos.js (or via `src`),
 * otherwise a clearly-labelled placeholder saying what belongs here.
 * Never shows stock or invented imagery.
 */
export default function PhotoPlaceholder({
  id,
  src,
  label,
  _usage,
  ratio = '4 / 3',
  className = '',
  rotate = 0,
}) {
  const url = src || (id ? PHOTOS[id] : '')
  const style = { aspectRatio: ratio, '--r': `${rotate}deg` }

  if (!url) {
    return null
  }

  return (
    <figure className={`photo ${className}`} style={style}>
      <img src={url} alt={label} loading="lazy" decoding="async" />
    </figure>
  )
}
