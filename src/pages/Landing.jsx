import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import useAuth from '../hooks/useAuth'
import { appName } from '../constants/app'
import useWorkouts from '../hooks/api/useWorkouts'

const useStyles = makeStyles({
    root: {
        width: 200
    }
})

const Landing = () => {
    // Prefetch workouts so we can optimistically update the add workout.
    useWorkouts()

    const classes = useStyles()
    const { isAuthenticated, loginWithRedirect } = useAuth()
    return (
        <Box display="flex" flex={1} justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3">{appName}</Typography>
                <Typography>Workout at home</Typography>
                {!isAuthenticated && (
                    <Button classes={classes} onClick={() => loginWithRedirect({})}>
                        Signup
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default Landing
