import { Theme, Components } from '@mui/material/styles'
// CUSTOM ICON COMPONENTS
import Star from '@/icons/Star'
import StarOutlined from '@/icons/StarOutlined'

// ==============================================================
declare module '@mui/material/Rating' {}
// ==============================================================

export const Rating = (theme: Theme): Components['MuiRating'] => ({
  styleOverrides: {
    root: { color: theme.palette.warning.main },
    iconEmpty: { color: theme.palette.grey[300] },
  },
  defaultProps: {
    icon: <Star fontSize="inherit" />,
    emptyIcon: <StarOutlined fontSize="inherit" />,
  },
})
