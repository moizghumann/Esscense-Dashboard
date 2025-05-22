// src/providers/SupabaseProvider.tsx
import { createContext, useContext, useMemo, ReactNode } from 'react'
import { useSession } from '@clerk/clerk-react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

interface Props {
  children: ReactNode
}

const Context = createContext<SupabaseClient | null>(null)

export default function SupabaseProvider({ children }: Props) {
  const { session } = useSession()

  // Re-create client on session change so our fetch wrapper always sees the latest session
  const supabase = useMemo(() => {
    return createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_KEY!,
      {
        // turn off Supabase's built-in localStorage handling
        auth: { persistSession: false },

        // every request goes through here
        global: {
          fetch: async (input, init = {}) => {
            // fetch a fresh token on each call
            const token = session ? await session.getToken() : null
            const headers = new Headers(init.headers)
            if (token) headers.set('Authorization', `Bearer ${token}`)
            return fetch(input, { ...init, headers })
          },
        },
      }
    )
  }, [session])

  return <Context.Provider value={supabase}>{children}</Context.Provider>
}

export function useSupabase() {
  const supabase = useContext(Context)
  if (!supabase) {
    throw new Error('useSupabase must be inside SupabaseProvider')
  }
  return supabase
}
