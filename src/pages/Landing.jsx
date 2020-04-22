import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import useToken from '../hooks/useToken'
import { appName } from '../constants/app'
import analytics from '../utils/analytics'

const Landing = () => {
    const { isAuthenticated } = useToken()
    const { loginWithRedirect } = useAuth()
    return (
        <Box display="flex" flex={1} justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3">{appName}</Typography>
                <Box m={5}>
                    <iframe
                        data-test="weather-story-card-video"
                        title="video"
                        width="560px"
                        height="315px"
                        src="https://www.youtube.com/embed/pNx7jZrix6Y"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </Box>
                {!isAuthenticated && (
                    <Button
                        onClick={() => {
                            loginWithRedirect({})
                            analytics.track('signup')
                        }}>
                        Signup
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default Landing
