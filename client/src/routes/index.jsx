import { lazy } from 'react'
import { publicRoutes, authRoutes, protectedRoutes } from './routes.config'

const LandingPage = lazy(() => import('../pages/LandingPage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'))
const EmailVerificationPage = lazy(() => import('../pages/auth/EmailVerificationPage'))
const AuthCallbackPage = lazy(() => import('../pages/auth/AuthCallbackPage'))
const UnauthorizedPage = lazy(() => import('../pages/auth/UnauthorizedPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const MemoryPage = lazy(() => import('../pages/DeveloperMemoryPage'))
const BugsPage = lazy(() => import('../pages/BugVaultPage'))
const WorkspacePage = lazy(() => import('../pages/AIWorkspacePage'))
const KnowledgeBasePage = lazy(() => import('../pages/KnowledgeBasePage'))
const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const pageMap = {
  landing: LandingPage,
  login: LoginPage,
  register: RegisterPage,
  forgotPassword: ForgotPasswordPage,
  resetPassword: ResetPasswordPage,
  emailVerification: EmailVerificationPage,
  authCallback: AuthCallbackPage,
  unauthorized: UnauthorizedPage,
  dashboard: DashboardPage,
  projects: ProjectsPage,
  developerMemory: MemoryPage,
  bugVault: BugsPage,
  aiWorkspace: WorkspacePage,
  knowledgeBase: KnowledgeBasePage,
  analytics: AnalyticsPage,
  settings: SettingsPage,
  profile: ProfilePage,
  notFound: NotFoundPage,
}

const buildRoutes = (routeConfigs) =>
  routeConfigs.map(({ path, name, layout: Layout, protected: isProtected, guard }) => {
    const Element = pageMap[name]
    return {
      path,
      layout: Layout,
      protected: isProtected,
      guard,
      element: Element,
    }
  })

export const routes = [...buildRoutes(publicRoutes), ...buildRoutes(authRoutes), ...buildRoutes(protectedRoutes)]
