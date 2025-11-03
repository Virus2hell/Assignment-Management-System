// src/api/courses.api.ts
import http from './http'
import type { Course } from './types'

export async function getMyCourses(): Promise<Course[]> {
  const { data } = await http.get('/courses/me')
  return data
}
