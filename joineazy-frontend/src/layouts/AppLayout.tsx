// src/layouts/AppLayout.tsx
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'
import { isProfessor } from '../utils/roles'

export default function AppLayout() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const nav = useNavigate()
  const handleLogout = () => {
    logout()
    nav('/login')
  }
  return (
    <div>
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between py-3">
          <Link to="/" className="text-lg font-semibold text-brand-600">Joineazy AMS</Link>
          <nav className="flex items-center gap-4">
            {isProfessor(user?.role) ? <Link to="/professor" className="text-sm">Professor</Link> : <Link to="/" className="text-sm">Student</Link>}
            <button className="btn-outline" onClick={handleLogout}>Logout</button>
          </nav>
        </div>
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
}
