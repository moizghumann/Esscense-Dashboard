import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface IMonthlySales {
  month_idx: number
  month_name: string
  sales_amount: number
}

export function useMonthlySales() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<IMonthlySales[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('monthly_sales')
        .select('month_idx, month_name, sales_amount')
        .order('month_idx', { ascending: true })

      if (error) {
        console.error('Fetch monthly sales error:', error)
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
