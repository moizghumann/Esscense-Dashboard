import { alpha, styled } from '@mui/material/styles'

interface RootStyleProps {
  isDragActive: boolean
  error: boolean
}

export const RootStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isDragActive' && prop !== 'error',
})<RootStyleProps>(({ theme, isDragActive, error }) => ({
  padding: 32,
  borderRadius: 16,
  cursor: 'pointer',
  textAlign: 'center',
  border: `1px dashed ${theme.palette.grey[400]}`,
  '.icon': {
    fontSize: 38,
    color: theme.palette.text.secondary,
  },
  ...(isDragActive && {
    borderColor: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[100],
  }),
  ...(error && {
    borderColor: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.02),
  }),
}))

export const ErrorMessage = styled('p')(({ theme }) => ({
  fontSize: 12,
  marginTop: '.5rem',
  marginInlineStart: '1rem',
  color: theme.palette.error.main,
}))
