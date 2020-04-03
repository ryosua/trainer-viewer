import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import cloneDeep from 'lodash/cloneDeep'
import remove from 'lodash/remove'

import DateTimePicker from '../components/DateTimePicker'
import AddWorkoutMutation from '../graphql/AddWorkoutMutation'
import ViewWorkoutsQuery from '../graphql/ViewWorkoutsQuery'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}))

const AddWorkout = () => {
    const classes = useStyles()

    const [link, handleLinkChange] = useState('')
    const [requiredEquipment, handleRequiredEquipmentChange] = useState('')
    const [selectedDate, handleDateChange] = useState(new Date())
    const [title, handleTitleChange] = useState('')
    const [workoutCategories, setWorkoutCategories] = useState([])

    const [addWorkoutMutation] = useMutation(AddWorkoutMutation, {
        update(cache, { data: { addWorkout } }) {
            // ViewWorkoutsQuery is called on Landing.
            const { workouts } = cloneDeep(cache.readQuery({ query: ViewWorkoutsQuery }))

            cache.writeQuery({
                query: ViewWorkoutsQuery,
                data: { workouts: workouts.concat(addWorkout) }
            })
        }
    })

    const handleAddWorkout = () => {
        addWorkoutMutation({ variables: { title, requiredEquipment, startTime: selectedDate.toISOString(), link } })
        handleTitleChange('')
        handleLinkChange('')
        handleRequiredEquipmentChange('')
    }
    const handleTextFieldChange = handler => e => handler(e.target.value)
    const handleWorkoutCategoriesChange = e => {
        const [workoutCategory] = e.target.value
        if (!workoutCategories.includes(workoutCategory)) {
            if (workoutCategories.length < 2) {
                setWorkoutCategories([...workoutCategories, workoutCategory])
            }
        } else {
            const workoutCategoriesCopy = cloneDeep(workoutCategories)
            const newWorkoutCategories = remove(workoutCategoriesCopy, wc => wc === workoutCategory)
            setWorkoutCategories(newWorkoutCategories)
        }
    }

    console.log(workoutCategories)

    return (
        <Grid container>
            <Grid item sm={false} md={3} />
            <Grid item sm={12} md={6}>
                <Box display="flex" flex={1} flexDirection="column" p={5}>
                    <Typography variant="h2">Create Workout</Typography>
                    <TextField label={'Title'} value={title} onChange={handleTextFieldChange(handleTitleChange)} />
                    <TextField label={'Link'} value={link} onChange={handleTextFieldChange(handleLinkChange)} />
                    <TextField
                        label={'Required equipment'}
                        value={requiredEquipment}
                        onChange={handleTextFieldChange(handleRequiredEquipmentChange)}
                        placeholder="Water bottle, towel"
                    />
                    <Box my={2}>
                        <DateTimePicker value={selectedDate} handleDateChange={handleDateChange} />
                    </Box>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Workout Catagories</InputLabel>
                        <Select multiple value={workoutCategories} onChange={handleWorkoutCategoriesChange} label="Age">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem key={1} value={1}>
                                One
                            </MenuItem>
                            <MenuItem key={2} value={2}>
                                Two
                            </MenuItem>
                            <MenuItem key={3} value={3}>
                                Three
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={handleAddWorkout} disabled={!title || !link}>
                        Create Workout
                    </Button>
                </Box>
            </Grid>
            <Grid item sm={false} md={3} />
        </Grid>
    )
}

export default AddWorkout
