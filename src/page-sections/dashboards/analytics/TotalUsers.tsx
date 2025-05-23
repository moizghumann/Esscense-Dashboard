import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
// MUI
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { CircularProgress } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
// CUSTOM HOOKS
import useChartOptions from '@/hooks/useChartOptions'
import { useSupabase } from '@/providers/supabase'

const TopStats = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  minHeight: 72, // reserves space for two lines of text/skeletons
})

const ChartContainer = styled('div')({
  position: 'relative',
  width: '100%',
  minHeight: 260, // reserve full chart height
  marginTop: '1rem',
  marginBottom: '1rem',
})

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

const dayOrder: Record<DayOfWeek, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
}

interface SeriesData {
  day: DayOfWeek
  value: number
}

export default function TotalUsers() {
  const theme = useTheme()
  const { t } = useTranslation()
  const supabase = useSupabase()

  // data + loading flags
  const [users, setUsers] = useState<any[]>([])
  const [isUsersLoading, setIsUsersLoading] = useState(true)

  const [seriesData, setSeriesData] = useState<
    { name: string; data: number[] }[]
  >([])
  const [categories, setCategories] = useState<string[]>([])
  const [isChartLoading, setIsChartLoading] = useState(true)

  // keep subscription ref stable
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  // initial user fetch + realtime subscription
  const getUsers = useCallback(async () => {
    setIsUsersLoading(true)
    const { data, error } = await supabase.from('users').select('*')
    if (error) console.error('Error fetching users:', error)
    else setUsers(data ?? [])
    setIsUsersLoading(false)
  }, [supabase])

  const applyChange = useCallback((list: any[], payload: any) => {
    const { eventType, new: newRow, old: oldRow } = payload
    switch (eventType) {
      case 'INSERT':
        return [...list, newRow]
      case 'UPDATE':
        return list.map((u) => (u.id === newRow.id ? newRow : u))
      case 'DELETE':
        return list.filter((u) => u.id !== oldRow.id)
      default:
        return list
    }
  }, [])

  const subscribeRealtime = useCallback(() => {
    const channel = supabase.channel('realtime-users-update')
    channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        (payload) => {
          setUsers((curr) => applyChange(curr, payload))
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Realtime user channel subscribed')
        }
      })
    return channel
  }, [supabase, applyChange])

  useEffect(() => {
    getUsers()
    channelRef.current = subscribeRealtime()
    return () => {
      channelRef.current?.unsubscribe()
    }
  }, [getUsers, subscribeRealtime])

  // fetch chart data
  useEffect(() => {
    let canceled = false

    const fetchChart = async () => {
      setIsChartLoading(true)
      const { data, error } = (await supabase
        .from('series_data')
        .select('day, value')) as { data: SeriesData[] | null; error: any }
      if (!canceled) {
        if (error) console.error('Error fetching chart data:', error)
        else if (data?.length) {
          // sort & map
          const sorted = [...(data || [])].sort(
            (a: SeriesData, b: SeriesData) => dayOrder[a.day] - dayOrder[b.day]
          )
          setSeriesData([{ name: 'Tasks', data: sorted.map((x) => x.value) }])
          setCategories(sorted.map((x) => x.day))
        }
        setIsChartLoading(false)
      }
    }

    fetchChart()
    return () => {
      canceled = true
    }
  }, [supabase, dayOrder])

  // chart config
  const options = useChartOptions({
    stroke: { show: false },
    xaxis: { categories },
    colors: [theme.palette.divider, theme.palette.primary.main],
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '40%',
        distributed: true,
      },
    },
    tooltip: {
      y: {
        formatter: (val, { dataPointIndex, w }) =>
          `${w.globals.labels[dataPointIndex]} : ${val}`,
      },
    },
  })

  return (
    <Card className="p-3 h-full">
      <TopStats>
        <Typography variant="body2" color="text.secondary">
          {t('Total Users')}
        </Typography>

        {isUsersLoading ? (
          <Skeleton width="40%" height={32} />
        ) : (
          <Typography variant="body2" fontSize={28} fontWeight={600}>
            {users.length}
          </Typography>
        )}
      </TopStats>

      <Typography
        variant="body2"
        sx={{
          mt: 1,
          span: { color: 'text.secondary' },
        }}
      >
        {t('Page views')} <span>/ Second</span>
      </Typography>

      <ChartContainer>
        {isChartLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Chart
            type="bar"
            series={seriesData}
            options={options}
            height={260}
            width="100%"
          />
        )}
      </ChartContainer>

      <Button color="secondary" fullWidth>
        {t('View Details')}
      </Button>
    </Card>
  )
}
