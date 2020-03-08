import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2)
    }
}))

const NavMenu = () => {
    const classes = useStyles()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = event => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    const navigateTo = path => {
        history.push(path)
        handleClose()
    }

    return (
        <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => navigateTo('/hikes')}>Hikes</MenuItem>
            </Menu>
        </div>
    )
}

export default NavMenu
