import Typography from '@mui/material/Typography'
import FlexBetween from '@/components/flexbox/FlexBetween'
import { currency } from '@/utils/currency'

// ==============================================================
interface Props {
  title: string
  value: number
  valueColor?: string
}
// ==============================================================

export default function ListItem({ title, value, valueColor }: Props) {
  return (
    <FlexBetween>
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>

      <Typography variant="body2" fontWeight={500} color={valueColor}>
        {currency(value)}
      </Typography>
    </FlexBetween>
  )
}
