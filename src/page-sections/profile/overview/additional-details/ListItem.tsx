import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { SvgIconComponent } from '@mui/icons-material'

// ===========================================================================
interface ListItemProps {
  color: string
  title: string
  subTitle: string
  Icon: SvgIconComponent
}
// ===========================================================================

export default function ListItem({ title, subTitle, Icon, color }: ListItemProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Avatar variant="rounded" sx={{ backgroundColor: alpha(color, 0.2) }}>
        <Icon sx={{ color }} />
      </Avatar>

      <div>
        <Typography variant="body2" fontSize={12} color="text.secondary">
          {title}
        </Typography>

        <Typography variant="body2" fontWeight={500} lineHeight={1.7}>
          {subTitle}
        </Typography>
      </div>
    </Stack>
  )
}
