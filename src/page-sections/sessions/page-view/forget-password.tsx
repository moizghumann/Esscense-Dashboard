import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// MUI
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// MUI ICON COMPONENT
import NavigateBefore from '@mui/icons-material/NavigateBefore'
// CUSTOM COMPONENTS
import FlexRowAlign from '@/components/flexbox/FlexRowAlign'
import { FormProvider, TextField } from '@/components/form'
import { useEffect, useState, useMemo } from 'react'
import { useAuth, useSignIn } from '@clerk/clerk-react'

export default function ForgetPasswordPageView() {
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')

  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard')
    }
  }, [isSignedIn, navigate])

  // Create dynamic schema based on current step
  const schema = useMemo(() => {
    return yup.object().shape(
      successfulCreation
        ? {
            // Schema for second step (code + password)
            code: yup.string().required('Code is required'),
            password: yup.string().required('Password is required'),
          }
        : {
            // Schema for first step (email only)
            email: yup
              .string()
              .email('Invalid email')
              .required('Email is required'),
          }
    )
  }, [successfulCreation])

  const methods = useForm({
    defaultValues: {
      email: '',
      code: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  if (!isLoaded) {
    return null
  }

  const onSubmit = handleSubmit(async (data: any) => {
    if (!successfulCreation) {
      try {
        await signIn?.create({
          strategy: 'reset_password_email_code',
          identifier: data.email,
        })
        setSuccessfulCreation(true)
        setError('')
      } catch (err: any) {
        setError(err.errors?.[0]?.longMessage || 'An error occurred')
      }
    } else {
      try {
        const result = await signIn?.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code: data.code,
          password: data.password,
        })

        if (result?.status === 'needs_second_factor') {
          setSecondFactor(true)
          setError('')
        } else if (result?.status === 'complete') {
          setActive({ session: result.createdSessionId })
          setError('')
          navigate('/dashboard')
        }
      } catch (err: any) {
        setError(err.errors?.[0]?.longMessage || 'An error occurred')
      }
    }
  })

  return (
    <FlexRowAlign height="100%" bgcolor="background.paper">
      <Box textAlign="center" maxWidth={500} width="100%" padding={4}>
        <img src="/static/forget-passwod.svg" alt="Logo" />

        <Typography variant="h4" sx={{ mt: 2 }}>
          Forgot your password?
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ px: 3, mt: 1 }}
        >
          {!successfulCreation
            ? 'Please enter the email address associated with your account and We will email you a link to reset your password.'
            : 'Enter the code sent to your email and your new password.'}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack gap={3} mt={5}>
            {!successfulCreation ? (
              <TextField
                label="Email"
                fullWidth
                type="email"
                {...methods.register('email')}
              />
            ) : (
              <>
                <TextField
                  label="Code"
                  fullWidth
                  type="text"
                  {...methods.register('code')}
                />
                <TextField
                  label="Password"
                  fullWidth
                  type="password"
                  {...methods.register('password')}
                />
              </>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={!isValid}
              loading={isSubmitting}
            >
              {!successfulCreation ? 'Send Link' : 'Reset Password'}
            </Button>

            <Button
              disableRipple
              variant="text"
              color="secondary"
              onClick={() => navigate('/login')}
            >
              <NavigateBefore fontSize="small" /> Back to Sign In
            </Button>
          </Stack>
        </FormProvider>
      </Box>
    </FlexRowAlign>
  )
}
