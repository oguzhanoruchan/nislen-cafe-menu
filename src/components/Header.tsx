import type { ReactNode } from 'react'

type HeaderProps = {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="header-search">{children}</div>
      </div>
    </header>
  )
}
