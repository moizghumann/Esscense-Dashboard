import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface IBrowser {
  id: number
  title: string
  value: number
  percentage: number
  color: string
  image?: string
}

export function useBrowserSession() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<IBrowser[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('browsers')
        .select('id, title, value, percentage, color')
        .order('percentage', { ascending: false })

      if (error) {
        console.error('Fetch browsers error:', error)
        setError(error.message)
      } else {
        setData(rows ?? [])
      }
      setLoading(false)
    }

    load()
  }, [supabase])

  return { data, error, loading }
}
