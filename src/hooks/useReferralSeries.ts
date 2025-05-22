import { useSupabase } from '@/providers/supabase'
import { useQuery } from '@tanstack/react-query'

export interface IReferralSeries {
  data_idx: number
  value: number
}

export function useReferralSeries() {
  const supabase = useSupabase()

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['referral_series'],
    queryFn: async (): Promise<IReferralSeries[]> => {
      const { data, error } = await supabase
        .from('referral_data')
        .select('data_idx, value')
        .order('data_idx', { ascending: true })

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
