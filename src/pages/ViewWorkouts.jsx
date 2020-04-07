import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import formatDate from '../utils/formatDate'
import openLink from '../utils/openLink'
import useWorkouts from '../hooks/api/useWorkouts'
import useWorkoutCategories from '../hooks/api/useWorkoutCategories'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: 200
    }
}))

const ViewWorkouts = () => {
    const classes = useStyles()
    const { loading: loadingWorkouts, error: workoutsError, data: workoutsData } = useWorkouts()
    const {
        loading: loadingWorkoutCategories,
        error: workoutCategoriesError,
        data: workoutCategoriesData
    } = useWorkoutCategories()
    const [selectedWorkoutCategory, setSelectedWorkoutCategory] = useState()

    if (loadingWorkouts || loadingWorkoutCategories || workoutsError || workoutCategoriesError) {
        return null
    }

    const { workouts } = workoutsData
    const { workoutCategories } = workoutCategoriesData

    const handleChange = (e) => setSelectedWorkoutCategory(e.target.value)

    const filteredWorkouts = selectedWorkoutCategory
        ? workouts.filter((workout) =>
              workout.categories.map((category) => category.id).includes(selectedWorkoutCategory)
          )
        : workouts

    return (
        <>
            <Typography variant="h2">Workouts</Typography>
            <FormControl variant="outlined" classes={classes}>
                <InputLabel id="demo-simple-select-outlined-label">Workout Category</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectedWorkoutCategory || ''}
                    onChange={handleChange}
                    label="Workout Category">
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {workoutCategories.map((workoutCategory) => (
                        <MenuItem key={workoutCategory.id} value={workoutCategory.id}>
                            {workoutCategory.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {filteredWorkouts.map(({ id, title, requiredEquipment, startTime, link, categories }) => (
                <Card key={id} variant="outlined">
                    <CardContent>
                        <Typography variant="h3">{title}</Typography>
                        <Typography>{`Start time: ${formatDate(startTime)}`}</Typography>
                        <Typography>{`Required equipment: ${requiredEquipment || 'No equipment needed'}`}</Typography>
                        <Typography>{`Categories: ${categories.reduce(
                            (accumulator, category, index) =>
                                accumulator + category.title + (index === categories.length - 1 ? '' : ', '),
                            ''
                        )}`}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => openLink(link)} variant="outlined">
                            Open Link
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

export default ViewWorkouts
