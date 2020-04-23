import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const palette = {
    primary: {
        main: '#026afe'
    }
}

// I had customized the width, but that broke the date time picker.
// Leaving this in case we want to add other styles.
const MuiButton = {
    root: {}
}

const overrides = { MuiButton }

const theme = createMuiTheme({
    overrides,
    palette
})

export default theme
