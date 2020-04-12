import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

import Menu from './Menu'
import useAuth from '../../hooks/useAuth'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}))

const NavBar = () => {
    const classes = useStyles()
    const { isAuthenticated, loginWithRedirect, logout } = useAuth()
    const history = useHistory()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Menu />
                    <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
                        Home
                    </Typography>
                    {!isAuthenticated && (
                        <Button color="inherit" onClick={() => loginWithRedirect({})}>
                            Login
                        </Button>
                    )}
                    {isAuthenticated && (
                        <Button color="inherit" onClick={() => logout()}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar
