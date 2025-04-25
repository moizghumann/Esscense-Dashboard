import { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import FlexBetween from '@/components/flexbox/FlexBetween'

// ==============================================================
interface Props {
  title: string
  value: ReactNode
}
// ==============================================================

export default function ListItem({ title, value }: Props) {
  return (
    <FlexBetween>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>

      {typeof value === 'string' ? (
        <Typography variant="body2" fontWeight={500}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </FlexBetween>
  )
}
