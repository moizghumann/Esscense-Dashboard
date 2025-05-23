// src/components/SessionBrowser.tsx
import React, { lazy, Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { FlexBox, FlexRowAlign } from '@/components/flexbox'
import useChartOptions from '@/hooks/useChartOptions'
import { useBrowserSession } from '@/hooks/useBrowserSession'
import type { ApexOptions } from 'apexcharts'

// ——— Styled components (module-scope) ———
const Header = styled('h2')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  fontSize: 18,
  fontWeight: 500,
  textAlign: 'center',
  margin: 0,
}))

const StyledChart = styled(lazy(() => import('react-apexcharts')) as any)({
  marginTop: '.75rem',
  marginBottom: '1rem',
})

const Item = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  borderTop: `1px dashed ${theme.palette.divider}`,
}))

// ——— Main component ———
const SessionBrowser = React.memo(function SessionBrowser() {
  const theme = useTheme()
  const { t } = useTranslation()
  const { data: browserData = [] } = useBrowserSession()

  // 1) Map and memoize your browser list
  const BROWSERS = useMemo(() => {
    return browserData.map((b) => {
      let image = ''
      if (b.title === 'Chrome') image = '/static/browser/chrome.svg'
      else if (b.title === 'Mozilla') image = '/static/browser/mozilla.svg'
      else if (b.title === 'Opera Mini') image = '/static/browser/opera.svg'

      const color =
        b.title === 'Chrome'
          ? theme.palette.primary.main
          : b.title === 'Mozilla'
            ? theme.palette.warning.main
            : theme.palette.success.main

      return { ...b, image, color }
    })
  }, [
    browserData,
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.success.main,
  ])

  // 2) Memoize your raw ApexOptions config
  const rawChartConfig = useMemo<ApexOptions>(() => {
    return {
      stroke: { show: false },
      labels: BROWSERS.map((b) => b.title),
      colors: BROWSERS.map((b) => b.color),
      plotOptions: {
        pie: { expandOnClick: false, donut: { size: '75%' } },
      },
      tooltip: {
        y: { formatter: (v) => String(v), title: { formatter: (s) => s } },
      },
    }
  }, [BROWSERS])

  // 3) Call the hook at top level—merges base + rawChartConfig
  const options = useChartOptions(rawChartConfig)

  // 4) Memoize series array
  const series = useMemo(() => BROWSERS.map((b) => b.percentage), [BROWSERS])

  return (
    <Card className="h-full">
      <Header>{t('Session by browser')}</Header>

      <Suspense fallback={<Box height={180} />}>
        <StyledChart
          height={180}
          type="donut"
          options={options}
          series={series}
        />
      </Suspense>

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
})

export default SessionBrowser
