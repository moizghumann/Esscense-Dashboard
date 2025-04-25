import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'

// STYLED COMPONENTS
export const StyledCard = styled(Card)(({ theme }) => ({
  padding: '1.5rem',
  border: `1px solid ${theme.palette.grey[100]}`,
  ...theme.applyStyles('dark', {
    border: `1px solid ${theme.palette.grey[700]}`,
  }),
}))

export const CardWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  padding: 12,
  borderRadius: 8,
  cursor: 'pointer',
  border: `1px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
  '.item-center': {
    gap: '.5rem',
    display: 'flex',
    alignItems: 'center',
  },
}))
