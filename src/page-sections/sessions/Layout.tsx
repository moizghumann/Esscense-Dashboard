// ─── imports ──────────────────────────────────────────────────────────────
import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import FlexRowAlign from '@/components/flexbox/FlexRowAlign'
import { useMediaQuery, useTheme } from '@mui/material'
import heroDog from '../../../public/static/illustration/hounded.png'

// ─── types ────────────────────────────────────────────────────────────────
type Props = { children: ReactNode; login?: boolean }

// ─── component ────────────────────────────────────────────────────────────
export default function Layout({ children }: Props) {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* ❶  HERO IMAGE COLUMN  */}
      {upMd && (
        <Grid size={{ md: 6, xs: 12 }}>
          {/*   We keep FlexRowAlign so the Box is still a flex item that
           automatically stretches to fill height/width.              */}
          <FlexRowAlign sx={{ height: '100vh' }}>
            <Box
              component="img"
              src={heroDog}
              alt="Jumping blue dog sculpture with star"
              /*  Each breakpoint can get its own height; width is 100 % by default. */
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </FlexRowAlign>
        </Grid>
      )}

      {/* ❷  CONTENT COLUMN  */}
      <Grid size={{ md: 6, xs: 12 }}>
        <FlexRowAlign bgcolor="background.paper" height="100%">
          {children}
        </FlexRowAlign>
      </Grid>
    </Grid>
  )
}
