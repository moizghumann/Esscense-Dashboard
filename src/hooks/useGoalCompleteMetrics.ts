// src/features/analytics/useGoalCompleteMetrics.ts
import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/providers/supabase'

export interface IGoalCompleteMetric {
  id: number
  rate: number
  percentage: number
}

export function useGoalCompleteMetrics() {
  const supabase = useSupabase()

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['goal_complete_metrics'],
    queryFn: async (): Promise<IGoalCompleteMetric[]> => {
      const { data, error } = await supabase
        .from('goal_complete_metrics')
        .select('id, rate, percentage')
        .order('id', { ascending: true })

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
