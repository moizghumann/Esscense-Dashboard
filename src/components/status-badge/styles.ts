import { styled } from '@mui/material/styles'
// CUSTOM DATA TYPE
import { Type } from './StatusBadge'

// STYLED COMPONENT
export const Status = styled('p', {
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: Type }>(({ theme, type }) => ({
  borderRadius: 6,
  padding: '.2rem .7rem',
  display: 'inline-block',
  ...(type === 'warning' && {
    color: theme.palette.warning[600],
    backgroundColor: theme.palette.warning[100],
  }),
  ...(type === 'success' && {
    color: theme.palette.success[600],
    backgroundColor: theme.palette.success[50],
  }),
  ...(type === 'primary' && {
    color: theme.palette.primary[500],
    backgroundColor: theme.palette.primary[50],
  }),
  ...(type === 'error' && {
    color: theme.palette.error[500],
    backgroundColor: theme.palette.error[50],
  }),

  ...theme.applyStyles('dark', {
    backgroundColor: `${theme.palette.grey[700]} !important`,
  }),
}))
