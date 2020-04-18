import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import { appName } from '../constants/app'
import useWorkouts from '../hooks/api/useWorkouts'

const Landing = () => {
    // Prefetch workouts so we can optimistically update the add workout.
    useWorkouts()

    const { isAuthenticated, loginWithRedirect } = useAuth()
    return (
        <Box display="flex" flex={1} justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3">{appName}</Typography>
                <Typography>Workout at home</Typography>
                {!isAuthenticated && <Button onClick={() => loginWithRedirect({})}>Signup</Button>}
            </Box>
        </Box>
    )
}

export default Landing
