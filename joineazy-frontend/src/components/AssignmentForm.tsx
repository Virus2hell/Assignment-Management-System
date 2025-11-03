// src/components/AssignmentForm.tsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmissionType } from '../api/types'

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  deadline: z.string(),
  onedriveLink: z.string().url(),
  submissionType: z.enum(['individual', 'group'])
})
export type AssignmentFormValues = z.infer<typeof schema>

export default function AssignmentForm({ initial, onSubmit, submitting }: {
  initial?: Partial<AssignmentFormValues>
  onSubmit: (v: AssignmentFormValues) => void | Promise<void>
  submitting?: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<AssignmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initial?.title ?? '',
      description: initial?.description ?? '',
      deadline: initial?.deadline ?? '',
      onedriveLink: initial?.onedriveLink ?? '',
      submissionType: (initial?.submissionType as SubmissionType) ?? 'individual'
    }
  })
  return (
    <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">Title</label>
        <input className="input" {...register('title')} />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label className="label">Description</label>
        <textarea className="input" rows={4} {...register('description')} />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label">Deadline</label>
          <input type="datetime-local" className="input" {...register('deadline')} />
        </div>
        <div>
          <label className="label">OneDrive Link</label>
          <input className="input" placeholder="https://onedrive.live.com/..." {...register('onedriveLink')} />
        </div>
      </div>
      <div>
        <label className="label">Submission Type</label>
        <select className="input" {...register('submissionType')}>
          <option value="individual">Individual</option>
          <option value="group">Group</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</button>
        <button className="btn-outline" type="reset">Reset</button>
      </div>
    </form>
  )
}
