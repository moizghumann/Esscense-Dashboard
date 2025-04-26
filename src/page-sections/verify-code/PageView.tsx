import { FormEvent, useCallback, useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
// MUI
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded'
// CUSTOM COMPONENTS
import GradientBackground from '@/components/gradient-background'
// STYLED COMPONENTS
import { MainContent } from './styles'
// CLERK
import { useSignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router'

export default function VerifyCodePageView() {
  // const [otp, setOtp] = useState('534352')
  const [code, setCode] = useState('')
  const { isLoaded, signUp, setActive } = useSignUp()

  const navigate = useNavigate()

  const handleVerify = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!isLoaded) return

      try {
        // Use the code the user provided to attempt verification
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code,
        })

        // If verification was completed, set the session to active
        // and redirect the user
        if (signUpAttempt.status === 'complete') {
          await setActive({ session: signUpAttempt.createdSessionId })
          navigate('/')
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(signUpAttempt, null, 2))
        }
      } catch (err: any) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error('Error:', JSON.stringify(err, null, 2))
      }
    },
    [code]
  )

  return (
    <GradientBackground>
      <Container>
        <MainContent>
          <div className="img-wrapper">
            <img src="/static/pages/email.svg" alt="email" width="100%" />
          </div>

          <h6 className="title">Check your email!</h6>

          <p className="description">
            Please check your email inbox for a 5-digit verification code we
            have sent to your registered email address. Enter the code in the
            field below to confirm your email and complete the verification
            process.
          </p>

          <div className="form-wrapper">
            <MuiOtpInput
              value={code}
              onChange={setCode}
              length={6}
              TextFieldsProps={{
                size: 'medium',
                sx: { marginBottom: '2rem' },
              }}
            />

            <Button size="large" fullWidth onClick={handleVerify}>
              Verify
            </Button>
          </div>

          <p className="have-code">
            Don’t have a code?{' '}
            <span className="resend" onClick={() => {}}>
              Resend code
            </span>
          </p>

          <Button
            variant="text"
            disableRipple
            startIcon={<ChevronLeftRounded />}
          >
            Return to sign in
          </Button>
        </MainContent>
      </Container>
    </GradientBackground>
  )
}
