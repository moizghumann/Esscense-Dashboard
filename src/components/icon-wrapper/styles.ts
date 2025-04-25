import { styled, alpha } from '@mui/material/styles'

// STYLED COMPONENT
export const Wrapper = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  marginRight: '0.5rem',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}))
