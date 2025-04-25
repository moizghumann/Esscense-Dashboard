import { useCallback, useState } from 'react'
// MUI
import IconButton from '@mui/material/IconButton'
// MUI ICON COMPONENTS
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
// STYLED COMPONENT
import { StyledInputBase } from './styles'

// ==============================================================
export interface CounterProps {
  colors?: 'light' | 'dark'
  button?: 'plain' | 'outlined'
  variant?: 'rounded' | 'circular'
  min?: number
  max?: number
  step?: number
  count?: number
  disabled?: boolean
  onChange?: (value: number) => void
}
// ==============================================================

export default function Counter({
  count = 1,
  colors = 'light',
  button = 'plain',
  variant = 'rounded',
  min = 1,
  max = Infinity,
  disabled = false,
  onChange,
}: CounterProps) {
  const [value, setValue] = useState(count)

  const validateValue = useCallback(
    (newValue: number) => Math.min(Math.max(newValue, min), max),
    [min, max]
  )

  const handleIncrement = useCallback(() => {
    if (disabled) return

    setValue((prevValue) => {
      const newValue = validateValue(prevValue + 1)
      if (newValue !== prevValue && onChange) {
        onChange(newValue)
      }

      return newValue
    })
  }, [validateValue, onChange, disabled])

  const handleDecrement = useCallback(() => {
    if (disabled) return

    setValue((prevValue) => {
      const newValue = validateValue(prevValue - 1)
      if (newValue !== prevValue && onChange) {
        onChange(newValue)
      }

      return newValue
    })
  }, [validateValue, onChange, disabled])

  // QUANTITY INCREMENT BUTTON
  const StartAdornment = (
    <IconButton onClick={handleIncrement} disabled={disabled || value >= max}>
      <Add fontSize="small" />
    </IconButton>
  )

  // QUANTITY DECREMENT BUTTON
  const EndAdornment = (
    <IconButton onClick={handleDecrement} disabled={disabled || value <= min}>
      <Remove fontSize="small" />
    </IconButton>
  )

  return (
    <StyledInputBase
      type="number"
      min={min}
      max={max}
      value={value}
      colors={colors}
      button={button}
      variant={variant}
      disabled={disabled}
      endAdornment={EndAdornment}
      startAdornment={StartAdornment}
    />
  )
}
