// src/pages/student/AssignmentList.tsx
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAssignmentsByCourse, acknowledgeAssignment } from '../../api/assignments.api'
import { getMyGroup } from '../../api/groups.api'
import type { Assignment, Group } from '../../api/types'

export default function AssignmentList() {
  const { courseId } = useParams()
  const [list, setList] = useState<Assignment[]>([])
  const [group, setGroup] = useState<Group | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!courseId) return
    getAssignmentsByCourse(courseId).then(setList)
    getMyGroup(courseId).then(setGroup)
  }, [courseId])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return list.filter(a => [a.title, a.description].some(s => s.toLowerCase().includes(q)))
  }, [list, search])

  const canAcknowledge = (a: Assignment) => {
    if (a.submissionType === 'individual') return true
    if (!group) return false
    return group.leaderId ? true : false
  }

  const onAcknowledge = async (id: string) => {
    await acknowledgeAssignment(id)
    // naive refresh (in real app refetch acks)
    if (!courseId) return
    setList(await getAssignmentsByCourse(courseId))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <h2 className="text-lg font-semibold">Assignments</h2>
        <input className="input sm:w-64" placeholder="Search assignments..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {!group && (
        <div className="card p-3">
          <p className="text-sm">You are not part of any group. Form or join one to submit this assignment.</p>
        </div>
      )}
      <div className="grid gap-3">
        {filtered.map(a => (
          <div key={a.id} className="card p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold">{a.title}</h4>
                <p className="text-sm text-gray-600">{a.description}</p>
                <p className="text-sm mt-1">Deadline: {new Date(a.deadline).toLocaleString()}</p>
                <a className="text-sm text-brand-600" href={a.onedriveLink} target="_blank" rel="noreferrer">OneDrive Link</a>
                <p className="text-xs text-gray-500 mt-1">Type: {a.submissionType}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button className="btn-primary disabled:opacity-50" disabled={!canAcknowledge(a)} onClick={() => onAcknowledge(a.id)}>
                  {a.submissionType === 'individual' ? 'I have submitted' : group?.leaderId ? 'Leader: Acknowledge' : 'Only leader can acknowledge'}
                </button>
                {a.stats && (
                  <div className="w-48">
                    <div className="text-xs text-right">{a.stats.acknowledged}/{a.stats.total}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {!filtered.length && <p className="text-sm text-gray-600">No assignments found.</p>}
      </div>
    </div>
  )
}
