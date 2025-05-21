import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface ICompletedMetric {
  id: number
  completed_goals: number
  percentage: number
}

export function useCompletedAnalyticsMetrics() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<ICompletedMetric[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!supabase) return
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase
        .from('completed_metrics')
        .select('id, completed_goals, percentage')
        .order('id', { ascending: true })

      if (error) {
        console.error('Fetch completed metrics error:', error)
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
