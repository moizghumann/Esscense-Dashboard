import { Components } from '@mui/material/styles'

export const Paper = (): Components['MuiPaper'] => ({
  styleOverrides: {
    root: {
      backgroundImage: 'none',
    },
  },
})
