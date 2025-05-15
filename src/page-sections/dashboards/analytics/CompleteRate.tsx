import Chart from 'react-apexcharts'
// MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
// CUSTOM COMPONENT
import Title from '@/components/title'
// CUSTOM HOOK
import useChartOptions from '@/hooks/useChartOptions'
import { useReferralSeries } from '@/hooks/useReferralSeries'
import { useGoalCompleteMetrics } from '@/hooks/useGoalCompleteMetrics'

// REACT CHART CATEGORIES LABEL
const categories = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export default function CompleteRate() {
  const theme = useTheme()

  const { data = [] } = useGoalCompleteMetrics()
  const { data: completeRateSeries = [] } = useReferralSeries()
  const series = [
    { name: 'Tasks', data: completeRateSeries.map((item) => item.value) },
  ]

  // REACT CHART OPTIONS
  const options = useChartOptions({
    chart: { offsetY: 30 },
    stroke: { show: false },
    xaxis: { categories },
    colors: [theme.palette.divider, theme.palette.success[500]],
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

  return (
    <Card>
      <Box p={3} pb={0} position="relative" zIndex={2}>
        <Title
          title={`${data[0]?.rate}%`}
          subtitle="Complete Rates"
          percentage={`${data[0]?.percentage}%`}
        />
      </Box>

      <Box mt={-8}>
        <Chart type="bar" options={options} series={series} height={180} />
      </Box>
    </Card>
  )
}
