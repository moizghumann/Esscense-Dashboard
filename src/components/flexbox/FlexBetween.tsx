import { PropsWithChildren, Ref } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

// ==============================================================
interface Props extends BoxProps {
  ref?: Ref<HTMLDivElement>
}
// ==============================================================

export default function FlexBetween({ ref, children, ...props }: PropsWithChildren<Props>) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" ref={ref} {...props}>
      {children}
    </Box>
  )
}
