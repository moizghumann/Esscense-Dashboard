import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface ITopQuery {
  id: number
  keyword: string
  click: number
  value: number
}

export function useTopQueries() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<ITopQuery[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('top_queries')
        .select('id, keyword, click, value')
        .order('click', { ascending: false })

      if (error) {
        console.error('Fetch top queries error:', error)
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
