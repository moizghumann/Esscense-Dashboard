import { ReactNode } from 'react'
// MUI
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import FlexBox from '@/components/flexbox/FlexBox'
// STYLED COMPONENT
import { StyledRoot } from './styles'

// ==============================================================
interface ListItemProps {
  title: string
  value: number
  Icon: ReactNode
  active: boolean
  handleChange: () => void
}
// ==============================================================

export default function ListItem({ title, value, Icon, active, handleChange }: ListItemProps) {
  return (
    <StyledRoot active={active} onClick={handleChange}>
      <FlexBox gap={1.5} alignItems="center">
        {Icon}

        <Typography variant="body2" className="title">
          {title}
        </Typography>
      </FlexBox>

      {value > 0 && <Chip className="badge" size="small" label={`(${value})`} color="secondary" />}
    </StyledRoot>
  )
}
