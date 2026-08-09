import type { ReactNode } from 'react'

type HeaderProps = {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-inner">
        <img
          className="header-logo"
          src="/images/nislen-logo.png"
          alt="Nislen Cafe"
        />
        <div className="header-search">{children}</div>
        <button className="menu-toggle" aria-label="Menü seçenekleri">
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
        </button>
      </div>
    </header>
  )
}
