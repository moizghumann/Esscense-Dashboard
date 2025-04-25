import { Components } from '@mui/material/styles'

export const Card = (): Components['MuiCard'] => ({
  styleOverrides: {
    root: {
      borderRadius: 12,
      backgroundImage: 'none',
    },
  },
  defaultProps: { elevation: 1 },
})
