// src/pages/auth/Register.tsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { register as registerApi } from '../../api/auth.api'
import { useAuthStore } from '../../store/auth.store'
import { useNavigate } from 'react-router-dom'
import { isProfessor } from '../../utils/roles'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'professor'])
})
type Values = z.infer<typeof schema>

export default function Register() {
  const { register: rf, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) })
  const setAuth = useAuthStore((s) => s.setAuth)
  const nav = useNavigate()

  const onSubmit = async (v: Values) => {
    const u = await registerApi(v.name, v.email, v.password, v.role)
    setAuth(u)
    nav(isProfessor(u.role) ? '/professor' : '/', { replace: true })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">Full name</label>
        <input className="input" {...rf('name')} />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="label">Email</label>
        <input className="input" {...rf('email')} />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="label">Password</label>
        <input type="password" className="input" {...rf('password')} />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>
      <div>
        <label className="label">Role</label>
        <select className="input" {...rf('role')}>
          <option value="student">Student</option>
          <option value="professor">Professor</option>
        </select>
      </div>
      <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create account'}</button>
    </form>
  )
}
