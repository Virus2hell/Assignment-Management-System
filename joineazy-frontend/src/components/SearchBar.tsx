// src/components/SearchBar.tsx
type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}
export default function SearchBar({ value, onChange, placeholder = 'Search...', className }: Props) {
  return (
    <input
      className={['input', className].filter(Boolean).join(' ')}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
