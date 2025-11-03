// src/layouts/AuthLayout.tsx
import { Outlet, Link } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md card p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-brand-600">Joineazy AMS</h1>
          <Link to="/login" className="text-sm text-brand-600">Login</Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
