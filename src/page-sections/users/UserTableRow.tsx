import { MouseEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
// MUI
import Avatar from '@mui/material/Avatar'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
// MUI ICON COMPONENTS
import Edit from '@mui/icons-material/Edit'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
// CUSTOM COMPONENTS
import FlexBox from '@/components/flexbox/FlexBox'
import { TableMoreMenuItem, TableMoreMenu } from '@/components/table'
// DATA TYPES
import type { User } from '@/types/User'

// ==============================================================
interface Props {
  user: User
  isSelected: boolean
  handleDeleteUser: (id: string) => void
  handleSelectRow: (_: MouseEvent, name: string) => void
}
// ==============================================================

export default function UserTableRow({
  user,
  isSelected,
  handleSelectRow,
  handleDeleteUser,
}: Props) {
  const navigate = useNavigate()
  const [openMenuEl, setOpenMenuEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setOpenMenuEl(event.currentTarget)
  }, [])

  const handleCloseOpenMenu = useCallback(() => {
    setOpenMenuEl(null)
  }, [])

  const handleEdit = useCallback(() => {
    handleCloseOpenMenu()
    navigate('/dashboard/add-user')
  }, [navigate, handleCloseOpenMenu])

  const handleDelete = useCallback(() => {
    handleCloseOpenMenu()
    handleDeleteUser(user.id)
  }, [handleCloseOpenMenu, handleDeleteUser, user.id])

  const handleCheck = useCallback(
    (event: MouseEvent) => handleSelectRow(event, user.id),
    [handleSelectRow, user.id]
  )

  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox size="small" color="primary" checked={isSelected} onClick={handleCheck} />
      </TableCell>

      <TableCell padding="normal">
        <FlexBox alignItems="center" gap={2}>
          <Avatar variant="rounded" src={user.avatar} alt={user.name} />

          <div>
            <Typography
              variant="body2"
              sx={{
                mb: 0.25,
                fontWeight: 500,
                cursor: 'pointer',
                color: 'text.primary',
                ':hover': { textDecoration: 'underline' },
              }}
            >
              {user.name}
            </Typography>

            <Typography variant="caption">#{user.id.substring(0, 11)}</Typography>
          </div>
        </FlexBox>
      </TableCell>

      <TableCell padding="normal">{user.email}</TableCell>
      <TableCell padding="normal">{user.company}</TableCell>
      <TableCell padding="normal">{user.role}</TableCell>

      <TableCell padding="normal">
        <TableMoreMenu
          open={openMenuEl}
          handleOpen={handleOpenMenu}
          handleClose={handleCloseOpenMenu}
        >
          <TableMoreMenuItem Icon={Edit} title="Edit" handleClick={handleEdit} />
          <TableMoreMenuItem Icon={DeleteOutline} title="Delete" handleClick={handleDelete} />
        </TableMoreMenu>
      </TableCell>
    </TableRow>
  )
}
