import { PropsWithChildren } from 'react'
import { CardProps } from '@mui/material/Card'
import Typography from '@mui/material/Typography'
// STYLED COMPONENT
import { StyledCard } from './styles'

// ==============================================================
interface Props extends PropsWithChildren, CardProps {
  title: string
  bgTransparent?: boolean
}
// ==============================================================

export default function Block({ ref, title, children, bgTransparent = false, ...props }: Props) {
  return (
    <StyledCard ref={ref} isTransparent={bgTransparent} {...props}>
      <Typography variant="body1" fontSize={18} fontWeight={600} sx={{ mb: 3 }}>
        {title}
      </Typography>

      {children}
    </StyledCard>
  )
}
