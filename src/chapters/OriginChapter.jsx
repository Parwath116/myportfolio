import StoryChapter from '../components/StoryChapter'
import GraffitiCharacter from '../components/GraffitiCharacter'
import Narrator from '../components/Narrator'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { Arrow, Cross, Tick, Star } from '../components/Doodles'
import useCharHeight from '../hooks/useCharHeight'
import { DETOURS, ORIGIN_LEAD, ORIGIN_NARRATOR, WINS } from '../data/story'

export default function OriginChapter({ chapter, ending }) {
  const h = useCharHeight(0.5, 280, 470)

  return (
    <StoryChapter chapter={chapter}>
      <p className="lead">{ORIGIN_LEAD}</p>

      <div className="origin">
        {/* ── The wins ─────────────────────────────── */}
        <section className="origin__wins" aria-labelledby="wins-h">
          <h2 id="wins-h" className="tag tag--cyan">
            THE WINS
          </h2>
          <ul className="badge-grid">
            {WINS.map((w) => (
              <li key={w.big + w.label} className={`badge badge--${w.color}`} style={{ '--r': `${w.r}deg` }}>
                <b className="badge__big" data-long={w.big.length > 5}>{w.big}</b>
                <span className="badge__label">{w.label}</span>
                <small className="badge__note">{w.note}</small>
              </li>
            ))}
          </ul>
          <div className="photo-row">
            <PhotoPlaceholder id="school" label="School & PU college photo" usage="You at St Ann's or MES Kishora Kendra." ratio="4 / 3" rotate={-2} />
            <PhotoPlaceholder id="ncc" label="NCC camp photo" usage="From one of your four NCC camps." ratio="4 / 3" rotate={2} />
            <PhotoPlaceholder id="certificate" label="Certificate image" usage="NCC 'A' certificate or an early achievement." ratio="4 / 3" rotate={-1} />
          </div>
        </section>

        {/* ── The character ────────────────────────── */}
        <aside className="origin__char char-slot" aria-label="The story's guide">
          <Narrator mood={ending ? 'smile' : 'thinking'} tail="bottom">
            {ending ? 'Ready? The next chapter is where I start building.' : ORIGIN_NARRATOR}
          </Narrator>
          <GraffitiCharacter
            pose={ending ? 'lookback' : 'stand'}
            height={h}
            walkIn
            from="right"
            walkMs={1100}
            label="Parwath's graffiti character in the yellow kurta"
          />
        </aside>

        {/* ── The detours ──────────────────────────── */}
        <section className="origin__detours" aria-labelledby="detours-h">
          <h2 id="detours-h" className="tag tag--pink">
            THE DETOURS
          </h2>
          <ol className="route">
            {DETOURS.map((d, i) => (
              <li key={d.id} className={`sign sign--${d.state}`}>
                <div className="sign__mark">{d.state === 'crossed' ? <Cross size={44} /> : <Tick size={44} />}</div>
                <div className="sign__text">
                  <strong className="sign__title">{d.title}</strong>
                  <span>{d.note}</span>
                </div>
                {i < DETOURS.length - 1 && <Arrow color="#FFD447" size={70} className="sign__arrow" />}
              </li>
            ))}
          </ol>
          <p className="sticker sticker--yellow origin__quote" style={{ '--r': '-2deg' }}>
            <Star size={26} /> Life doesn’t always follow the original plan. Mine didn’t.
          </p>
        </section>
      </div>
    </StoryChapter>
  )
}
