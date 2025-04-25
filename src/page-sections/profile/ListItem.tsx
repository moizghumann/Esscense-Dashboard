import { SvgIconComponent } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENT
import FlexBox from '@/components/flexbox/FlexBox'

// ============================================================================================
interface ListItemProps {
  title: string
  Icon: SvgIconComponent
}
// ============================================================================================

export default function ListItem({ title, Icon }: ListItemProps) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Icon sx={{ fontSize: 14, color: 'text.secondary' }} />
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </FlexBox>
  )
}
