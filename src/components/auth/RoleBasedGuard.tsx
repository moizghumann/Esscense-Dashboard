import { PropsWithChildren } from 'react'
import { Outlet } from 'react-router'
// CUSTOM DEFINED HOOK
import useAuth from '@/hooks/useAuth'
// CUSTOM COMPONENTS
import ErrorView from '@/page-sections/permission/ErrorView'

// ==============================================================
interface Props extends PropsWithChildren {
  roles: string[]
}
// ==============================================================

/**
 * RoleBasedGuard - PROTECTS ROUTES BASED ON USER ROLES
 * ONLY ALLOWS ACCESS IF THE USER'S ROLE IS INCLUDED IN THE PROVIDED ROLES ARRAY
 */

export default function RoleBasedGuard({ children, roles }: Props) {
  const { user } = useAuth()

  const userRole = user?.role
  const hasRequiredRole = userRole && roles.includes(userRole)

  if (hasRequiredRole) {
    return <>{children || <Outlet />}</>
  }

  return <ErrorView />
}
