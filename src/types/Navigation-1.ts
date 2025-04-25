import { ReactNode } from 'react'
import { SvgIconComponent } from '@mui/icons-material'

interface NavItem {
  type: string
  name: string
  path: string
  label: string
  access: string
  iconText: string
  disabled: boolean
  badge: ReactNode
  icon: SvgIconComponent
  children: Partial<NavItem>[]
}

export type Navigation = Partial<NavItem>
