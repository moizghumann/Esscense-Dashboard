import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
// MUI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// CUSTOM COMPONENTS
import Link from '@/components/link'
// CUSTOM SESSIONS LAYOUT
import Layout from '../Layout'
import { FormProvider, TextField } from '@/components/form'
import { StyledDivider } from '../styles'
import { useSignUp } from '@clerk/clerk-react'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(3, 'First name should not be less than 3 characters')
    .max(50, 'First name should not exceed 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(3, 'Last name should not be less than 3 characters')
    .max(50, 'Last name should not exceed 50 characters'),
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

export default function RegisterPageView() {
  const navigate = useNavigate()
  const { signUp, isLoaded } = useSignUp()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods

  const handleFormSubmit = handleSubmit(async (values) => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      navigate('/verify-code')
    } catch (error: any) {
      console.log(error.message)
    }
  })

  return (
    <Layout>
      <Box maxWidth={550} p={4}>
        <Typography
          variant="body1"
          fontWeight={600}
          fontSize={{ sm: 30, xs: 25 }}
        >
          Sign up for 14 days free trial
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
          No risk, no obligations, no credit-card required.
        </Typography>

        <FormProvider methods={methods} onSubmit={handleFormSubmit}>
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid size={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Register with your email ID
              </Typography>
              <TextField
                fullWidth
                placeholder="First Name"
                type="text"
                name="firstName"
                autoComplete="given-name"
              />
            </Grid>

            {/* Last Name */}
            <Grid size={12}>
              <TextField
                fullWidth
                placeholder="Last Name"
                type="text"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>

            {/* Email */}
            <Grid size={12}>
              <TextField
                fullWidth
                placeholder="Enter your work email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>

            {/* Password */}
            <Grid size={12}>
              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid size={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!isValid}
                loading={isSubmitting}
              >
                Sign up via Email
              </Button>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                By signing up, you agree{' '}
                <Box fontWeight={500} component={Link} href="#">
                  Terms of Service
                </Box>{' '}
                & your consent to receiving email communications from Sales
                handy.
              </Typography>
            </Grid>
          </Grid>
        </FormProvider>

        <StyledDivider
          onClick={() => navigate('/login')}
          sx={{ cursor: 'pointer', ':hover': { color: 'primary.main' } }}
        >
          Already have an account?
        </StyledDivider>
      </Box>
    </Layout>
  )
}
