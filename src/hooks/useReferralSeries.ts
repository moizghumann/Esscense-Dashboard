import { useSupabase } from '@/contexts/supabase'
import { useEffect, useState } from 'react'

export interface IReferralSeries {
  data_idx: number
  value: number
}

export function useReferralSeries() {
  const { supabase } = useSupabase()
  const [data, setData] = useState<IReferralSeries[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data: rows, error } = await supabase!
        .from('referral_data')
        .select('data_idx, value')
        .order('data_idx', { ascending: true })

      if (error) {
        console.error('Fetch referral data error:', error)
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
