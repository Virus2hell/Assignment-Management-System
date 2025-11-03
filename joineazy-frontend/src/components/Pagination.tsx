// src/components/Pagination.tsx
type Props = {
  page: number
  pageSize: number
  total: number
  onPageChange: (p: number) => void
}

export default function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const canPrev = page > 1
  const canNext = page < pages

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-gray-600">
        Page {page} of {pages}
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-outline disabled:opacity-50" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>Prev</button>
        <button className="btn-outline disabled:opacity-50" disabled={!canNext} onClick={() => onPageChange(page + 1)}>Next</button>
      </div>
    </div>
  )
}
