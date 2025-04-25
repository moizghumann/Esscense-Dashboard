import { SvgIconComponent } from '@mui/icons-material'

interface BaseNavItem {
  name: string
  Icon: SvgIconComponent
}

interface NavItemWithChildren extends BaseNavItem {
  path?: never
  children: ChildNavItem[]
}

interface NavItemWithOutChildren extends BaseNavItem {
  path: string
  children?: never
}

export interface ChildNavItem {
  name: string
  path: string
}

export type NavItem = NavItemWithChildren | NavItemWithOutChildren
