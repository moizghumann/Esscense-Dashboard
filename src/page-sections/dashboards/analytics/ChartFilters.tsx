import { useCallback, useEffect, useMemo, useState } from 'react'
import Chart, { Props } from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
// MUI
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { styled, useTheme } from '@mui/material/styles'
// CUSTOM HOOKS
import useChartOptions from '@/hooks/useChartOptions'
import { useChartData } from '@/hooks/useAnalyticsChartData'
import { useMonthlySales } from '@/hooks/getMonthlySales'
// CUSTOM UTILS METHODS
import { formatK } from '@/utils/currency'
import { formatTime } from '@/utils/formatTime'

// ==============================================================
// Styled components with reserved space
// ==============================================================

const ChartWrapper = styled('div')({
  width: '100%',
  paddingLeft: '.5rem',
  paddingRight: '1rem',
  minHeight: 335, // reserve the chart’s full height up-front
})

const TopContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '.5rem',
  minHeight: 96, // approximate height of one row of BoxWrappers
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

export default function ChartFilters({ type = 'area' }: ComponentProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  // data hooks
  const { data: chartData = [], isLoading, error } = useChartData()
  const {
    data: monthlySales = [],
    isLoading: monthlySalesLoading,
    error: monthlySalesError,
  } = useMonthlySales()

  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  // pick an initial selection when data arrives
  useEffect(() => {
    if (!isLoading && !error && chartData.length) {
      setSelectedItem(chartData.length > 1 ? chartData[1].id : chartData[0].id)
    }
  }, [chartData, isLoading, error])

  // sync selection if monthlySales is driving the chart
  useEffect(() => {
    if (!monthlySalesLoading && !monthlySalesError && monthlySales.length) {
      setSelectedItem(
        monthlySales.length > 1
          ? monthlySales[1].month_idx
          : monthlySales[0].month_idx
      )
    }
  }, [monthlySales, monthlySalesLoading, monthlySalesError])

  const handleChange = useCallback(
    (id: number) => () => setSelectedItem(id),
    []
  )

  // build the chart series
  const salesData = monthlySales.map((item) => item.sales_amount)
  const salesMonths = monthlySales.map((item) => item.month_name)
  const maxValue = useMemo(() => Math.max(...salesData, 0) * 1.2, [salesData])

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
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      min: 0,
      max: maxValue,
      tickAmount: 5,
      labels: {
        formatter: (v) => formatK(v),
        style: { colors: theme.palette.text.secondary },
      },
    },
  })

  return (
    <Card>
      <TopContentWrapper>
        {/* LIST SKELETON */}
        {isLoading || !chartData.length
          ? Array.from({ length: 3 }).map((_, idx) => (
              <BoxWrapper key={idx} className="list-item" active={0}>
                <Skeleton width="60%" height={20} />
                <Skeleton width="40%" height={28} />
                <Skeleton width="30%" height={20} />
              </BoxWrapper>
            ))
          : // REAL DATA
            chartData.map((item) => (
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
                  color={
                    item.percentage_delta > 0 ? 'success.main' : 'error.main'
                  }
                >
                  {item.percentage_delta > 0 && '+'}
                  {item.percentage_delta}%
                </Typography>
              </BoxWrapper>
            ))}
      </TopContentWrapper>

      <ChartWrapper>
        {/* CHART SKELETON */}
        {monthlySalesLoading || !salesData.length ? (
          <Skeleton variant="rectangular" width="100%" height={335} />
        ) : (
          // REAL CHART
          <Chart
            type={type}
            width="100%"
            height={335}
            series={[{ name: 'Sales', data: salesData }]}
            options={options}
          />
        )}
      </ChartWrapper>
    </Card>
  )
}
