import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/providers/supabase'

export interface IMonthlySales {
  month_idx: number
  month_name: string
  sales_amount: number
}

export function useMonthlySales() {
  const supabase = useSupabase()

  const { data, error, isLoading } = useQuery({
    queryKey: ['monthly_sales'],
    queryFn: async (): Promise<IMonthlySales[]> => {
      const { data, error } = await supabase
        .from('monthly_sales')
        .select('month_idx, month_name, sales_amount')
        .order('month_idx', { ascending: true })

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
