// src/api/auth.api.ts
import http from './http'
import type { Role, User } from './types'

export async function login(email: string, password: string): Promise<User> {
  const { data } = await http.post('/auth/login', { email, password })
  return data
}

export async function register(name: string, email: string, password: string, role: Role): Promise<User> {
  const { data } = await http.post('/auth/register', { name, email, password, role })
  return data
}
