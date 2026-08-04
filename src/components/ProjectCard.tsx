import { Link } from 'react-router-dom'
import type { Project } from '../data/content'
import './ProjectCard.css'

function Thumb({ project }: { project: Project }) {
  const steps = project.pipeline.slice(0, 4)
  return (
    <div className="project-thumb" style={{ ['--accent' as string]: project.accent }}>
      <div className="project-thumb__grid" aria-hidden>
        <span className="project-thumb__badge">{project.num}</span>
        <p className="project-thumb__label">{project.tags}</p>
        <div className="project-thumb__flow">
          {steps.map((step, i) => (
            <span key={step}>
              {step}
              {i < steps.length - 1 ? ' → ' : ''}
            </span>
          ))}
        </div>
        <div className="project-thumb__boxes">
          {steps.map((step) => (
            <div key={step} className="project-thumb__box">
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const liveHref = project.live || '#'
  const liveIsPlaceholder = liveHref === '#'

  return (
    <article className="project-card">
      <Link to={`/projects/${project.slug}`} className="project-card__media" aria-hidden tabIndex={-1}>
        <Thumb project={project} />
      </Link>

      <div className="project-card__body">
        <Link to={`/projects/${project.slug}`} className="project-card__copy">
          <h3 className="project-card__title">{project.name}</h3>
          <p className="project-card__desc">{project.desc}</p>
        </Link>

        <div className="project-card__actions">
          {project.github && (
            <a
              href={project.github}
              className="project-card__link"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          <a
            href={liveHref}
            className="project-card__link"
            target={liveIsPlaceholder ? undefined : '_blank'}
            rel={liveIsPlaceholder ? undefined : 'noreferrer'}
            onClick={liveIsPlaceholder ? (e) => e.preventDefault() : undefined}
            aria-disabled={liveIsPlaceholder || undefined}
          >
            Live
          </a>
        </div>
      </div>
    </article>
  )
}
