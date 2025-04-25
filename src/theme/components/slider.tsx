import { Components, Theme } from '@mui/material/styles'

export const Slider = (theme: Theme): Components['MuiSlider'] => ({
  styleOverrides: {
    valueLabel: { borderRadius: 8 },
    markLabel: {
      fontSize: 12,
      fontWeight: 500,
      color: theme.palette.grey[500],
    },
  },
})
