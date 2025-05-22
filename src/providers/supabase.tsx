import { useSession } from '@clerk/clerk-react'
import { useState } from 'react'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'

interface Props {
  children: React.ReactNode
}

interface SupabaseContext {
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
    if (!session) {
      setSupabase(null)
      setIsLoaded(false)
      return
    }

    const client = createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_KEY!,
      { accessToken: () => session.getToken() }
    )
    setSupabase(client)
    setIsLoaded(true)
  }, [session])

  // **Only render children once supabase is ready:**
  // if (!isLoaded) {
  //   return null // or null, whatever your app needs
  // }

  return (
    <Context.Provider value={{ supabase: supabase!, isLoaded }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  if (!context.supabase) throw new Error('Supabase instance is not valid')
  return {
    supabase: context.supabase,
    isLoaded: context.isLoaded,
  }
}
