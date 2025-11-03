// src/components/ProgressBar.tsx
export default function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
      <div className="h-full bg-brand-600 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
