import type { Language, UiText } from '../App'

type HeaderProps = {
  language: Language
  text: UiText
  darkMode: boolean
  onToggleTheme: () => void
  onCycleLanguage: () => void
}

export function Header({
  language,
  text,
  darkMode,
  onToggleTheme,
  onCycleLanguage
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
          <button className="pill-button" onClick={onCycleLanguage}>
            {language.toUpperCase()}
          </button>
          <button className="pill-button" onClick={onToggleTheme}>
            {darkMode ? text.light : text.dark}
          </button>
        </div>
      </div>
    </header>
  )
}
