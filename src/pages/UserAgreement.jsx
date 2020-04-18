import React from 'react'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

const UserAgreement = () => {
    return (
        <Box>
            <Typography variant="h2">User Agreement</Typography>
            <Typography>Blah</Typography>
            <FormControlLabel
                value="start"
                control={<Checkbox color="primary" />}
                label="I agree"
                labelPlacement="start"
            />
        </Box>
    )
}

export default UserAgreement
