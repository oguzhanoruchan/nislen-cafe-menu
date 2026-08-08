import type { UiText } from '../App'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  text: UiText
}

export function SearchBar({ value, onChange, text }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span>Arama</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={text.searchPlaceholder}
      />
    </label>
  )
}
