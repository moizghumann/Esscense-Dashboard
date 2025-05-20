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
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useSupabase } from '@/contexts/supabase'
import { detectBrowser, IBrowserDetection } from '@/utils/browserDetection'
import TotalUsers from '@/page-sections/dashboards/analytics/TotalUsers'

export default function Analytics1PageView() {
  const { user } = useUser()
  const { supabase } = useSupabase()

  useEffect(() => {
    const upsertUserProfile = async () => {
      // Guard clause: Ensure Supabase client and essential user details are available.
      if (!supabase || !user?.id || !user?.fullName) {
        console.error('Supabase client or user details not available yet.')
        return // Exit if dependencies aren't ready
      }

      try {
        // 1. Check if a user profile already exists for this user_id
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('id') // Select a minimal field, like 'id', just to check existence
          .eq('user_id', user.id) // Match against the authenticated user's ID
          .maybeSingle() // Use maybeSingle to return null if no user found, instead of erroring

        // Handle potential errors during the select query
        if (selectError) {
          console.error(
            'Error checking for existing user:',
            selectError.message
          )
          return // Exit the function if the check failed
        }

        // 2. If no user profile exists, insert a new one
        if (!existingUser) {
          const { error: insertError } = await supabase.from('users').insert([
            {
              name: user.fullName, // Insert the user's full name
            },
          ])

          // Handle potential errors during the insert operation
          if (insertError) {
            // Specifically check for unique constraint violation (code 23505 for PostgreSQL)
            // This can happen in race conditions even with the check above.
            if (insertError.code === '23505') {
              console.log(
                'User already exists (detected by unique constraint).'
              )
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
          // 3. If user already exists, log it and do nothing
          console.log(
            `User profile for ${user.id} already exists (ID: ${existingUser.id}). No action needed.`
          )
        }
      } catch (error) {
        // Catch any unexpected errors during the process
        console.error(
          'An unexpected error occurred during user profile upsert:',
          error
        )
      }
    }

    const updateUserSession = async () => {
      try {
        // 1. Debug the inputs
        const sessionInfo = detectBrowser()

        if (!supabase || !user?.id) {
          console.error('Missing supabase client or user ID')
          return
        }

        // 2. Check if we can read the user first (tests RLS for read)
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('id, user_id, user_session')
          .eq('user_id', user.id)
          .single()

        if (fetchError) {
          console.error('Cannot read user data - likely an RLS issue')
          return
        }

        // 3. Try the update without the throwOnError
        const { data: updated, error: updateError } = await supabase
          .from('users')
          .update({ user_session: sessionInfo })
          .eq('user_id', user.id)
          .select()

        if (updateError) {
          console.error('Update failed with error:', updateError)
          return
        }

        if (!updated || updated.length === 0) {
          console.warn('Update succeeded but no rows were affected')
        }
      } catch (error) {
        console.error('Unexpected error during user session update:', error)
      }
    }

    // Execute the upsert function
    upsertUserProfile()
    updateUserSession()

    // Dependencies: This effect should re-run if the Supabase client instance changes,
    // or if the user's ID or full name changes.
  }, [supabase, user?.id, user?.fullName])

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
