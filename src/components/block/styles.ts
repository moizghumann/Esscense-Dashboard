import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isTransparent',
})<{ isTransparent: boolean }>(({ theme, isTransparent }) => ({
  padding: 32,
  borderRadius: 12,
  boxShadow: theme.shadows[0],
  border: `1px dashed ${theme.palette.grey[200]}`,
  backgroundColor: isTransparent ? 'transparent' : theme.palette.grey[50],
  ...theme.applyStyles('dark', {
    border: `1px dashed ${theme.palette.grey[600]}`,
    backgroundColor: isTransparent ? 'transparent' : theme.palette.grey[800],
  }),
}))
