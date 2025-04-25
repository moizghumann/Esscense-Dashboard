import { AvatarProps } from '@mui/material/Avatar'
// STYLED COMPONENT
import { StyledAvatar } from './styles'

// ==============================================================
interface Props extends AvatarProps {
  percentage: number
  borderSize?: number
}
// ==============================================================

export default function AvatarLoading({
  ref,
  percentage,
  alt = 'user',
  borderSize = 1,
  src = '/static/user/user-11.png',
  ...others
}: Props) {
  return (
    <StyledAvatar
      ref={ref}
      alt={alt}
      src={src}
      borderSize={borderSize}
      deg={Math.round((percentage / 100) * 360)}
      {...others}
    />
  )
}
