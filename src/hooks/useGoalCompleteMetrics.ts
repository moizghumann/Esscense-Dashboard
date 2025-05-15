import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface IGoalCompleteMetric {
  id: number
  rate: number
  percentage: number
}

export function useGoalCompleteMetrics() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<IGoalCompleteMetric[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('goal_complete_metrics')
        .select('id, rate, percentage')
        .order('id', { ascending: true })

      if (error) {
        console.error('Fetch goal complete metrics error:', error)
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
