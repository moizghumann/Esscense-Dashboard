import { lazy } from 'react'
import { RouteObject } from 'react-router'
import { AuthRoutes } from './auth'
import { PublicRoutes } from './public'
import { DashboardRoutes } from './dashboard'
import { ComponentRoutes } from './components'

// GLOBAL ERROR PAGE
const ErrorPage = lazy(() => import('@/pages/404'))
// LANDING / INITIAL PAGE
const Landing = lazy(() => import('@/pages/landing'))

export const routes = (): RouteObject[] => {
  return [
    // INITIAL / INDEX PAGE
    { path: '/', element: <Landing /> },

    // GLOBAL ERROR PAGE
    { path: '*', element: <ErrorPage /> },

    // AUTHENTICATION PAGES ROUTES & DIFFERENT AUTH DEMO PAGES ROUTES
    ...AuthRoutes,

    // COMPONENTS PAGES ROUTES
    ...ComponentRoutes,

    // INSIDE DASHBOARD PAGES ROUTES
    ...DashboardRoutes,

    // PAGES ROUTES
    ...PublicRoutes,
  ]
}
