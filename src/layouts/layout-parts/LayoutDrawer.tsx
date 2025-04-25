import { PropsWithChildren } from 'react'
// MUI
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'

// STYLED COMPONENT
const Wrapper = styled('div')(({ theme }) => ({
  height: '100%',
  width: 'inherit',
  position: 'fixed',
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
  zIndex: theme.zIndex.drawer + 3,
  backgroundColor: theme.palette.background.paper,
}))

// ================================================================
interface LayoutDrawerProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
  drawerWidth?: number
}
// ================================================================

export default function LayoutDrawer({
  open,
  children,
  onClose,
  drawerWidth = 280,
}: LayoutDrawerProps) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: drawerWidth,
          },
        },
      }}
    >
      <Wrapper>{children}</Wrapper>
    </Drawer>
  )
}
