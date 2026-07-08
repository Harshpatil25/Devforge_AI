import { AppLayout } from '../layouts/AppLayout'
import { AuthLayout } from '../layouts/AuthLayout'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { GuestRoute } from '../components/auth/GuestRoute'

export const publicRoutes = [
  { path: '/', name: 'landing', layout: null, protected: false, guard: null },
  { path: '/auth/callback', name: 'authCallback', layout: null, protected: false, guard: null },
  { path: '/unauthorized', name: 'unauthorized', layout: null, protected: false, guard: null },
]

export const authRoutes = [
  { path: '/login', name: 'login', layout: AuthLayout, protected: false, guard: 'guest' },
  { path: '/register', name: 'register', layout: AuthLayout, protected: false, guard: 'guest' },
  { path: '/forgot-password', name: 'forgotPassword', layout: AuthLayout, protected: false, guard: 'guest' },
  { path: '/reset-password', name: 'resetPassword', layout: AuthLayout, protected: false, guard: 'guest' },
  { path: '/verify-email', name: 'emailVerification', layout: AuthLayout, protected: false, guard: 'guest' },
]

export const protectedRoutes = [
  { path: '/dashboard', name: 'dashboard', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/projects', name: 'projects', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/developer-memory', name: 'developerMemory', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/bug-vault', name: 'bugVault', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/ai-workspace', name: 'aiWorkspace', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/knowledge-base', name: 'knowledgeBase', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/analytics', name: 'analytics', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/settings', name: 'settings', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '/profile', name: 'profile', layout: AppLayout, protected: true, guard: 'protected' },
  { path: '*', name: 'notFound', layout: null, protected: false, guard: null },
]

export const routeGuards = {
  guest: GuestRoute,
  protected: ProtectedRoute,
}
