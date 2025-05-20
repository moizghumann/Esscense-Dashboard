import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
// MUI
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
// CUSTOM HOOKS
import useChartOptions from '@/hooks/useChartOptions'
import { useEffect, useRef, useState } from 'react'
import { useSupabase } from '@/contexts/supabase'
import { CircularProgress } from '@mui/material'

export default function TotalUsers() {
  const theme = useTheme()
  const { t } = useTranslation()
  const { supabase } = useSupabase()
  const [seriesData, setSeriesData] = useState<
    { name: string; data: number[] }[]
  >([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])

  if (!supabase) {
    console.error('Supabase client is not initialized')
    return
  }

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  const realTimeSub = () => {
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
        if (status !== 'SUBSCRIBED') return
        console.log('connection established')
      })

    return channel
  }

  const applyChange = (list: any[], payload: any) => {
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
  }

  const getUsers = () => {
    supabase
      .from('users')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching users:', error)
          return
        }
        setUsers(data)
      })
  }

  useEffect(() => {
    getUsers()

    channelRef.current = realTimeSub()

    return () => {
      channelRef.current?.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    const fetchLiveUsers = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase!
          .from('series_data')
          .select('id, series_id, day, value')

        if (error) {
          console.error('Error fetching live users:', error)
          return
        }

        if (data && data.length > 0) {
          // Sort data by day of week (using a specific order)
          const dayOrder: Record<string, number> = {
            Mon: 0,
            Tue: 1,
            Wed: 2,
            Thu: 3,
            Fri: 4,
            Sat: 5,
            Sun: 6,
          }
          const sortedData = [...data].sort((a, b) => {
            // Use type assertion to tell TypeScript these are valid keys
            return (
              dayOrder[a.day as keyof typeof dayOrder] -
              dayOrder[b.day as keyof typeof dayOrder]
            )
          })

          // Extract values and days for chart
          const values = sortedData.map((item) => item.value)
          const days = sortedData.map((item) => item.day)

          // Update state
          setSeriesData([{ name: 'Tasks', data: values }])
          setCategories(days)
        }
      } catch (error) {
        console.error('Error fetching live users:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLiveUsers()
  }, [supabase])

  const options = useChartOptions({
    stroke: { show: false },
    xaxis: { categories: categories },
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
        formatter: (val, { dataPointIndex, w }) => {
          return `${w.globals.labels[dataPointIndex]} : ${val}`
        },
      },
    },
  })

  return (
    <Card className="p-3 h-full">
      <div>
        <Typography variant="body2" color="text.secondary">
          {t('Total Users')}
        </Typography>

        <Typography variant="body2" fontSize={28} fontWeight={600}>
          {users.length}
        </Typography>
      </div>

      <Typography
        variant="body2"
        sx={{
          mt: 3,
          span: {
            color: 'text.secondary',
          },
        }}
      >
        {t('Page views')} <span>/ Second</span>
      </Typography>

      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '275px',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Chart type="bar" options={options} series={seriesData} height={260} />
      )}

      <Button color="secondary" fullWidth>
        {t('View Details')}
      </Button>
    </Card>
  )
}
