import { BadgeProps } from '@mui/material/Badge'
// STYLED COMPONENT
import { StyledBadge } from './styles'

// ===================================================================
interface Props extends BadgeProps {
  width?: number
  height?: number
}
// ===================================================================

export default function AvatarBadge({ children, ref, width = 25, height = 25, ...others }: Props) {
  return (
    <StyledBadge
      ref={ref}
      width={width}
      height={height}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      {...others}
    >
      {children}
    </StyledBadge>
  )
}
