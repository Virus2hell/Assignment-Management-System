// src/components/EmptyState.tsx
type Props = {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: Props) {
  return (
    <div className="card p-6 text-center">
      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-gray-100 grid place-items-center">
        <span className="text-xl">🙂</span>
      </div>
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  )
}
