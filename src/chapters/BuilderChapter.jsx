import { useState } from 'react'
import StoryChapter from '../components/StoryChapter'
import GraffitiCharacter from '../components/GraffitiCharacter'
import Narrator from '../components/Narrator'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import ProjectCard from '../components/ProjectCard'
import { Arrow, Burst, Crown } from '../components/Doodles'
import { POSTERS } from '../assets/characters'
import useCountUp from '../hooks/useCountUp'
import useCharHeight from '../hooks/useCharHeight'
import { PHOTOS } from '../data/photos'
import { PROJECTS } from '../data/projects'
import { BUILDER_NARRATOR, BUILDER_SCENES, HACKATHONS, LEVEL_UP_STEPS, STAGE_CARDS } from '../data/story'

function Poster({ which, rotate = 2 }) {
  const p = POSTERS[which]
  return (
    <figure className="poster" style={{ '--r': `${rotate}deg` }}>
      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
    </figure>
  )
}

function PhotoGallery({ photos, title }) {
  const validPhotos = (photos || []).filter((p) => p && p.src)
  const [activeIdx, setActiveIdx] = useState(0)

  if (validPhotos.length === 0) return null

  const currentIdx = ((activeIdx % validPhotos.length) + validPhotos.length) % validPhotos.length
  const currentPhoto = validPhotos[currentIdx]

  const goPrev = () => {
    setActiveIdx((prev) => (prev - 1 + validPhotos.length) % validPhotos.length)
  }

  const goNext = () => {
    setActiveIdx((prev) => (prev + 1) % validPhotos.length)
  }

  const handleKeyDown = (e) => {
    if (validPhotos.length <= 1) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goPrev()
    }
  }

  return (
    <div
      className="stage-gallery"
      role="region"
      aria-label={`${title} photos`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Main sticker-style photo */}
      <figure className="stage-gallery__frame">
        <img
          src={currentPhoto.src}
          alt={currentPhoto.alt || currentPhoto.caption}
          loading="lazy"
          decoding="async"
          className="stage-gallery__img"
        />
      </figure>

      {/* Visible caption */}
      {currentPhoto.caption && (
        <figcaption className="stage-gallery__caption">
          {currentPhoto.caption}
        </figcaption>
      )}

      {/* Controls & secondary thumbnails if more than 1 photo */}
      {validPhotos.length > 1 && (
        <div className="stage-gallery__controls" role="group" aria-label="Photo gallery navigation">
          <button
            type="button"
            className="stage-gallery__nav"
            onClick={goPrev}
            aria-label="Previous photo"
            title="Previous photo"
          >
            ‹
          </button>

          <div className="stage-gallery__thumbs">
            {validPhotos.map((p, idx) => {
              const isCur = idx === currentIdx
              return (
                <button
                  key={p.src}
                  type="button"
                  className={`stage-gallery__thumb ${isCur ? 'is-active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Photo ${idx + 1} of ${validPhotos.length}: ${p.caption || p.alt}`}
                  aria-pressed={isCur}
                >
                  <img
                    src={p.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className="stage-gallery__nav"
            onClick={goNext}
            aria-label="Next photo"
            title="Next photo"
          >
            ›
          </button>

          <div className="stage-gallery__dots" aria-hidden="true">
            {validPhotos.map((_, idx) => (
              <span
                key={idx}
                className={`stage-gallery__dot ${idx === currentIdx ? 'is-active' : ''}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function LevelUp() {
  const cgpa = useCountUp(9.03, { ms: 1400 })
  return (
    <div className="scene scene--levelup">
      <ol className="steps">
        {LEVEL_UP_STEPS.map((s, i) => (
          <li key={s.title} className={`step ${i === LEVEL_UP_STEPS.length - 1 ? 'step--hero' : ''}`}>
            <span className="step__n" aria-hidden="true">
              {i + 1}
            </span>
            <div className="step__content">
              <h3 className="step__title">{s.title}</h3>
              {s.stat ? (
                <p className="step__stat" aria-label={`${s.stat} CGPA`}>
                  <span aria-hidden="true">{cgpa}</span> <small>CGPA</small>
                </p>
              ) : null}
              <p>{s.text}</p>
              {s.photos && s.photos.length > 0 && (
                <PhotoGallery photos={s.photos} title={s.title} />
              )}
            </div>
            {i === LEVEL_UP_STEPS.length - 1 && <Burst size={74} className="step__burst" color="#FF4FA3" />}
            {i < LEVEL_UP_STEPS.length - 1 && <Arrow className="step__arrow" size={60} color="#19D3E6" />}
          </li>
        ))}
      </ol>
      <div className="scene__side">
        <Poster which="coding" rotate={3} />
        <PhotoPlaceholder id="college" label="Engineering & college life" usage="A photo from your first-year or branch-upgrade days." ratio="16 / 10" rotate={-2} />
      </div>
    </div>
  )
}

function StageCard({ card, rotate = 0 }) {
  const photos = (card.photos && card.photos.length > 0)
    ? card.photos
    : (card.photo && PHOTOS[card.photo] ? [{ src: PHOTOS[card.photo], alt: card.photoLabel || card.title, caption: card.photoLabel || '' }] : [])

  return (
    <article
      className={`sticker sticker--${card.color} stage-card`}
      style={{ '--r': `${rotate}deg` }}
    >
      <h3 className="stage-card__title">{card.title}</h3>
      <p>{card.text}</p>
      <PhotoGallery photos={photos} title={card.title} />
    </article>
  )
}

function Stage() {
  return (
    <div className="scene scene--stage">
      <div className="stage-cards">
        {STAGE_CARDS.map((c, i) => (
          <StageCard key={c.title} card={c} rotate={i ? 1.5 : -1.5} />
        ))}
      </div>
      <div className="scene__side">
        <Poster which="explorer" rotate={-3} />
      </div>
    </div>
  )
}

function Hack({ onOpenProject }) {
  const h = useCharHeight(0.42, 240, 400)
  return (
    <div className="scene scene--hack">
      <div className="hack__main">
        <div className="ranks">
          {HACKATHONS.map((r, i) => (
            <article key={r.name} className={`rank rank--${r.color}`} style={{ '--r': `${i ? 1.5 : -1.5}deg` }}>
              <b className="rank__big">{r.rank}</b>
              <span className="rank__of">{r.of}</span>
              <strong className="rank__name">{r.name}</strong>
              <small>
                {r.where} · {r.when}
              </small>
            </article>
          ))}
          <PhotoPlaceholder id="hackathon" label="Hackathon photo" usage="You or your team at Casethon or HackFinity." ratio="4 / 3" className="ranks__photo" rotate={2} />
        </div>

        <h2 className="tag tag--yellow hack__tag">
          <Crown size={26} /> THE PROJECT WALL
        </h2>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={onOpenProject} rotate={[-1, 1, 1, -1][i % 4]} />
          ))}
        </div>
      </div>

      <aside className="hack__char char-slot" aria-label="The story's guide, pointing at the project wall">
        <Narrator mood="serious" tail="bottom">
          {BUILDER_NARRATOR.hack}
        </Narrator>
        <GraffitiCharacter pose="point" height={h} walkIn from="right" walkMs={900} label="Parwath's graffiti character pointing at the projects" />
      </aside>
    </div>
  )
}

export default function BuilderChapter({ chapter, onOpenProject }) {
  const initialScene = (() => {
    try {
      const s = new URLSearchParams(window.location.search).get('scene')
      return BUILDER_SCENES.some((x) => x.id === s) ? s : 'levelup'
    } catch {
      return 'levelup'
    }
  })()
  const [scene, setScene] = useState(initialScene)
  const moods = { levelup: 'happy', stage: 'smile', hack: 'serious' }

  return (
    <StoryChapter chapter={chapter}>
      <div className="tabs" role="tablist" aria-label="Builder Era scenes">
        {BUILDER_SCENES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={scene === s.id}
            aria-controls={`panel-${s.id}`}
            className={`tab ${scene === s.id ? 'is-active' : ''}`}
            onClick={() => setScene(s.id)}
            onKeyDown={(e) => {
              const i = BUILDER_SCENES.findIndex((x) => x.id === scene)
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.stopPropagation()
                const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + BUILDER_SCENES.length) % BUILDER_SCENES.length
                setScene(BUILDER_SCENES[n].id)
                document.getElementById(`tab-${BUILDER_SCENES[n].id}`)?.focus()
              }
            }}
            tabIndex={scene === s.id ? 0 : -1}
          >
            <span className="tab__label">{s.label}</span>
            <small>{s.hint}</small>
          </button>
        ))}
      </div>

      {scene !== 'hack' && (
        <Narrator mood={moods[scene]} className="builder__narrator">
          {BUILDER_NARRATOR[scene]}
        </Narrator>
      )}

      <div role="tabpanel" id={`panel-${scene}`} aria-labelledby={`tab-${scene}`} key={scene} className="scene-wrap">
        {scene === 'levelup' && <LevelUp />}
        {scene === 'stage' && <Stage />}
        {scene === 'hack' && <Hack onOpenProject={onOpenProject} />}
      </div>
    </StoryChapter>
  )
}
