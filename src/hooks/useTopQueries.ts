import { useSupabase } from '@/providers/supabase'
import { useQuery } from '@tanstack/react-query'

export interface ITopQuery {
  id: number
  keyword: string
  click: number
  value: number
}

export function useTopQueries() {
  const supabase = useSupabase()

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['top_queries'],
    queryFn: async (): Promise<ITopQuery[]> => {
      const { data, error } = await supabase
        .from('top_queries')
        .select('id, keyword, click, value')
        .order('click', { ascending: false })

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
