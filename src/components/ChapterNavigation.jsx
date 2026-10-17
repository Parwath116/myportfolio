import { CHAPTERS } from '../data/story'

export default function ChapterNavigation({ current, onGo, disabled, ending }) {
  const total = CHAPTERS.length
  const atStart = current === 0
  const atEnd = current === total - 1

  return (
    <>
      <div className="topbar">
        <span className="topbar__count" aria-hidden="true">
          CH {current + 1} / {total}
        </span>
      </div>

      <nav className="nav" aria-label="Story chapters">
        <button
          type="button"
          className="btn btn--nav"
          onClick={() => onGo(current - 1)}
          disabled={disabled || atStart}
          aria-label="Previous chapter"
        >
          <span aria-hidden="true">◀</span>
          <span className="nav__btn-text">PREV</span>
        </button>

        <ol className="nav__pips">
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                className={`pip pip--${c.accent} ${i === current ? 'is-active' : ''}`}
                onClick={() => onGo(i)}
                disabled={disabled}
                aria-current={i === current ? 'step' : undefined}
                aria-label={`Chapter ${c.n}: ${c.title}`}
              >
                <span className="pip__n">{c.n}</span>
                <span className="pip__label">{c.short}</span>
              </button>
            </li>
          ))}
        </ol>

        <button
          type="button"
          className={`btn btn--nav btn--next ${ending && !atEnd ? 'is-nudging' : ''}`}
          onClick={() => onGo(current + 1)}
          disabled={disabled || atEnd}
          aria-label="Next chapter"
        >
          <span className="nav__btn-text">NEXT</span>
          <span aria-hidden="true">▶</span>
        </button>
      </nav>
    </>
  )
}
