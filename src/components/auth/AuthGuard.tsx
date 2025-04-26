import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'
// CUSTOM DEFINED HOOK
import { useTheAuth } from '@/hooks/useTheAuth'

/**
 * AuthGuard - PROTECTS ROUTES THAT REQUIRE AUTHENTICATION
 * REDIRECTS UNAUTHENTICATED USERS TO THE LOGIN PAGE WITH THE CURRENT PATH SAVED
 */

export default function AuthGuard({ children }: PropsWithChildren) {
  const { pathname } = useLocation()
  const { isAuthenticated } = useTheAuth()

  if (isAuthenticated) return <>{children}</>

  return <Navigate replace to="/login" state={{ from: pathname }} />
}
