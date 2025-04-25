import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import FlexBox from '@/components/flexbox/FlexBox'

// ==============================================================
interface Props {
  item: {
    image: string
    company: string
    position: string
  }
}
// ==============================================================

export default function ListItemCard({ item }: Props) {
  return (
    <FlexBox alignItems="center" gap="1rem">
      <Avatar variant="square" src={item.image} alt="Logo" sx={{ width: 36, height: 36 }} />

      <div>
        <Typography variant="body2" fontWeight={500}>
          {item.company}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {item.position}
        </Typography>
      </div>
    </FlexBox>
  )
}
