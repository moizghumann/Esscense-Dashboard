import { ReactNode, useEffect } from 'react'
import { useSession } from '@clerk/clerk-react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient
let _getToken: () => Promise<string | null> = async () => null

/**
 * Call this once, at app startup, to get your singleton client.
 * Subsequent calls will get you the same instance.
 */
export function getSupabaseClient() {
  if (!supabase) {
    supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_KEY!,
      {
        auth: { persistSession: false },
        global: {
          fetch: async (input, init = {}) => {
            const token = await _getToken()
            const headers = new Headers(init.headers)
            if (token) headers.set('Authorization', `Bearer ${token}`)
            return fetch(input, { ...init, headers })
          },
        },
      }
    )
  }
  return supabase
}

/**
 * Whenever your session changes, call this to update
 * how the client fetches its token.
 */
export function setTokenFetcher(fn: () => Promise<string | null>) {
  _getToken = fn
}

interface Props {
  children: ReactNode
}

export default function SupabaseProvider({ children }: Props) {
  const { session } = useSession()

  // whenever Clerk's session object changes, give our client a new fetcher
  useEffect(() => {
    setTokenFetcher(async () => (session ? await session.getToken() : null))
  }, [session])

  return <>{children}</>
}

export function useSupabase() {
  return getSupabaseClient()
}
