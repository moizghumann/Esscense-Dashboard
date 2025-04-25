import { PropsWithChildren } from 'react'
// STYLED COMPONENT
import { StyledSpan } from './styles'

export type Type = 'primary' | 'success' | 'error'

// ==============================================================
interface Props extends PropsWithChildren {
  type?: Type
}
// ==============================================================

export default function Percentage({ children, type = 'success' }: Props) {
  return <StyledSpan type={type}>{children}</StyledSpan>
}
