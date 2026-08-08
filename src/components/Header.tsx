type HeaderProps = {
  darkMode: boolean
  onToggleTheme: () => void
}

export function Header({
  darkMode,
  onToggleTheme
}: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-inner">
        <img
          className="header-logo"
          src="/images/nislen-logo.png"
          alt="Nislen Cafe"
        />
        <div className="header-actions">
          <button className="pill-button" onClick={onToggleTheme}>
            {darkMode ? 'Açık Tema' : 'Koyu Tema'}
          </button>
        </div>
      </div>
    </header>
  )
}
