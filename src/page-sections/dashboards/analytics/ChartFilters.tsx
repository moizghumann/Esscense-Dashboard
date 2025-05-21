import { useCallback, useEffect, useMemo, useState } from 'react'
import Chart, { Props } from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
// MUI
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
// CUSTOM HOOKS
import useChartOptions from '@/hooks/useChartOptions'
// CUSTOM UTILS METHODS
import { formatK } from '@/utils/currency'
import { useChartData } from '@/hooks/useAnalyticsChartData'
import { formatTime } from '@/utils/formatTime'
import { useMonthlySales } from '@/hooks/getMonthlySales'

// STYLED COMPONENTS
const ChartWrapper = styled('div')({
  paddingLeft: '.5rem',
  paddingRight: '1rem',
})

const TopContentWrapper = styled('div')(({ theme }) => ({
  gap: '.5rem',
  display: 'flex',
  [theme.breakpoints.down(730)]: {
    flexDirection: 'column',
    '& .list-item': { flex: 1, borderRadius: '12px' },
  },
}))

const BoxWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: number }>(({ theme, active }) => ({
  padding: '1.5rem',
  cursor: 'pointer',
  borderRadius: '0 0 12px 12px',
  ...(active && { backgroundColor: theme.palette.action.selected }),
}))

// ==============================================================
interface ComponentProps extends Props {}
// ==============================================================

export default function ChartFilters({ type = 'area' }: ComponentProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  const { data: chartData, isLoading, error } = useChartData()
  const {
    data: monthlySales = [],
    isLoading: monthlySalesLoading,
    error: monthlySalesError,
  } = useMonthlySales()

  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  useEffect(() => {
    if (!isLoading && !error && chartData.length > 0) {
      const idx = chartData.length > 1 ? 1 : 0
      setSelectedItem(chartData[idx].id)
    }
  }, [chartData, isLoading, error])

  useEffect(() => {
    if (!monthlySalesLoading && !monthlySalesError && monthlySales.length > 0) {
      const idx = monthlySales.length > 1 ? 1 : 0
      setSelectedItem(monthlySales[idx].month_idx)
    }
  }, [monthlySales, monthlySalesLoading, monthlySalesError])

  const handleChange = useCallback(
    (id: number) => () => setSelectedItem(id),
    []
  )

  const salesData = monthlySales.map((item) => item.sales_amount)
  const salesMonths = monthlySales.map((item) => item.month_name)

  const maxValue = useMemo(() => Math.max(...salesData) * 1.2, [monthlySales])

  const options = useChartOptions({
    legend: { show: false },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.primary[300],
      theme.palette.primary[100],
    ],
    xaxis: {
      categories: salesMonths,
      crosshairs: { show: true },
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      min: 0,
      show: true,
      tickAmount: 5,
      max: maxValue,
      stepSize: maxValue / 5,
      labels: {
        formatter: (value) => formatK(value),
        style: { colors: theme.palette.text.secondary },
      },
    },
  })

  return (
    <Card>
      <TopContentWrapper>
        {chartData.map((item) => (
          <BoxWrapper
            key={item.id}
            className="list-item"
            onClick={handleChange(item.id)}
            active={selectedItem === item.id ? 1 : 0}
          >
            <Typography
              noWrap
              variant="body2"
              fontWeight={500}
              color="text.secondary"
            >
              {t(item.display_title)}
            </Typography>

            <Typography variant="body2" fontWeight={600} fontSize={22}>
              {item.display_title === 'Session Duration'
                ? formatTime(item.duration_value)
                : item.numeric_value}
            </Typography>

            <Typography
              variant="body2"
              fontWeight={500}
              color={item.percentage_delta > 0 ? 'success.main' : 'error.main'}
            >
              {item.percentage_delta > 0 && '+'}
              {item.percentage_delta}%
            </Typography>
          </BoxWrapper>
        ))}
      </TopContentWrapper>

      <ChartWrapper>
        <Chart
          type={type}
          height={335}
          series={[
            {
              name: 'Sales',
              data: salesData,
            },
          ]}
          options={options}
        />
      </ChartWrapper>
    </Card>
  )
}
