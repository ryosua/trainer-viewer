import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// I had customized the width, but that broke the date time picker.
// Leaving this in case we want to add other styles.
const MuiButton = {
    root: {}
}

const overrides = { MuiButton }

const theme = createMuiTheme({ overrides })

export default theme
