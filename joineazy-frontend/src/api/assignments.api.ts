// src/api/assignments.api.ts
import http from './http'
import type { Assignment } from './types'

export async function getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
  const { data } = await http.get(`/courses/${courseId}/assignments`)
  return data
}

export async function createAssignment(payload: Omit<Assignment, 'id' | 'stats'>): Promise<Assignment> {
  const { data } = await http.post(`/assignments`, payload)
  return data
}

export async function updateAssignment(id: string, payload: Partial<Assignment>): Promise<Assignment> {
  const { data } = await http.put(`/assignments/${id}`, payload)
  return data
}

export async function acknowledgeAssignment(assignmentId: string): Promise<{ ok: true }> {
  const { data } = await http.post(`/assignments/${assignmentId}/acknowledge`)
  return data
}
