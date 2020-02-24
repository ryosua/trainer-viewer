import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        width: 200
    }
})

const Landing = () => {
    const classes = useStyles()
    return (
        <Box display="flex" flex={1} justifyContent="center">
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h3">Stoked</Typography>
                <Typography>Meet people while exploring the outdoors</Typography>
                <Button classes={classes}>Signup</Button>
            </Box>
        </Box>
    )
}

export default Landing
