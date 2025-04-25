import { Components } from '@mui/material/styles'

export const AppBar = (): Components['MuiAppBar'] => ({
  defaultProps: {
    color: 'transparent',
  },
  styleOverrides: {
    root: { boxShadow: 'none' },
  },
})
