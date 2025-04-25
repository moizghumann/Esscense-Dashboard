import { Components, Theme } from '@mui/material/styles'

export const LinearProgress = (theme: Theme): Components['MuiLinearProgress'] => ({
  styleOverrides: {
    root: {
      height: 6,
      flexGrow: 1,
      borderRadius: 16,
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
      }),
    },
  },
})
