import { useSession } from '@clerk/clerk-react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

type SupabaseContext = {
  supabase: SupabaseClient | null
  isLoaded: boolean
}

const Context = createContext<SupabaseContext>({
  supabase: null,
  isLoaded: false,
})

export default function SupabaseProvider({ children }: Props) {
  const { session } = useSession()
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!session) return
    const client = createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_KEY!,
      {
        accessToken: () => session?.getToken(),
      }
    )
    setSupabase(client)
    setIsLoaded(true)
  }, [session])

  return (
    <Context.Provider value={{ supabase, isLoaded }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return {
    supabase: context.supabase,
    isLoaded: context.isLoaded,
  }
}
