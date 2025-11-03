// src/api/types.ts
export type Role = 'student' | 'professor'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  token: string
}

export interface Course {
  id: string
  code: string
  name: string
  semester: string
  professorId: string
  studentCount?: number
}

export type SubmissionType = 'individual' | 'group'

export interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  deadline: string // ISO
  onedriveLink: string
  submissionType: SubmissionType
  stats?: {
    total: number
    acknowledged: number
  }
}

export interface Group {
  id: string
  courseId: string
  name: string
  leaderId: string
  memberIds: string[]
}

export interface Acknowledgement {
  id: string
  assignmentId: string
  userId: string
  groupId?: string
  timestamp: string // ISO
}
