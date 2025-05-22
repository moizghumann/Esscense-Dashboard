import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
// CUSTOM PAGE SECTION COMPONENTS
import Footer from '../../_common/Footer'
import TopQueries from '../TopQueries'
import TopReferral from '../TopReferral'
import ChartFilters from '../ChartFilters'
import CompleteGoal from '../CompleteGoal'
import CompleteRate from '../CompleteRate'
import TopPerforming from '../TopPerforming'
import SessionBrowser from '../SessionBrowser'
import SalesByCountry from '../SalesByCountry'
import { useEffect, useRef } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useSupabase } from '@/providers/supabase'
import { detectBrowser, IBrowserDetection } from '@/utils/browserDetection'
import TotalUsers from '@/page-sections/dashboards/analytics/TotalUsers'

export default function Analytics1PageView() {
  const { user } = useUser()
  const supabase = useSupabase()
  const hasProcessedUser = useRef(false)

  const updateUserSession = async (sessionInfo?: IBrowserDetection) => {
    if (!supabase || !user?.id) return

    try {
      const { data: updated, error: updateError } = await supabase
        .from('users')
        .update({ user_session: sessionInfo })
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Update failed with error:', updateError)
        return
      }

      if (!updated) {
        console.warn('Update succeeded but no rows were affected')
      }
    } catch (error) {
      console.error('Unexpected error during user session update:', error)
    }
  }

  useEffect(() => {
    const upsertUserProfile = async () => {
      // Skip if already processed or missing dependencies
      if (
        hasProcessedUser.current ||
        !supabase ||
        !user?.id ||
        !user?.fullName
      ) {
        console.log('Skipping user profile upsert')
        return
      }

      try {
        // 1. Check if a user profile already exists for this user_id
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle()

        if (selectError) {
          console.error('Error checking for existing user:', selectError)
          return
        }

        if (!existingUser) {
          // 2. If user doesn't exist, insert a new record
          const { error: insertError } = await supabase.from('users').insert([
            {
              user_id: user.id,
              name: user.fullName,
              // email: user.primaryEmailAddress?.emailAddress,
              // created_at: new Date().toISOString(),
            },
          ])

          if (insertError) {
            if (insertError.code === '23505') {
              console.log('User already exists (race condition detected).')
            } else {
              console.error(
                'Failed to insert user profile:',
                insertError.message
              )
            }
          } else {
            console.log(`Successfully inserted profile for user ${user.id}.`)
          }
        } else {
          console.log(
            `User profile for ${user.id} already exists (ID: ${existingUser.id}). No action needed.`
          )
        }

        // Mark as processed to prevent duplicate operations
        hasProcessedUser.current = true
      } catch (error) {
        console.error(
          'An unexpected error occurred during user profile upsert:',
          error
        )
      }
    }

    // Execute the functions
    upsertUserProfile()
    updateUserSession(detectBrowser())
  }, [user?.id, user?.fullName, supabase])

  return (
    <div className="pt-2 pb-4">
      <Grid container spacing={3}>
        {/* DIFFERENT DATA SHOW WITH CHART */}
        <Grid size={{ md: 8, xs: 12 }}>
          <ChartFilters />
        </Grid>

        {/* LIVER ONLINE USER CHART CARD */}
        <Grid size={{ md: 4, xs: 12 }}>
          <TotalUsers />
        </Grid>

        {/* VISIT BY TOP REFERRAL SOURCE CHART CARD */}
        <Grid size={{ md: 8, xs: 12 }}>
          <TopReferral />
        </Grid>

        {/* SESSION BY BROWSER CHART CARD */}
        <Grid size={{ md: 4, xs: 12 }}>
          <SessionBrowser />
        </Grid>

        {/* COMPLETE GOAL AND RATES CHART CARD */}
        <Grid size={{ lg: 3, xs: 12 }}>
          <Stack
            spacing={3}
            direction={{ lg: 'column', sm: 'row', xs: 'column' }}
          >
            <CompleteGoal />
            <CompleteRate />
          </Stack>
        </Grid>

        {/* SALES BY COUNTRY CHART CARD */}
        <Grid size={{ lg: 9, xs: 12 }}>
          <SalesByCountry />
        </Grid>

        {/* TOP PERFORMING PAGES CHART CARD */}
        <Grid size={{ md: 6, xs: 12 }}>
          <TopPerforming />
        </Grid>

        {/* TOP QUERIES CHART CARD */}
        <Grid size={{ md: 6, xs: 12 }}>
          <TopQueries />
        </Grid>

        {/* FOOTER CARD */}
        <Grid size={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  )
}
