import { ComponentPropsWithRef } from 'react'
import { SxProps, Theme } from '@mui/material/styles'
// STYLED COMPONENT
import { Wrapper } from './styles'

// ==============================================================
interface Props extends ComponentPropsWithRef<'div'> {
  sx?: SxProps<Theme>
}
// ==============================================================

export default function IconWrapper({ ref, children, ...props }: Props) {
  return (
    <Wrapper ref={ref} {...props}>
      {children}
    </Wrapper>
  )
}
