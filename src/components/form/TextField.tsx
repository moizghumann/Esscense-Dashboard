import { useFormContext, Controller } from 'react-hook-form'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'

// ==============================================================
type Props = TextFieldProps & { name: string }
// ==============================================================

export default function TextField({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          type={type}
          value={field.value}
          onChange={field.onChange}
          error={Boolean(error)}
          helperText={error?.message || helperText}
          {...other}
        />
      )}
    />
  )
}
