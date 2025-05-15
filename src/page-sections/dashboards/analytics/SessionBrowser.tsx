import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'
// MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
// CUSTOM COMPONENTS
import { FlexBox, FlexRowAlign } from '@/components/flexbox'
// CUSTOM HOOKS
import useChartOptions from '@/hooks/useChartOptions'
import { useBrowserSession } from '@/hooks/useBrowserSession'

// STYLED COMPONENT
const StyledChart = styled(Chart)({
  marginTop: '.75rem',
  marginBottom: '1rem',
})

const Item = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 1.5rem',
  borderTop: `1px dashed ${theme.palette.divider}`,
}))

export default function SessionBrowser() {
  const theme = useTheme()
  const { t } = useTranslation()
  const { data: browserData = [] } = useBrowserSession()

  const BROWSERS = browserData.map((browser) => ({
    ...browser,
    image: (() => {
      switch (browser.title) {
        case 'Chrome':
          return '/static/browser/chrome.svg'
        case 'Mozilla':
          return '/static/browser/mozilla.svg'
        case 'Opera Mini':
          return '/static/browser/opera.svg'
        default:
          return ''
      }
    })(),
  }))

  const options = useChartOptions({
    stroke: { show: false },
    labels: BROWSERS.map((browser) => browser.title),
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.success.main,
    ],
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: { size: '75%' },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => String(val),
        title: { formatter: (series) => series },
      },
    },
  })

  return (
    <Card className="h-full">
      <Typography
        variant="body2"
        sx={{
          pt: 3,
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {t('Session by browser')}
      </Typography>

      <StyledChart
        height={180}
        type="donut"
        options={options}
        series={BROWSERS.map((browser) => browser.percentage)}
      />

      {BROWSERS.map((item) => (
        <Item key={item.id}>
          <FlexBox alignItems="center" gap={1} minWidth={120}>
            <Avatar
              variant="square"
              src={item.image}
              sx={{ width: 30, height: 30 }}
            />
            <Typography variant="body2" fontWeight={500}>
              {item.title}
            </Typography>
          </FlexBox>

          <FlexRowAlign gap={1} flexGrow={1}>
            <Box width={8} height={8} borderRadius="50%" bgcolor={item.color} />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {item.percentage}%
            </Typography>
          </FlexRowAlign>

          <Typography
            variant="body2"
            color={item.value > 0 ? 'success.main' : 'error.main'}
          >
            {item.value}%
          </Typography>
        </Item>
      ))}
    </Card>
  )
}
