// src/components/Badge.tsx
import { cn } from '../utils/cn'

type Props = {
  children: React.ReactNode
  color: 'gray' | 'green' | 'blue' | 'red' | 'yellow'
  className?: string
}

export default function Badge({ children, color = 'gray', className }: Props) {
  const map: Record<Props['color'], string> = {
    gray: 'bg-gray-100 text-gray-700 ring-gray-200',
    green: 'bg-green-100 text-green-700 ring-green-200',
    blue: 'bg-blue-100 text-blue-700 ring-blue-200',
    red: 'bg-red-100 text-red-700 ring-red-200',
    yellow: 'bg-yellow-100 text-yellow-800 ring-yellow-200'
  }
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1', map[color], className)}>
      {children}
    </span>
  )
}
