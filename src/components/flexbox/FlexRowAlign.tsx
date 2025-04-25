import { PropsWithChildren, Ref } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

// ==============================================================
interface Props extends BoxProps {
  ref?: Ref<HTMLDivElement>
}
// ==============================================================

export default function FlexRowAlign({ ref, children, ...props }: PropsWithChildren<Props>) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" ref={ref} {...props}>
      {children}
    </Box>
  )
}
