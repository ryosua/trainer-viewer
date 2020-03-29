import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import DateTimePicker from '../components/DateTimePicker'

const CreateWorkout = () => {
    const [selectedDate, handleDateChange] = useState(new Date())
    return (
        <Grid container>
            <Grid item sm={0} md={3} />
            <Grid item sm={12} md={6}>
                <Box display="flex" flex={1} flexDirection="column">
                    <Typography variant="h2">Create Workout</Typography>
                    <TextField label={'Title'} />
                    <TextField label={'Link'} />
                    <Box my={2}>
                        <DateTimePicker value={selectedDate} handleDateChange={handleDateChange} />
                    </Box>
                    <Button variant="outlined">Create Workout</Button>
                </Box>
            </Grid>
            <Grid item sm={0} md={3} />
        </Grid>
    )
}

export default CreateWorkout
