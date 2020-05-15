import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import useToken from '../../hooks/useToken'
import analytics from '../../utils/analytics'
import { addWorkout, home, workouts } from '../../constants/routes'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        cursor: 'pointer'
    },
    menuItem: {
        marginLeft: theme.spacing(2),
        cursor: 'pointer'
    }
}))

const NavBar = () => {
    const classes = useStyles()
    const { isAuthenticated } = useToken()
    const { loginWithRedirect, logout } = useAuth()
    const history = useHistory()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography variant="h6" className={classes.title} onClick={() => history.push(home)}>
                            Home
                        </Typography>
                        <Typography className={classes.menuItem} onClick={() => history.push(workouts)}>
                            Workouts
                        </Typography>
                        {isAuthenticated && (
                            <Typography className={classes.menuItem} onClick={() => history.push(addWorkout)}>
                                Create a Workout
                            </Typography>
                        )}
                    </Box>
                    <Box display="flex" flex={1} flexDirection="row" alignItems="center" justifyContent="flex-end">
                        {!isAuthenticated && (
                            <Typography
                                className={classes.menuItem}
                                onClick={() => {
                                    loginWithRedirect({})
                                    analytics.track('login')
                                }}>
                                Login
                            </Typography>
                        )}
                        {isAuthenticated && (
                            <Typography
                                className={classes.menuItem}
                                onClick={() => {
                                    logout()
                                    analytics.track('logout')
                                }}>
                                Logout
                            </Typography>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
