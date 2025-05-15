import Chart from 'react-apexcharts'
// MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
// CUSTOM COMPONENTS
import Title from '@/components/title'
// CUSTOM HOOKS
import useChartOptions from '@/hooks/useChartOptions'
import { useCompletedAnalyticsMetrics } from '@/hooks/useCompletedAnalyticsMetrics'
import { useReferralSeries } from '@/hooks/useReferralSeries'

// REACT CHART CATEGORIES LABEL
const categories = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

// ==============================================================
type ComponentProps = { chart?: 'bar' | 'area' }
// ==============================================================

export default function CompleteGoal({ chart = 'bar' }: ComponentProps) {
  const theme = useTheme()
  const { data = [] } = useCompletedAnalyticsMetrics()
  const { data: completedSeries = [] } = useReferralSeries()

  const series = [
    { name: 'Complete', data: completedSeries.map((item) => item.value) },
  ]

  // REACT BAR CHART OPTIONS
  const barChartOptions = useChartOptions({
    chart: { offsetY: 30 },
    stroke: { show: false },
    xaxis: { categories },
    colors: [theme.palette.divider, theme.palette.primary.main],
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: '45%',
        distributed: true,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number, { dataPointIndex, w }) {
          return `${w.globals.labels[dataPointIndex]} : ${val}`
        },
      },
    },
  })

  // REACT AREA CHART OPTIONS
  const areaChartOptions = useChartOptions({
    chart: { offsetY: 20 },
    stroke: { show: true },
    colors: [theme.palette.primary.main, theme.palette.primary[100]],
    xaxis: { categories, crosshairs: { show: true } },
  })

  return (
    <Card>
      <Box p={3} pb={0} position="relative" zIndex={2}>
        <Title
          title={data[0]?.completed_goals}
          percentage={`${data[0]?.percentage}%`}
          percentageType="primary"
          subtitle="Completed Goals"
        />
      </Box>

      {chart === 'bar' ? (
        <Box mt={-8}>
          <Chart
            type="bar"
            options={barChartOptions}
            series={series}
            height={180}
          />
        </Box>
      ) : (
        <Box mt={-8}>
          <Chart
            type="area"
            options={areaChartOptions}
            series={series}
            height={180}
          />
        </Box>
      )}
    </Card>
  )
}
