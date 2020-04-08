import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import Select from '../designSystem/Select'
import formatDate from '../utils/formatDate'
import openLink from '../utils/openLink'
import useWorkouts from '../hooks/api/useWorkouts'
import useWorkoutCategories from '../hooks/api/useWorkoutCategories'

const ViewWorkouts = () => {
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
            <Select handleChange={handleChange} options={workoutCategories} value={selectedWorkoutCategory || ''} />
            {filteredWorkouts.map(({ id, title, requiredEquipment, startTime, link, categories, duration }) => (
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
                        <Typography>{`Duration: ${duration} minutes`}</Typography>
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
