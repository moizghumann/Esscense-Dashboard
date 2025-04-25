import { Components, Theme } from '@mui/material/styles'

export const TableCell = (theme: Theme): Components['MuiTableCell'] => ({
  defaultProps: { padding: 'none' },
  styleOverrides: {
    root: {
      border: 'none',
      color: theme.palette.grey[500],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[200],
      }),
    },
  },
})
