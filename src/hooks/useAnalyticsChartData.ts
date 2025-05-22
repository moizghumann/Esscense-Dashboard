// src/features/analytics/useChartData.ts
import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/providers/supabase'

export interface IAnalyticsChartData {
  id: number
  key_name: string
  display_title: string
  numeric_value: number
  percentage_delta: number
  duration_value: string
  created_at: string
}

export function useChartData() {
  const supabase = useSupabase()

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['analytics_chart_data'],
    queryFn: async (): Promise<IAnalyticsChartData[]> => {
      const { data, error } = await supabase
        .from('chart_data')
        .select('*')
        .order('created_at', { ascending: true }) // optional: predictable order

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
