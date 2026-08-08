type HeaderProps = {
  darkMode: boolean
  onToggleTheme: () => void
}

export function Header({ darkMode, onToggleTheme }: HeaderProps) {
  const label = darkMode ? 'Açık temaya geç' : 'Koyu temaya geç'

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-logo-wrap" aria-label="Nislen Cafe Menü">
          <img
            className="header-logo"
            src="/images/nislen-logo.png"
            alt="Nislen Cafe"
          />
        </div>
        <div className="header-actions">
          <button
            className={`theme-toggle ${darkMode ? 'is-dark' : ''}`}
            onClick={onToggleTheme}
            aria-label={label}
            title={label}
          >
            <span className="theme-toggle-icon" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  )
}
