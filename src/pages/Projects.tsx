import { Link } from 'react-router-dom'
import { identity, projects, socials } from '../data/content'
import { ProjectCard } from '../components/ProjectCard'
import { SocialIcons } from '../components/SocialIcons'
import './Home.css'
import './Projects.css'

export function Projects() {
  return (
    <div className="site">
      <header className="projects-head">
        <div>
          <Link to="/" className="crumb">
            ← {identity.name}
          </Link>
          <h1 className="latest__heading projects-head__title">All projects</h1>
        </div>
        <Link to="/" className="pill">
          Home <span aria-hidden>›</span>
        </Link>
      </header>

      <div className="latest__list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} · Created by {identity.name.split(' ')[0]}</p>
        <SocialIcons links={socials} />
      </footer>
    </div>
  )
}
