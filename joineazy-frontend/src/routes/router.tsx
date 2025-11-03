// src/routes/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ProfessorDashboard from '../pages/professor/ProfessorDashboard'
import AssignmentsManage from '../pages/professor/AssignmentsManage'
import StudentDashboard from '../pages/student/StudentDashboard'
import AssignmentList from '../pages/student/AssignmentList'
import RequireAuth from './guards/RequireAuth'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> }
    ]
  },
  {
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <StudentDashboard /> },
      { path: '/professor', element: <ProfessorDashboard /> },
      { path: '/course/:courseId/assignments', element: <AssignmentList /> },
      { path: '/professor/course/:courseId/assignments', element: <AssignmentsManage /> }
    ]
  }
])
