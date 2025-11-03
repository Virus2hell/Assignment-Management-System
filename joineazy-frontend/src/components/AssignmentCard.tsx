// src/components/AssignmentCard.tsx
import type { Assignment } from '../api/types'
import ProgressBar from './ProgressBar'

type Props = {
  assignment: Assignment
  right?: React.ReactNode
}

export default function AssignmentCard({ assignment, right }: Props) {
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold">{assignment.title}</h4>
          <p className="text-sm text-gray-600">{assignment.description}</p>
          <p className="text-sm mt-1">Deadline: {new Date(assignment.deadline).toLocaleString()}</p>
          <a className="text-sm text-brand-600" href={assignment.onedriveLink} target="_blank" rel="noreferrer">OneDrive Link</a>
          <p className="text-xs text-gray-500 mt-1">Type: {assignment.submissionType}</p>
        </div>
        {right}
      </div>
      {assignment.stats && (
        <div className="mt-3">
          <ProgressBar total={assignment.stats.total} value={assignment.stats.acknowledged} />
          <p className="text-xs text-gray-600 mt-1">{assignment.stats.acknowledged}/{assignment.stats.total} acknowledged</p>
        </div>
      )}
    </div>
  )
}
