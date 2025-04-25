import { Components, Theme } from '@mui/material/styles'

export const SnackbarContent = (theme: Theme): Components['MuiSnackbarContent'] => ({
  styleOverrides: {
    root: {
      color: 'white',
      borderRadius: 12,
      backgroundColor: theme.palette.primary.main,
    },
  },
})
