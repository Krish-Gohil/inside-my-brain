import { Link, Navigate, useParams } from 'react-router-dom'
import { identity, projects, socials } from '../data/content'
import { SocialIcons } from '../components/SocialIcons'
import './Home.css'
import '../components/ProjectCard.css'
import './ProjectDetail.css'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/projects" replace />

  return (
    <div className="site project-detail">
      <p className="crumb-row">
        <Link to="/projects" className="crumb">
          Projects
        </Link>
        <span className="crumb-row__sep">/</span>
        <span>{project.name}</span>
      </p>

      <h1 className="project-detail__title">{project.name}</h1>
      <p className="project-detail__lead">{project.desc}</p>

      {project.image && (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="project-detail__shot"
        />
      )}

      <div className="project-detail__meta">
        <span>{project.year}</span>
        <span className="sep">|</span>
        <span>{project.tags}</span>
        <span className="sep">|</span>
        <span>{project.impact}</span>
      </div>

      <div className="project-detail__links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
            GitHub
          </a>
        )}
        {project.live !== '#' && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="project-card__link"
          >
            Live
          </a>
        )}
      </div>

      <section className="detail-card">
        <p className="detail-card__label">Stack</p>
        <p className="detail-card__text">{project.stack}</p>
      </section>

      <section className="detail-card">
        <p className="detail-card__label">Highlights</p>
        <ul className="detail-card__list">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="pipeline">
        {project.pipeline.map((step, i) => (
          <span key={step} className="pipeline__item">
            <span className="pipeline__pill">{step}</span>
            {i < project.pipeline.length - 1 && <span className="pipeline__arrow">→</span>}
          </span>
        ))}
      </div>

      <div className="latest__more">
        <Link to="/projects" className="text-link">
          ← Back to projects
        </Link>
      </div>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} · Created by {identity.name.split(' ')[0]}</p>
        <SocialIcons links={socials} />
      </footer>
    </div>
  )
}
