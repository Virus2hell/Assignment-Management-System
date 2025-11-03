// src/components/Toast.tsx
import { Toaster, toast } from 'sonner'

export function notifySuccess(msg: string) {
  toast.success(msg)
}
export function notifyError(msg: string) {
  toast.error(msg)
}

export default function Toast() {
  return <Toaster position="top-right" richColors />
}
