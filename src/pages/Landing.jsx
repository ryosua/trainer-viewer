import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import useToken from '../hooks/useToken'
import analytics from '../utils/analytics'

import { ReactComponent as Logo } from '../assets/logo.svg'

const useStyles = makeStyles((theme) => ({
    logo: {
        [theme.breakpoints.down('sm')]: {
            width: 200
        },
        [theme.breakpoints.up('md')]: {
            width: 350
        }
    },
    video: {
        [theme.breakpoints.down('sm')]: {
            width: 280,
            height: 157.5
        },
        [theme.breakpoints.up('md')]: {
            width: 560,
            height: 315
        }
    }
}))

const Landing = () => {
    const classes = useStyles()
    const { isAuthenticated } = useToken()
    const { loginWithRedirect } = useAuth()
    return (
        <Box display="flex" flex={1} justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Logo className={classes.logo} />
                <Box m={5}>
                    <iframe
                        className={classes.video}
                        title="video"
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
