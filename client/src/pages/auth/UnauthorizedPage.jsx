import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { AuthFooter } from '../../components/auth/AuthFooter'

export default function UnauthorizedPage() {
  return (
    <AuthLayout title="Access denied" description="You need an active session to view this page." footer={
      <AuthFooter>
        <Link to="/login" className="font-medium text-violet-300 transition hover:text-white">Go to sign in</Link>
      </AuthFooter>
    }>
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-300">
        <div className="flex items-center gap-2 font-medium">
          <ShieldAlert className="h-4 w-4" />
          This area requires authentication.
        </div>
        <p className="mt-2 text-amber-200/80">Sign in to continue to your workspace or return to the landing page.</p>
      </div>
    </AuthLayout>
  )
}
