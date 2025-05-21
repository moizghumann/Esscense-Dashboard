// src/features/analytics/useBrowserSession.ts
import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/providers/supabase'

export interface IBrowser {
  id: number
  title: string
  value: number
  percentage: number
  color: string
  image?: string
}

export function useBrowserSession() {
  const { supabase } = useSupabase()

  // 1️⃣  Before the provider hands us a client, return a safe placeholder
  if (!supabase) return { data: [] as IBrowser[], error: null, isLoading: true }

  // 2️⃣  React Query handles fetch, cache, retries, GC
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['browser_session'],
    queryFn: async (): Promise<IBrowser[]> => {
      const { data, error } = await supabase
        .from('browsers')
        .select('id, title, value, percentage, color')
        .order('percentage', { ascending: false })

      if (error) throw error
      return data ?? []
    },
    placeholderData: [],
  })

  return { data, error, isLoading }
}
