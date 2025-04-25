import { Components } from '@mui/material/styles'

export const Link = (): Components['MuiLink'] => ({
  styleOverrides: {
    root: {
      fontSize: 14,
      fontWeight: 500,
      textDecoration: 'none',
    },
  },
})
