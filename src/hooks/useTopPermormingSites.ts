import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface ITopPerformingSite {
  id: number
  page: string
  click: number
  views: string
  click2: number
}

export function useTopPerformingSites() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<ITopPerformingSite[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('top_performing_sites')
        .select('id, page, click, views, click2')
        .order('click', { ascending: false })

      if (error) {
        console.error('Fetch top performing sites error:', error)
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
