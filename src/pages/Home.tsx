import { Link } from 'react-router-dom'
import { identity, projects, socials } from '../data/content'
import { ProjectCard } from '../components/ProjectCard'
import { SocialIcons } from '../components/SocialIcons'
import { HeroSystems } from '../components/HeroSystems'
import './Home.css'

const latest = projects.slice(0, 3)

export function Home() {
  return (
    <div className="site">
      <section className="hero" aria-label="Introduction">
        <div className="hero__copy">
          <p className="hero__badge">
            <span className="hero__badge-dot" aria-hidden />
            Open to Winter 2027 Internships
          </p>

          <h1 className="hero__name">{identity.name}</h1>
          <p className="hero__headline">
            I build systems that turn messy problems into software people trust.
          </p>
          <p className="hero__intro">
            Full-stack developer focused on cloud APIs, geospatial systems, and
            mobile interfaces — clarity over cleverness, end to end.
          </p>

          <div className="hero__actions">
            <SocialIcons links={socials} />
            <Link to="/projects" className="pill">
              View projects <span aria-hidden>›</span>
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <HeroSystems />
        </div>
      </section>

      <section className="latest">
        <h2 className="latest__heading">Latest projects</h2>
        <div className="latest__list">
          {latest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="latest__more">
          <Link to="/projects" className="text-link">
            See all projects →
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} · Created by {identity.name.split(' ')[0]}</p>
        <SocialIcons links={socials} />
      </footer>
    </div>
  )
}
