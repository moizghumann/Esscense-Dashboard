import { useSupabase } from '@/providers/supabase'
import { useQuery } from '@tanstack/react-query'

export interface ITopReferral {
  id: number
  title: string
  category: string
  rate: number
  visit: number
}

export function useTopReferrals() {
  const supabase = useSupabase()

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['top_referrals'],
    queryFn: async (): Promise<ITopReferral[]> => {
      const { data, error } = await supabase
        .from('top_referrals')
        .select('id, title, category, rate, visit')
        .order('rate', { ascending: false })

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
