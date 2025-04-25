import { Components } from '@mui/material/styles'

export const SvgIcon = (): Components['MuiSvgIcon'] => ({
  styleOverrides: {
    root: {
      '& .secondary': {
        opacity: 0.4,
      },
    },
  },
})
