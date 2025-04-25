import { Components, Theme } from '@mui/material/styles'

export const Tooltip = (theme: Theme): Components['MuiTooltip'] => ({
  styleOverrides: {
    tooltip: {
      borderRadius: 8,
      backgroundColor: theme.palette.text.primary,
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
      }),
    },
    arrow: {
      color: theme.palette.text.primary,
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
      }),
    },
  },
})
