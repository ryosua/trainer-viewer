import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import MUISelect from '@material-ui/core/Select'
import cloneDeep from 'lodash/cloneDeep'
import { useHistory } from 'react-router-dom'

import Button from '../components/Button'
import Select from '../components/Select'
import DateTimePicker from '../components/DateTimePicker'
import AddWorkoutMutation from '../graphql/mutations/AddWorkoutMutation'
import ViewWorkoutsQuery from '../graphql/queries/ViewWorkoutsQuery'
import useWorkoutCategories from '../hooks/api/useWorkoutCategories'
import { workouts as workoutsRoute } from '../constants/routes'
import analytics from '../utils/analytics'

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 200
    }
}))

const WorkoutCategoriesSelect = ({
    loading,
    error,
    selectedWorkoutCategories,
    data,
    handleWorkoutCategoriesChange
}) => {
    const classes = useStyles()

    if (loading || error) {
        return null
    }

    const { workoutCategories } = data

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Workout Categories</InputLabel>
            <MUISelect
                multiple
                value={selectedWorkoutCategories}
                onChange={handleWorkoutCategoriesChange}
                error={!selectedWorkoutCategories.length}
                required
                label="Workout Categories">
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {workoutCategories.map((workoutCategory) => (
                    <MenuItem key={workoutCategory.id} value={workoutCategory.id}>
                        {workoutCategory.title}
                    </MenuItem>
                ))}
            </MUISelect>
        </FormControl>
    )
}

const durationOptions = [
    { id: 20, title: '20' },
    { id: 30, title: '30' },
    { id: 40, title: '40' },
    { id: 50, title: '50' },
    { id: 60, title: '60' },
    { id: 70, title: '70' },
    { id: 80, title: '80' },
    { id: 90, title: '90' }
]

const AddWorkout = () => {
    const history = useHistory()

    const [link, handleLinkChange] = useState('')
    const [requiredEquipment, handleRequiredEquipmentChange] = useState('')
    const [selectedDate, handleDateChange] = useState(new Date())
    const [title, handleTitleChange] = useState('')
    const [selectedWorkoutCategories, setWorkoutCategories] = useState([])
    const [duration, setDuration] = useState()

    const { loading, error, data } = useWorkoutCategories()

    const [addWorkoutMutation] = useMutation(AddWorkoutMutation, {
        update(cache, { data: { addWorkout } }) {
            // ViewWorkoutsQuery is called on Landing.
            const { workouts } = cloneDeep(cache.readQuery({ query: ViewWorkoutsQuery }))

            cache.writeQuery({
                query: ViewWorkoutsQuery,
                data: { workouts: [addWorkout, ...workouts] }
            })
        }
    })

    const handleAddWorkout = () => {
        addWorkoutMutation({
            variables: {
                title,
                requiredEquipment,
                startTime: selectedDate.toISOString(),
                link,
                categories: selectedWorkoutCategories,
                duration
            }
        })
        handleTitleChange('')
        handleLinkChange('')
        handleRequiredEquipmentChange('')
        history.push(workoutsRoute)
        analytics.track('add workout')
    }
    const handleTextFieldChange = (handler) => (e) => handler(e.target.value)
    const handleWorkoutCategoriesChange = (e) => {
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

    const createWorkOutDisabled = !title || !link || !selectedWorkoutCategories.length

    return (
        <Grid container>
            <Grid item sm={false} md={3} />
            <Grid item sm={12} md={6}>
                <Box display="flex" flex={1} flexDirection="column" p={5}>
                    <Typography variant="h2">Create Workout</Typography>
                    <TextField
                        label={'Title'}
                        value={title}
                        onChange={handleTextFieldChange(handleTitleChange)}
                        error={!title}
                        required
                    />
                    <TextField
                        label={'Link'}
                        value={link}
                        onChange={handleTextFieldChange(handleLinkChange)}
                        error={!link}
                        required
                    />
                    <TextField
                        label={'Required equipment'}
                        value={requiredEquipment}
                        onChange={handleTextFieldChange(handleRequiredEquipmentChange)}
                        placeholder="Water bottle, towel"
                    />
                    <Box my={1}>
                        <DateTimePicker value={selectedDate} handleDateChange={handleDateChange} />
                    </Box>
                    <Box my={1}>
                        <Select
                            handleChange={handleTextFieldChange(setDuration)}
                            label="Duration"
                            options={durationOptions}
                            value={duration || ''}
                            error={!duration}
                            required
                        />
                    </Box>
                    <Box my={1}>
                        <WorkoutCategoriesSelect
                            data={data}
                            loading={loading}
                            error={error}
                            selectedWorkoutCategories={selectedWorkoutCategories}
                            handleWorkoutCategoriesChange={handleWorkoutCategoriesChange}
                        />
                    </Box>
                    <Button onClick={handleTextFieldChange(handleAddWorkout)} disabled={createWorkOutDisabled}>
                        Create Workout
                    </Button>
                </Box>
            </Grid>
            <Grid item sm={false} md={3} />
        </Grid>
    )
}

export default AddWorkout
