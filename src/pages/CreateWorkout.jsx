import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const CreateWorkout = () => (
    <>
        <Typography variant="h2">Create Workout</Typography>
        <TextField label={'Title'} />
        <TextField label={'Link'} />
        <Button>Create Workout</Button>
    </>
)

export default CreateWorkout
