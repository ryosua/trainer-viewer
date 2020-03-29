import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const MuiButton = {
    root: {
        width: 200
    }
}

const overrides = { MuiButton }

const theme = createMuiTheme({ overrides })

export default theme
