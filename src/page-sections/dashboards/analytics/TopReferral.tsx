import { useMemo } from 'react'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
// MUI
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
// CUSTOM COMPONENTS
import Title from '@/components/title'
import Scrollbar from '@/components/scrollbar'
import { FlexBox } from '@/components/flexbox'
// CUSTOM HOOKS
import useChartOptions from '@/hooks/useChartOptions'
// CUSTOM UTILS METHODS
import { format } from '@/utils/currency'
// COMMON STYLED COMPONENTS
import { HeadTableCell } from './styles'
import { useTopReferrals } from '@/hooks/useTopReferrals'
import { useReferralSeries } from '@/hooks/useReferralSeries'

// STYLED COMPONENTS
const StyledChart = styled(Chart)({
  '& .apexcharts-canvas': { marginLeft: 'auto' },
})

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.grey[500],
  borderTop: `1px dashed ${theme.palette.divider}`,
}))

export default function TopReferral() {
  const theme = useTheme()
  const { t } = useTranslation()

  const { data = [] } = useTopReferrals()
  const { data: referalSeries = [] } = useReferralSeries()

  // REACT CHART DATA SERIES
  const series = [
    { name: 'Referral', data: referalSeries.map((item) => item.value) },
  ]

  const options = useMemo(
    () => (color: string) => {
      return useChartOptions({
        colors: [color],
        stroke: { width: 2 },
        tooltip: { enabled: false },
        xaxis: {
          categories: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        },
      })
    },
    []
  )

  // CUSTOM DUMMY DATA
  const TOP_REFERRALS = [
    {
      id: data[0]?.id,
      image: '/static/social-media/dribble.svg',
      title: data[0]?.title,
      category: data[0]?.category,
      rate: data[0]?.rate,
      visit: data[0]?.visit,
      chart: { series, option: options(theme.palette.success.main) },
    },
    {
      id: data[1]?.id,
      image: '/static/social-media/linkedin.svg',
      title: data[1]?.title,
      category: data[1]?.category,
      rate: data[1]?.rate,
      visit: data[1]?.visit,
      chart: { series, option: options(theme.palette.error.main) },
    },
    {
      id: data[2]?.id,
      image: '/static/social-media/twitter.svg',
      title: data[2]?.title,
      category: data[2]?.category,
      rate: data[2]?.rate,
      visit: data[2]?.visit,
      chart: { series, option: options(theme.palette.success.main) },
    },
  ]

  return (
    <Card sx={{ padding: 3, pb: 0 }}>
      <div>
        <Title
          title={1352}
          subtitle={t('Visits by Top Referral Source')}
          percentage="+12.5%"
        />
      </div>

      <Scrollbar>
        <Table sx={{ minWidth: 500, mt: 4 }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>REFERRAL SOURCE</HeadTableCell>
              <HeadTableCell align="center">BOUNCE RATE (%)</HeadTableCell>
              <HeadTableCell align="center">VISIT</HeadTableCell>
              <HeadTableCell align="right">CHART</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {TOP_REFERRALS.map((item) => (
              <TableRow key={item.id}>
                <BodyTableCell>
                  <FlexBox alignItems="center" gap={1.5}>
                    <Avatar variant="square" src={item.image} />
                    <div>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        fontWeight={600}
                      >
                        {item.title}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {item.category}
                      </Typography>
                    </div>
                  </FlexBox>
                </BodyTableCell>

                <BodyTableCell align="center">{item.rate}%</BodyTableCell>

                <BodyTableCell align="center">
                  {format(item.visit)}
                </BodyTableCell>

                <BodyTableCell align="right">
                  <StyledChart
                    type="line"
                    width={100}
                    height={80}
                    series={item.chart.series}
                    options={item.chart.option}
                  />
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  )
}
