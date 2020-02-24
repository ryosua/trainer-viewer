import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        width: 200
    }
})

const SignUp = () => {
    const classes = useStyles()
    return (
        <Box display="flex" flex={1} justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
                <TextField label="Username" />
                <TextField label="Password" />
                <TextField label="Confirm Password" />
                <Button classes={classes}>Create Account</Button>
            </Box>
        </Box>
    )
}

export default SignUp
