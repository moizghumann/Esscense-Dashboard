import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'

// ==============================================================
// Types
type StyledProps = { deg: number; borderSize: number }
// ==============================================================

// Component
export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'deg' && prop !== 'borderSize',
})<StyledProps>(({ theme, borderSize, deg }) => ({
  padding: '3px',
  backgroundOrigin: 'border-box',
  border: `double ${borderSize}px transparent`,
  backgroundClip: 'padding-box, border-box',
  backgroundImage: `linear-gradient(white, white), conic-gradient(from 0deg, ${theme.palette.primary.main} ${deg}deg, ${theme.palette.grey[200]} 0deg)`,
  overflow: 'hidden', // ✅ Ensures no image leaks out
  position: 'relative', // ✅ (just good practice for child styling)

  ...theme.applyStyles('dark', {
    backgroundImage: `linear-gradient(${theme.palette.grey[800]}, ${theme.palette.grey[800]}), conic-gradient(from 0deg, ${theme.palette.primary.main} ${deg}deg, ${theme.palette.grey[800]} 0deg)`,
  }),

  // 🔥 Add this to style the image inside Avatar
  '& img': {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transform: 'scale(1.4)',  // 🚀 Slight zoom-in to ensure full fill
},
}));

