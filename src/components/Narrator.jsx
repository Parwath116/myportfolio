import { FACES } from '../assets/characters'

// The character's expressions live here: a round sticker avatar plus a comic speech bubble.
// mood: 'neutral' | 'happy' | 'smile' | 'serious' | 'thinking' | 'side'
export default function Narrator({ mood = 'smile', children, className = '', tail = 'left' }) {
  return (
    <div className={`narrator narrator--tail-${tail} ${className}`}>
      <img
        className="narrator__face"
        src={FACES[mood] || FACES.neutral}
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <p className="bubble">{children}</p>
    </div>
  )
}
