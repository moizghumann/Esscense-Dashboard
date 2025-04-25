import { Components, Theme } from '@mui/material/styles'

export const Popover = (theme: Theme): Components['MuiPopover'] => ({
  styleOverrides: {
    paper: {
      borderRadius: 12,
      boxShadow: theme.shadows[2],
    },
  },
})
