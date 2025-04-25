import Typography from '@mui/material/Typography'
import { SvgIconComponent } from '@mui/icons-material'
// CUSTOM COMPONENTS
import FlexBox from '@/components/flexbox/FlexBox'

// ==============================================================
interface Props {
  title: string
  Icon: SvgIconComponent
}
// ==============================================================

export default function InfoItem({ title, Icon }: Props) {
  return (
    <FlexBox alignItems="center" gap={1} color="grey.500">
      <Icon sx={{ fontSize: 18 }} />
      <Typography variant="body2">{title}</Typography>
    </FlexBox>
  )
}
