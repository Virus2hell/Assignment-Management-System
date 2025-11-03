// src/store/auth.store.ts
import { create } from 'zustand'
import type { Role, User } from '../api/types'

type State = {
  user: Omit<User, 'token'> | null
  token: string | null
}
type Actions = {
  setAuth: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  token: null,
  setAuth: (u) =>
    set({
      user: { id: u.id, name: u.name, email: u.email, role: u.role },
      token: u.token
    }),
  logout: () => set({ user: null, token: null })
}))
