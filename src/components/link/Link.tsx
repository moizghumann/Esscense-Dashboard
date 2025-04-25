import { Ref } from 'react'
import { Link as RouterLink, LinkProps } from 'react-router'

// ==============================================================
interface Props extends Omit<LinkProps, 'to'> {
  href: string
  ref?: Ref<HTMLAnchorElement>
}
// ==============================================================

export default function Link({ ref, href, ...others }: Props) {
  return <RouterLink ref={ref} to={href} {...others} />
}
