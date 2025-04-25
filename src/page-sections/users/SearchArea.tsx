import { ChangeEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
// MUI
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
// MUI ICON COMPONENT
import Search from '@mui/icons-material/Search'
// CUSTOM COMPONENTS
import FlexBetween from '@/components/flexbox/FlexBetween'
// CUSTOM ICON COMPONENTS
import Apps from '@/icons/Apps'
import FormatBullets from '@/icons/FormatBullets'

// STYLED COMPONENTS
const SearchTextField = styled(TextField)({
  maxWidth: 400,
  width: '100%',
})

const ActionButtons = styled('div')(({ theme }) => ({
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: theme.palette.grey[50],
  ...theme.applyStyles('dark', { backgroundColor: theme.palette.grey[700] }),
}))

// ==========================================================================================
interface Props {
  value?: string
  gridRoute: string
  listRoute: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
// ==========================================================================================

export default function SearchArea({ value = '', onChange, gridRoute, listRoute }: Props) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeColor = (path: string) => (pathname === path ? 'primary.main' : 'grey.400')

  return (
    <FlexBetween gap={1} my={3}>
      {/* SEARCH BOX */}
      <SearchTextField
        value={value}
        onChange={onChange}
        placeholder="Search..."
        slotProps={{ input: { startAdornment: <Search /> } }}
      />

      {/* NAVIGATION BUTTONS */}
      <ActionButtons className="actions">
        <IconButton disableRipple onClick={() => navigate(listRoute)}>
          <FormatBullets sx={{ color: activeColor(listRoute) }} />
        </IconButton>

        <IconButton disableRipple onClick={() => navigate(gridRoute)}>
          <Apps sx={{ color: activeColor(gridRoute) }} />
        </IconButton>
      </ActionButtons>
    </FlexBetween>
  )
}
