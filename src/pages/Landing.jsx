import React from 'react'
import T from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'

import useAuth from '../hooks/useAuth'
import { appName } from '../constants/app'
const useStyles = makeStyles({
    root: {
        width: 200
    }
})

const Landing = ({ history: { push } }) => {
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

Landing.propTypes = {
    history: T.shape({ push: T.func.isRequired })
}

export default withRouter(Landing)
