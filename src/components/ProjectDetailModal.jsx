import { useEffect, useRef, useState } from 'react'

export default function ProjectDetailModal({ project, onClose }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const [activeScreen, setActiveScreen] = useState(null)
  const [zoomedImg, setZoomedImg] = useState(null)
  const zoomedImgRef = useRef(zoomedImg)

  useEffect(() => {
    zoomedImgRef.current = zoomedImg
  }, [zoomedImg])

  // Esc closes; Tab stays inside the dialog; focus returns to the opener on close.
  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        if (zoomedImgRef.current) {
          setZoomedImg(null)
          return
        }
        onClose()
      }
      if (e.key === 'Tab' && panelRef.current && !zoomedImgRef.current) {
        const f = panelRef.current.querySelectorAll('a[href],button:not([disabled])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      opener?.focus?.()
    }
  }, [onClose])

  const {
    name,
    kind,
    tagline,
    problem,
    overview,
    capabilities,
    tech,
    contribution,
    screenshots,
    repos,
    diagram,
    color,
  } = project

  const validScreenshots = (screenshots || []).filter((s) => Boolean(s?.src))
  const validRepos = (repos || []).filter((r) => Boolean(r?.url))

  return (
    <>
      <div className="modal" onClick={onClose}>
        <div
          className={`modal__panel modal__panel--${color}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="proj-modal-title"
          ref={panelRef}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close project details"
          >
            ✕
          </button>

          <p className="eyebrow eyebrow--ink">{kind}</p>
          <h2 id="proj-modal-title" className="modal__title">
            {name}
          </h2>
          <p className="modal__tagline">{tagline}</p>

          <div className="modal__grid">
            <section>
              <h3 className="modal__h">The problem</h3>
              <p>{problem}</p>

              <h3 className="modal__h">What it is</h3>
              <p>{overview}</p>

              <h3 className="modal__h">What it covers</h3>
              <ul className="modal__list">
                {capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              {contribution && (
                <>
                  <h3 className="modal__h">My contribution</h3>
                  <p>{contribution}</p>
                </>
              )}

              <h3 className="modal__h">Built with</h3>
              <ul className="chips">
                {tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            {(validScreenshots.length > 0 || diagram || validRepos.length > 0) && (
              <section>
                {validScreenshots.length > 0 && (
                  <div className="modal__screens-block">
                    <h3 className="modal__h">Screens</h3>
                    <p className="modal__screens-hint">Click to view screenshot:</p>
                    <div className="modal__screen-list" role="tablist" aria-label="Project screenshots">
                      {validScreenshots.map((s, idx) => {
                        const isOpen = activeScreen === idx
                        return (
                          <div key={idx} className="modal__screen-item">
                            <button
                              type="button"
                              className={`btn btn--screen ${isOpen ? 'is-active' : ''}`}
                              onClick={() => setActiveScreen((prev) => (prev === idx ? null : idx))}
                              aria-expanded={isOpen}
                            >
                              <div className="btn--screen-main">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                  <circle cx="8.5" cy="8.5" r="1.5" />
                                  <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <span>{s.caption || `Screenshot ${idx + 1}`}</span>
                              </div>
                              <span className="btn--screen-state" aria-hidden="true">
                                {isOpen ? '▲ Hide' : '▼ View'}
                              </span>
                            </button>

                            {isOpen && (
                              <figure className="modal__shot-reveal">
                                <div
                                  className="photo photo--clickable"
                                  style={{ aspectRatio: '16 / 9' }}
                                  onClick={() => setZoomedImg(s)}
                                  title="Click to view full screen"
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault()
                                      setZoomedImg(s)
                                    }
                                  }}
                                >
                                  <img
                                    src={s.src}
                                    alt={s.caption || `${name} screenshot ${idx + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  <span className="photo__zoom-hint">🔍 Click to enlarge</span>
                                </div>
                                {s.caption && <figcaption className="modal__shot-caption">{s.caption}</figcaption>}
                              </figure>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {diagram && (
                  <>
                    <h3 className="modal__h">Architecture / workflow</h3>
                    <div className="photo" style={{ aspectRatio: '16 / 9' }}>
                      <img
                        src={diagram}
                        alt="Architecture or workflow diagram"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </>
                )}

                {validRepos.length > 0 && (
                  <>
                    <h3 className="modal__h">{validRepos.length > 1 ? 'Repositories' : 'Repository'}</h3>
                    <div className="modal__repos">
                      {validRepos.map((r, idx) => (
                        <a
                          key={idx}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--repo"
                          aria-label={`${name} - ${r.label}`}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>{r.label}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </section>
            )}
          </div>
        </div>
      </div>

      {zoomedImg && (
        <div className="lightbox" onClick={() => setZoomedImg(null)} role="dialog" aria-modal="true" aria-label="Enlarged screenshot">
          <div className="lightbox__box" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightbox__close" onClick={() => setZoomedImg(null)} aria-label="Close enlarged screenshot">
              ✕
            </button>
            <img src={zoomedImg.src} alt={zoomedImg.caption || 'Enlarged screenshot'} className="lightbox__img" />
            {zoomedImg.caption && <p className="lightbox__caption">{zoomedImg.caption}</p>}
          </div>
        </div>
      )}
    </>
  )
}
