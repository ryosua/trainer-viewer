import React from 'react'
import Box from '@material-ui/core/Box'

import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import useToken from '../hooks/useToken'
import analytics from '../utils/analytics'

import { ReactComponent as Logo } from '../assets/logo.svg'

const Landing = () => {
    const { isAuthenticated } = useToken()
    const { loginWithRedirect } = useAuth()
    return (
        <Box display="flex" flex={1} justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Logo />
                <Box m={5}>
                    <iframe
                        title="video"
                        width="560px"
                        height="315px"
                        src="https://www.youtube.com/embed/LiRHH3-yk8g"
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
