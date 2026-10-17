import { useEffect, useState } from 'react'
import StoryChapter from '../components/StoryChapter'
import GraffitiCharacter from '../components/GraffitiCharacter'
import Narrator from '../components/Narrator'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { Skyline, Star, Splat } from '../components/Doodles'
import { POSTERS } from '../assets/characters'
import heroImg from '../assets/characters/professional-hero.png'
import useReducedMotion from '../hooks/useReducedMotion'
import useCharHeight from '../hooks/useCharHeight'
import { INTERNSHIP, MILESTONES } from '../data/story'

export default function InternshipChapter({ chapter, ending }) {
  const reduced = useReducedMotion()
  const [office, setOffice] = useState(reduced)
  const [run, setRun] = useState(0)
  const walkH = useCharHeight(0.3, 170, 300)
  const poster = POSTERS.explorer

  // The character walks across the campus wall to the door, then the workplace opens up.
  useEffect(() => {
    if (reduced) {
      setOffice(true)
      return undefined
    }
    setOffice(false)
    const t = setTimeout(() => setOffice(true), 2300)
    return () => clearTimeout(t)
  }, [run, reduced])

  return (
    <StoryChapter chapter={chapter}>
      <div className={`swap ${office ? 'is-office' : ''}`}>
        <div className="swap__campus" aria-hidden={office}>
          <Splat color="#FF6B35" size={300} className="swap__splat swap__splat--1" opacity={0.9} />
          <Splat color="#19D3E6" size={240} className="swap__splat swap__splat--2" opacity={0.9} />
          <p className="swap__word">CAMPUS</p>
          <p className="swap__sub">Bangalore Institute of Technology · 7th semester</p>
          {!office && (
            <div className="swap__walker" key={run}>
              <GraffitiCharacter pose="stand" height={walkH} walkIn from="left" flip walkMs={2000} label="Parwath walking towards a door" />
            </div>
          )}
          <span className="swap__door" aria-hidden="true">
            <i />
          </span>
        </div>

        <div className="swap__office" aria-hidden={!office}>
          <Skyline color="#0e2a3a" windows="#19D3E6" className="swap__skyline" litEvery={2} />
          <div className="swap__glass" />
          <p className="swap__word swap__word--office">{INTERNSHIP.company.toUpperCase()}</p>
          <div className="swap__hero" key={run}>
            <img
              src={heroImg}
              alt="Comic graffiti illustration of Parwath in smart-casual professional attire holding a laptop at GyanSys"
              className="swap__hero-img"
              width="600"
              height="1154"
            />
          </div>
        </div>

        {!reduced && (
          <button type="button" className="swap__replay" onClick={() => setRun((r) => r + 1)}>
            ↻ REPLAY
          </button>
        )}
      </div>

      <div className="breakthrough">
        <figure className="poster poster--pro" style={{ '--r': '-2deg' }}>
          <img src={poster.src} alt={poster.alt} width={poster.w} height={poster.h} loading="lazy" decoding="async" />
        </figure>

        <section className="breakthrough__story" aria-label="What the internship means">
          <Narrator mood={ending ? 'smile' : 'happy'}>
            {ending ? 'One more chapter. This one is about what comes next.' : 'The classroom meets the real world.'}
          </Narrator>
          <p className="sticker sticker--paper breakthrough__lead">{INTERNSHIP.lead}</p>
          <p className="breakthrough__meaning">{INTERNSHIP.meaning}</p>
          <h2 className="tag tag--cyan">WHO I AM</h2>
          <ul className="hopes">
            {INTERNSHIP.whoIAm.map((h) => (
              <li key={h}>
                <Star size={22} /> {h}
              </li>
            ))}
          </ul>
          <h2 className="tag tag--cyan tag--wrap">WHAT I'M LOOKING FORWARD TO AT GYANSYS</h2>
          <ul className="hopes">
            {INTERNSHIP.lookingForward.map((h) => (
              <li key={h}>
                <Star size={22} /> {h}
              </li>
            ))}
          </ul>
        </section>

        <section className="breakthrough__side" aria-label="Milestones and photos">
          <h2 className="tag tag--pink">MILESTONES</h2>
          <ol className="milestones">
            {MILESTONES.map((m) => (
              <li key={m.date} className={m.done ? 'is-done' : 'is-todo'}>
                <b>{m.date}</b>
                <span>{m.text}</span>
              </li>
            ))}
          </ol>
          <div className="photo-row photo-row--two">
            <PhotoPlaceholder id="internship" label="Internship-related image" usage="Offer moment, joining day or a team photo — only what is real." ratio="4 / 3" rotate={-2} />
            <PhotoPlaceholder id="workplace" label="Workplace image" usage="A genuine photo of your workplace or desk setup." ratio="4 / 3" rotate={2} />
          </div>
        </section>
      </div>
    </StoryChapter>
  )
}
