import { useState } from 'react'
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
import { useNavigate } from 'react-router'

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
  const { signInWithEmail, signInWithGoogle } = useTheAuth()
  const { session } = useSession()
  const { signOut, setActive } = useClerk()

  const navigate = useNavigate()

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
    console.log(session, 'session')
    try {
      if (session) {
        await signOut()
      }
      const result = await signInWithEmail(values.email, values.password)
      if (result?.status === 'complete') {
        console.log(result)
        console.log('Sign in completed')
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId })
        }
        navigate('/dashboard', { replace: true })
      } else {
        console.log('Sign in not completed:', result?.status)
      }
    } catch (error) {
      console.error('Sign in error:', error)
    }
  })

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
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
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
