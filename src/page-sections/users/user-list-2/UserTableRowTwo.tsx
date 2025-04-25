import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
// STYLED COMPONENTS
import { BodyTableCell, BodyTableRow } from './styles'
// CUSTOM DATA TYPES
import type { User } from '@/types/User'

// ==============================================================
interface Props {
  user: User
  isSelected: boolean
  handleSelectUser: () => void
}
// ==============================================================

export default function UserTableRowTwo({ user, isSelected, handleSelectUser }: Props) {
  return (
    <BodyTableRow key={user.id} active={isSelected} onClick={handleSelectUser}>
      <BodyTableCell>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src={user.avatar} variant="rounded" sx={{ width: 32, height: 32 }} />

          <Typography variant="body2" fontSize={13} color="text.primary">
            {user.name}
          </Typography>
        </Stack>
      </BodyTableCell>

      <BodyTableCell>{user.position}</BodyTableCell>
      <BodyTableCell>{user.company}</BodyTableCell>
      <BodyTableCell>{user.email}</BodyTableCell>
      <BodyTableCell>{user.phone}</BodyTableCell>
    </BodyTableRow>
  )
}
