import { useSupabase } from '@/providers/supabase'
import { useQuery } from '@tanstack/react-query'

export interface ITopPerformingSite {
  id: number
  page: string
  click: number
  views: string
  click2: number
}

export function useTopPerformingSites() {
  const supabase = useSupabase()

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['top_performing_sites'],
    queryFn: async (): Promise<ITopPerformingSite[]> => {
      const { data, error } = await supabase
        .from('top_performing_sites')
        .select('id, page, click, views, click2')
        .order('click', { ascending: false })

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
