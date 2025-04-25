import { PropsWithChildren } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
// CUSTOM DEFINED HOOK
import useAuth from '@/hooks/useAuth'

/**
 * GuestGuard - PREVENTS AUTHENTICATED USERS FROM ACCESSING GUEST-ONLY ROUTES
 * REDIRECTS AUTHENTICATED USERS TO THEIR PREVIOUS LOCATION OR /DASHBOARD
 */

export default function GuestGuard({ children }: PropsWithChildren) {
  const { state } = useLocation()
  const { isAuthenticated } = useAuth()

  const locationState = state as { from?: string }
  const redirectPath = locationState?.from || '/dashboard'

  if (isAuthenticated) {
    return <Navigate replace to={redirectPath} />
  }

  return children || <Outlet />
}
