// src/components/CourseCard.tsx
import type { Course } from '../api/types'
import { Link } from 'react-router-dom'

export default function CourseCard({ course, professor }: { course: Course; professor?: boolean }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{course.code}</p>
          <h3 className="font-semibold">{course.name}</h3>
          <p className="text-sm text-gray-500">{course.semester}</p>
        </div>
        {professor ? (
          <Link className="btn-primary" to={`/professor/course/${course.id}/assignments`}>Manage</Link>
        ) : (
          <Link className="btn-primary" to={`/course/${course.id}/assignments`}>View</Link>
        )}
      </div>
    </div>
  )
}
