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

import DateTimePicker from '../components/DateTimePicker'
import AddWorkoutMutation from '../graphql/AddWorkoutMutation'
import ViewWorkoutsQuery from '../graphql/ViewWorkoutsQuery'
import useWorkoutCategories from '../hooks/api/useWorkoutCategories'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
        marginBottom: theme.spacing(1)
    }
}))

const WorkoutCategoriesSelct = ({ loading, error, selectedWorkoutCategories, data, handleWorkoutCategoriesChange }) => {
    const classes = useStyles()

    if (loading || error) {
        return null
    }

    const { workoutCategories } = data

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Workout Catagories</InputLabel>
            <Select
                multiple
                value={selectedWorkoutCategories}
                onChange={handleWorkoutCategoriesChange}
                label="Workout Categories">
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {workoutCategories.map(workoutCategory => (
                    <MenuItem key={workoutCategory.id} value={workoutCategory.id}>
                        {workoutCategory.title}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

const AddWorkout = () => {
    const [link, handleLinkChange] = useState('')
    const [requiredEquipment, handleRequiredEquipmentChange] = useState('')
    const [selectedDate, handleDateChange] = useState(new Date())
    const [title, handleTitleChange] = useState('')
    const [selectedWorkoutCategories, setWorkoutCategories] = useState([])

    const { loading, error, data } = useWorkoutCategories()

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
        const workoutCategoryValues = e.target.value

        const noneOptionSelected = workoutCategoryValues.includes('')
        if (noneOptionSelected) {
            setWorkoutCategories([])
            return
        }

        if (workoutCategoryValues.length <= 2) {
            setWorkoutCategories(workoutCategoryValues)
        }
    }

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

                    <WorkoutCategoriesSelct
                        data={data}
                        loading={loading}
                        error={error}
                        selectedWorkoutCategories={selectedWorkoutCategories}
                        handleWorkoutCategoriesChange={handleWorkoutCategoriesChange}
                    />

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
