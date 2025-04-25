import { PropsWithChildren } from 'react'
import Box from '@mui/material/Box'
import Footer from './footer/Footer'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: 'white',
        ...theme.applyStyles('dark', {
          backgroundColor: theme.palette.background.default,
        }),
      })}
    >
      {children}
      <Footer />
    </Box>
  )
}
