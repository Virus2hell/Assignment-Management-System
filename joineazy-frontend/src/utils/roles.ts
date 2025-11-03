// src/utils/roles.ts
import type { Role } from '../api/types'
export const isProfessor = (r?: Role) => r === 'professor'
export const isStudent = (r?: Role) => r === 'student'
