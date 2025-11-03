// src/pages/auth/Login.tsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '../../api/auth.api'
import { useAuthStore } from '../../store/auth.store'
import { useNavigate, useLocation } from 'react-router-dom'
import { isProfessor } from '../../utils/roles'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
type Values = z.infer<typeof schema>

export default function Login() {
  const { register: rf, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) })
  const setAuth = useAuthStore((s) => s.setAuth)
  const user = useAuthStore((s) => s.user)
  const nav = useNavigate()
  const loc = useLocation()

  const onSubmit = async (v: Values) => {
    const u = await login(v.email, v.password)
    setAuth(u)
    const dest = isProfessor(u.role) ? '/professor' : '/'
    const back = (loc.state as any)?.from?.pathname
    nav(back ?? dest, { replace: true })
  }

  if (user) nav('/', { replace: true })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">Email</label>
        <input className="input" {...rf('email')} placeholder="you@college.edu" />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="label">Password</label>
        <input type="password" className="input" {...rf('password')} />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>
      <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'}</button>
      <p className="text-sm text-gray-600">New user? <a className="text-brand-600" href="/register">Create account</a></p>
    </form>
  )
}
