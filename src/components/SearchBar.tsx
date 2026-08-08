type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span>Arama</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}
