// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import type { Assignment, Course, User } from '../api/types'

let currentUser: User | null = null

const mockCourses: Course[] = [
  { id: 'c1', code: 'CS301', name: 'Algorithms', semester: 'Sem 5', professorId: 'p1', studentCount: 45 },
  { id: 'c2', code: 'CS305', name: 'DBMS', semester: 'Sem 5', professorId: 'p1', studentCount: 44 }
]

let assignments: Assignment[] = [
  { id: 'a1', courseId: 'c1', title: 'HW1', description: 'Solve problems', deadline: new Date().toISOString(), onedriveLink: 'https://onedrive.live.com/1', submissionType: 'individual', stats: { total: 45, acknowledged: 12 } },
  { id: 'a2', courseId: 'c1', title: 'Project', description: 'Group project', deadline: new Date().toISOString(), onedriveLink: 'https://onedrive.live.com/2', submissionType: 'group', stats: { total: 10, acknowledged: 4 } }
]

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as any
    const role = body.email.includes('prof') ? 'professor' : 'student'
    currentUser = { id: role === 'professor' ? 'p1' : 's1', name: 'Test User', email: body.email, role, token: 'mock-token' }
    return HttpResponse.json(currentUser)
  }),
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as any
    currentUser = { id: body.role === 'professor' ? 'p1' : 's1', name: body.name, email: body.email, role: body.role, token: 'mock-token' }
    return HttpResponse.json(currentUser)
  }),
  http.get('/api/courses/me', () => {
    if (currentUser?.role === 'professor') return HttpResponse.json(mockCourses)
    return HttpResponse.json(mockCourses.map(c => ({ ...c, professorId: undefined as any })))
  }),
  http.get('/api/courses/:courseId/assignments', ({ params }) => {
    const { courseId } = params as any
    return HttpResponse.json(assignments.filter(a => a.courseId === courseId))
  }),
  http.post('/api/assignments', async ({ request }) => {
    const body = await request.json() as any
    const a: Assignment = { ...body, id: `a${assignments.length + 1}`, stats: body.submissionType === 'individual' ? { total: 45, acknowledged: 0 } : { total: 10, acknowledged: 0 } }
    assignments.unshift(a)
    return HttpResponse.json(a)
  }),
  http.put('/api/assignments/:id', async ({ params, request }) => {
    const { id } = params as any
    const body = await request.json() as Partial<Assignment>
    assignments = assignments.map(a => a.id === id ? { ...a, ...body } : a)
    const updated = assignments.find(a => a.id === id)!
    return HttpResponse.json(updated)
  }),
  http.post('/api/assignments/:id/acknowledge', ({ params }) => {
    const { id } = params as any
    assignments = assignments.map(a => {
      if (a.id !== id || !a.stats) return a
      return { ...a, stats: { ...a.stats, acknowledged: Math.min(a.stats.acknowledged + 1, a.stats.total) } }
    })
    return HttpResponse.json({ ok: true })
  }),
  http.get('/api/courses/:courseId/group', ({ params }) => {
    const { courseId } = params as any
    if (currentUser?.role === 'student') {
      // return a group only for c1 and leader is s1
      if (courseId === 'c1') return HttpResponse.json({ id: 'g1', courseId: 'c1', name: 'Team A', leaderId: 's1', memberIds: ['s1', 's2'] })
      return HttpResponse.json(null)
    }
    return HttpResponse.json(null)
  })
]
