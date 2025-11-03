// src/pages/professor/AssignmentsManage.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createAssignment, getAssignmentsByCourse, updateAssignment } from '../../api/assignments.api'
import type { Assignment } from '../../api/types'
import AssignmentForm from '../../components/AssignmentForm'
import type { AssignmentFormValues } from '../../components/AssignmentForm'
import ProgressBar from '../../components/ProgressBar'

export default function AssignmentsManage() {
  const { courseId } = useParams()
  const [list, setList] = useState<Assignment[]>([])
  const [editing, setEditing] = useState<Assignment | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    if (!courseId) return
    setLoading(true)
    setList(await getAssignmentsByCourse(courseId))
    setLoading(false)
  }
  useEffect(() => { load() }, [courseId])

  const onCreate = async (v: AssignmentFormValues) => {
    if (!courseId) return
    setSaving(true)
    await createAssignment({ ...v, courseId, id: '', description: v.description, onedriveLink: v.onedriveLink, title: v.title, submissionType: v.submissionType, deadline: new Date(v.deadline).toISOString() } as any)
    setSaving(false)
    await load()
  }

  const onUpdate = async (v: AssignmentFormValues) => {
    if (!editing) return
    setSaving(true)
    await updateAssignment(editing.id, { ...v, deadline: new Date(v.deadline).toISOString() })
    setSaving(false)
    setEditing(null)
    await load()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-4">
        <h3 className="font-semibold mb-2">{editing ? 'Edit assignment' : 'Create assignment'}</h3>
        <AssignmentForm initial={editing ?? undefined} onSubmit={editing ? onUpdate : onCreate} submitting={saving} />
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold">Assignments</h3>
        {loading ? <p>Loading...</p> : list.length ? list.map(a => (
          <div key={a.id} className="card p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold">{a.title}</h4>
                <p className="text-sm text-gray-600">{a.description}</p>
                <p className="text-sm mt-1">Deadline: {new Date(a.deadline).toLocaleString()}</p>
                <a className="text-sm text-brand-600" href={a.onedriveLink} target="_blank" rel="noreferrer">OneDrive Link</a>
                <p className="text-xs text-gray-500 mt-1">Type: {a.submissionType}</p>
              </div>
              <button className="btn-outline" onClick={() => setEditing(a)}>Edit</button>
            </div>
            {a.stats && (
              <div className="mt-3">
                <ProgressBar total={a.stats.total} value={a.stats.acknowledged} />
                <p className="text-xs text-gray-600 mt-1">{a.stats.acknowledged}/{a.stats.total} acknowledged</p>
              </div>
            )}
          </div>
        )) : <p className="text-sm text-gray-600">No assignments yet.</p>}
      </div>
    </div>
  )
}
