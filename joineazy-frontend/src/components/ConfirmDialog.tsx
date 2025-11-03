// src/components/ConfirmDialog.tsx
import { useEffect } from 'react'

type Props = {
  open: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel
}: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-sm card p-4">
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="btn-outline" onClick={onCancel}>{cancelText}</button>
          <button className="btn-primary" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
