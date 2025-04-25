import { Ref } from 'react'
import { InputBaseProps } from '@mui/material/InputBase'
// CUSTOM ICON COMPONENT
import SearchIcon from '@/icons/SearchIcon'
// STYLED COMPONENT
import { StyledInputBase } from './styles'

// ========================================================================
interface SearchInputProps extends InputBaseProps {
  bordered?: boolean
  ref?: Ref<HTMLInputElement>
}
// ========================================================================

export default function SearchInput({ ref, bordered = true, ...props }: SearchInputProps) {
  // SEARCH ICON
  const ADORNMENT = <SearchIcon sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />

  return <StyledInputBase ref={ref} border={bordered} startAdornment={ADORNMENT} {...props} />
}
