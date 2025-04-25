import Typography from '@mui/material/Typography'
import { SvgIconComponent } from '@mui/icons-material'
// CUSTOM COMPONENTS
import FlexBox from '@/components/flexbox/FlexBox'
import IconWrapper from '@/components/icon-wrapper'

// ==============================================================
interface Props {
  title: string
  description: string
  Icon: SvgIconComponent
}
// ==============================================================

export default function Item({ Icon, title, description }: Props) {
  return (
    <FlexBox gap={1} alignItems="center">
      <IconWrapper>
        <Icon color="primary" />
      </IconWrapper>

      <div>
        <Typography variant="body2" fontWeight={500}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </div>
    </FlexBox>
  )
}
