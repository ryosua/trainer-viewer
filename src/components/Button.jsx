import React from 'react'
import MUIButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    button: {
        width: 200
    }
}))

const Button = ({ children, ...rest }) => {
    const classes = useStyles()
    return (
        <MUIButton classes={{ root: classes.button }} variant="outlined" {...rest}>
            {children}
        </MUIButton>
    )
}

export default Button
