// src/pages/professor/ProfessorDashboard.tsx
import { useEffect, useState } from 'react'
import { getMyCourses } from '../../api/courses.api'
import type { Course } from '../../api/types'
import { Link } from 'react-router-dom'

export default function ProfessorDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  useEffect(() => { getMyCourses().then(setCourses) }, [])
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Courses</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(c => (
          <div key={c.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{c.code}</p>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.semester}</p>
              </div>
              <span className="text-xs text-gray-500">{c.studentCount ?? 0} students</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Link className="btn-primary" to={`/professor/course/${c.id}/assignments`}>Manage assignments</Link>
            </div>
          </div>
        ))}
        {!courses.length && <p className="text-sm text-gray-600">No courses found.</p>}
      </div>
    </div>
  )
}
