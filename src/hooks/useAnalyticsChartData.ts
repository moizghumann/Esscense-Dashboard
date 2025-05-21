import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface IAnalyticsChartData {
  created_at: string
  display_title: string
  duration_value: string
  id: number
  key_name: string
  numeric_value: number
  percentage_delta: number
}

export function useChartData() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<IAnalyticsChartData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('chart_data')
        .select('*') // now permitted by your RLS policy!

      if (error) {
        console.error('Fetch error:', error)
        setError(error.message)
      } else {
        setData(rows!)
      }
      setLoading(false)
    }
    load()
  }, [])

  return { data, error, loading }
}
