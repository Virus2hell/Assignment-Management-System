// src/api/groups.api.ts
import http from './http'
import type { Group } from './types'

export async function getMyGroup(courseId: string): Promise<Group | null> {
  const { data } = await http.get(`/courses/${courseId}/group`)
  return data
}
