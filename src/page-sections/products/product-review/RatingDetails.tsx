import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import FlexBetween from '@/components/flexbox/FlexBetween'
// CUSTOM UTILS METHOD
import { formatK } from '@/utils/currency'

// ==========================================================================================
interface Props {
  title: string
  totalReview: number
  progressValue: number
}
// ==========================================================================================

export default function RatingDetails({ title, progressValue, totalReview }: Props) {
  return (
    <FlexBetween>
      <Typography variant="body2" fontWeight={500} lineHeight={1}>
        {title}
      </Typography>

      <LinearProgress color="success" variant="determinate" value={progressValue} sx={{ mx: 2 }} />

      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {formatK(totalReview, 'decimal')}
      </Typography>
    </FlexBetween>
  )
}
