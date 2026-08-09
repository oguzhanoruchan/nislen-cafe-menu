import type { ReactNode } from 'react'

type HeaderProps = {
  children: ReactNode
  darkMode: boolean
  onToggleTheme: () => void
}

export function Header({ children, darkMode, onToggleTheme }: HeaderProps) {
  const label = darkMode ? 'Açık temaya geç' : 'Koyu temaya geç'

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-search">{children}</div>
        <button
          className="theme-toggle"
          aria-label={label}
          title={label}
          onClick={onToggleTheme}
        >
          <span className="theme-toggle-icon" aria-hidden>
            {darkMode ? '☀' : '☾'}
          </span>
        </button>
      </div>
    </header>
  )
}
