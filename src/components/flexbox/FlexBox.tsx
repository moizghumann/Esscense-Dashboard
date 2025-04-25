import { PropsWithChildren, Ref } from 'react'
import Box, { BoxProps } from '@mui/material/Box'

// ==============================================================
interface Props extends BoxProps {
  ref?: Ref<HTMLDivElement>
}
// ==============================================================

export default function Flexbox({ ref, children, ...props }: PropsWithChildren<Props>) {
  return (
    <Box display="flex" ref={ref} {...props}>
      {children}
    </Box>
  )
}
