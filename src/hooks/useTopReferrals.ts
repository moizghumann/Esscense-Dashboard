import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface ITopReferral {
  id: number
  title: string
  category: string
  rate: number
  visit: number
}

export function useTopReferrals() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<ITopReferral[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('top_referrals')
        .select('id, title, category, rate, visit')
        .order('rate', { ascending: false })

      if (error) {
        console.error('Fetch top referrals error:', error)
        setError(error.message)
      } else {
        setData(rows ?? [])
      }
      setLoading(false)
    }

    load()
  }, [])

  return { data, error, loading }
}
