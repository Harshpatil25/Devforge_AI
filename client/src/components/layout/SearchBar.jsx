import { Search } from 'lucide-react'

export function SearchBar({ value, onChange, placeholder = 'Search projects, bugs, notes...' }) {
  return (
    <label className="search-bar">
      <Search size={16} />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Global search"
      />
    </label>
  )
}
