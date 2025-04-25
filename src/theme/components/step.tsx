import { Components, Theme } from '@mui/material/styles'

export const StepIcon = (theme: Theme): Components['MuiStepIcon'] => ({
  styleOverrides: {
    root: {
      color: theme.palette.grey[400],
    },
  },
})

export const StepConnector = (theme: Theme): Components['MuiStepConnector'] => ({
  styleOverrides: {
    line: {
      borderColor: theme.palette.grey[300],
      ...theme.applyStyles('dark', {
        borderColor: theme.palette.grey[700],
      }),
    },
  },
})
