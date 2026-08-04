import type { ReactNode } from 'react'
import type { socials } from '../data/content'

type Icon = (typeof socials)[number]['icon']

const paths: Record<Icon, ReactNode> = {
  github: (
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85.01 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.48A10.16 10.16 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  ),
  linkedin: (
    <path d="M6.94 8.5H3.75V20h3.19V8.5ZM5.34 7.1a1.85 1.85 0 1 0 0-3.7 1.85 1.85 0 0 0 0 3.7ZM20.25 20h-3.18v-5.6c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94V20H9.9V8.5h3.05v1.57h.04c.42-.8 1.46-1.65 3-1.65 3.21 0 3.8 2.11 3.8 4.86V20Z" />
  ),
  email: (
    <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm8 6.5L19.5 8H4.5L12 12.5Zm0 1.4L4.5 9.4V17h15V9.4L12 13.9Z" />
  ),
}

export function SocialIcons({ links }: { links: typeof socials }) {
  return (
    <div className="socials">
      {links.map((s) => (
        <a
          key={s.label}
          href={s.href}
          className="socials__btn"
          target={s.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={s.href.startsWith('mailto:') ? undefined : 'noreferrer'}
          aria-label={s.label}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
            {paths[s.icon]}
          </svg>
        </a>
      ))}
    </div>
  )
}
