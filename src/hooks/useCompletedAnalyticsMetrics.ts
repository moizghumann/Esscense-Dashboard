// src/features/analytics/useCompletedAnalyticsMetrics.ts
import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/providers/supabase'

export interface ICompletedMetric {
  id: number
  completed_goals: number
  percentage: number
}

export function useCompletedAnalyticsMetrics() {
  const supabase = useSupabase()

  // 🔸 Declarative data-fetch definition
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['completed_metrics'],
    queryFn: async (): Promise<ICompletedMetric[]> => {
      const { data, error } = await supabase
        .from('completed_metrics')
        .select('id, completed_goals, percentage')
        .order('id', { ascending: true })

      if (error) throw error
      return data ?? []
    },

    placeholderData: [], // instant UI (no flash of `undefined`)
  })

  return { data, error, isLoading }
}
