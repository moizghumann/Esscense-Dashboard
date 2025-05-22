import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// MUI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
// MUI ICON COMPONENT
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
// CUSTOM DEFINED HOOK
import { useTheAuth } from '@/hooks/useTheAuth'
// CUSTOM LAYOUT COMPONENT
import Layout from '../Layout'
// CUSTOM COMPONENTS
import Link from '@/components/link'
import { FlexBetween, FlexBox } from '@/components/flexbox'
import { FormProvider, TextField } from '@/components/form'
// CUSTOM ICON COMPONENTS
import GoogleIcon from '@/icons/GoogleIcon'
import Twitter from '@/icons/social/Twitter'
import Facebook from '@/icons/social/Facebook'
// STYLED COMPONENTS
import { SocialButton, StyledDivider } from '../styles'
import { useClerk, useSession } from '@clerk/clerk-react'
import { useNotifications } from '@toolpad/core/useNotifications'
import { detectBrowser, IBrowserDetection } from '@/utils/browserDetection'
import { useSupabase } from '@/providers/supabase'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  remember: Yup.boolean().optional(),
})

export default function LoginPageView() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { signInWithEmail, signInWithGoogle } = useTheAuth()
  const { session } = useSession()
  const supabase = useSupabase()
  const { signOut, setActive } = useClerk()
  const notifications = useNotifications()

  const handleGoogle = async () => {
    await signInWithGoogle()
  }

  const initialValues = {
    email: '',
    password: '',
    remember: true,
  }

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const handleFormSubmit = handleSubmit(async (values) => {
    try {
      if (session) {
        await signOut()
      }
      const result = await signInWithEmail(values.email, values.password)
      if (result?.status === 'complete') {
        console.log('Sign in completed')

        if (result.createdSessionId) {
          const sessionInfo = detectBrowser()
          await setActive({ session: result.createdSessionId })
          updateUserSession(sessionInfo)
        }
      } else {
        console.log('Sign in not completed:', result?.status)
        notifications.show('Login failed, please try again', {
          severity: 'error',
          autoHideDuration: 5000,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred during sign in')
      }
    }
  })

  const updateUserSession = async (sessionInfo?: IBrowserDetection) => {
    if (session?.user?.id) {
      return supabase
        .from('users')
        .update({ user_session: sessionInfo })
        .eq('user_id', session.user.id)
    }
    return Promise.resolve()
  }

  return (
    <Layout login>
      <Box maxWidth={550} p={4}>
        <Typography variant="h4" fontWeight={600} fontSize={{ sm: 30, xs: 25 }}>
          Sign In
        </Typography>

        <Typography
          variant="body2"
          fontWeight={500}
          mt={1}
          mb={6}
          color="text.secondary"
        >
          New user?{' '}
          <Box fontWeight={500} component={Link} href="/register">
            Create an Account
          </Box>
        </Typography>

        <FormProvider methods={methods} onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="body1" fontSize={16} mb={1.5}>
                Login with your email id
              </Typography>

              <TextField
                fullWidth
                name="email"
                placeholder="Enter your work email"
                onClick={() => setError('')}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onClick={() => setError('')}
                slotProps={{
                  input: {
                    endAdornment: (
                      <ButtonBase
                        disableRipple
                        disableTouchRipple
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </ButtonBase>
                    ),
                  },
                }}
              />

              {error && (
                <Box
                  mt={1}
                  p={1}
                  // bgcolor="error.light"
                  borderRadius={1}
                  textAlign="start"
                >
                  {/* {error === 'user_not_found' ? (
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color="error.500"
                    >
                      Email not found
                    </Typography>
                  ) : ( */}
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color="error.500"
                  >
                    {error}
                  </Typography>
                  {/* )} */}
                </Box>
              )}

              <FlexBetween my={1}>
                <FlexBox alignItems="center" gap={1}>
                  <Checkbox
                    sx={{ p: 0 }}
                    name="remember"
                    checked={watch('remember')}
                    onChange={(e) => setValue('remember', e.target.checked)}
                  />
                  <Typography variant="body2" fontWeight={500}>
                    Remember me
                  </Typography>
                </FlexBox>

                <Box
                  fontSize={13}
                  component={Link}
                  fontWeight={500}
                  color="error.500"
                  href="/forget-password"
                >
                  Forget Password?
                </Box>
              </FlexBetween>
            </Grid>

            <Grid size={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={!isValid}
                loading={isSubmitting}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </FormProvider>

        <StyledDivider>OR</StyledDivider>

        <FlexBox justifyContent="center" flexWrap="wrap" gap={2}>
          <SocialButton onClick={handleGoogle}>
            <GoogleIcon className="icon" />
          </SocialButton>

          <SocialButton>
            <Facebook className="icon facebook" />
          </SocialButton>

          <SocialButton>
            <Twitter className="icon twitter" />
          </SocialButton>
        </FlexBox>
      </Box>
    </Layout>
  )
}
