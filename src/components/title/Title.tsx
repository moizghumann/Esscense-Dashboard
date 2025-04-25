import { Fragment } from 'react'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import Percentage from '@/components/percentage'
import FlexBox from '@/components/flexbox/FlexBox'
// CUSTOM UTILS METHOD
import { format } from '@/utils/currency'

// ==============================================================
interface TitleProps {
  subtitle: string
  titlePrefix?: string
  title: string | number
  percentage: string | number
  percentageType?: 'primary' | 'success' | 'error'
}
// ==============================================================

export default function Title({
  title,
  subtitle,
  percentage,
  titlePrefix,
  percentageType = 'success',
}: TitleProps) {
  return (
    <Fragment>
      <FlexBox alignItems="center" gap={1}>
        <Typography
          variant="body2"
          fontSize={28}
          fontWeight={600}
          sx={{
            span: {
              fontSize: 18,
              fontWeight: 500,
              color: 'grey.400',
            },
          }}
        >
          {titlePrefix && <span>{titlePrefix}</span>}

          {typeof title === 'number' ? format(title) : title}
        </Typography>

        <Percentage type={percentageType}>{percentage}</Percentage>
      </FlexBox>

      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Fragment>
  )
}
