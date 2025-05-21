import { createBrowserRouter, RouterProvider } from 'react-router'
// MUI
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// AUTH CONTEXT FILE
import { AuthProvider } from '@/contexts/firebaseContext'
// RIGHT-TO-LEFT SUPPORT COMPONENT
import RTL from '@/components/rtl'
// ROUTES METHOD
import { routes } from './routes'
// MUI THEME CREATION METHOD
import { createCustomTheme } from './theme'
// SITE SETTINGS CUSTOM DEFINED HOOK
import useSettings from '@/hooks/useSettings'
// I18N FILE
import './i18n'

// CLERK
import { ClerkProvider } from '@clerk/clerk-react'
import SupabaseProvider from '@/providers/supabase'
import { NotificationsProvider } from '@toolpad/core/useNotifications'
import { queryClient } from '@/providers/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function App() {
  // SITE SETTINGS CUSTOM DEFINED HOOK
  const { settings } = useSettings()

  // MUI THEME CREATION
  const theme = createCustomTheme(settings)

  // ROUTER CREATE
  const router = createBrowserRouter(routes())

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <SupabaseProvider>
            <QueryClientProvider client={queryClient}>
              <NotificationsProvider
                slotProps={{
                  snackbar: {
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  },
                }}
              >
                <RTL>
                  <CssBaseline />
                  <RouterProvider router={router} />
                </RTL>
              </NotificationsProvider>
              <ReactQueryDevtools position="right" initialIsOpen={false} />
            </QueryClientProvider>
          </SupabaseProvider>
        </ClerkProvider>
      </ThemeProvider>
    </LocalizationProvider>
  )
}
