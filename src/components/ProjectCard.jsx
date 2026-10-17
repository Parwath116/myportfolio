export default function ProjectCard({ project, onOpen, rotate = 0 }) {
  const { name, kind, problem, tech, contribution, color } = project

  return (
    <article className={`proj proj--${color}`} style={{ '--r': `${rotate}deg` }}>
      <div className="proj__bar">
        <span>{kind}</span>
      </div>
      <h3 className="proj__name">{name}</h3>
      <p className="proj__problem">{problem}</p>
      {contribution && (
        <p className="proj__role">
          <b>My part: </b>
          {contribution}
        </p>
      )}
      <ul className="chips" aria-label={`${name} technologies`}>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <button
        type="button"
        className="btn btn--explore"
        onClick={() => onOpen(project)}
        aria-haspopup="dialog"
        aria-label={`Explore project: ${name}`}
      >
        EXPLORE PROJECT <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}
