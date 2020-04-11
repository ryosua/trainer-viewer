import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import WorkoutCard from './WorkoutCard'
import Select from '../../designSystem/Select'
import useWorkouts from '../../hooks/api/useWorkouts'
import useWorkoutCategories from '../../hooks/api/useWorkoutCategories'

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
            <Box m={1}>
                <Select
                    handleChange={handleChange}
                    label="Workout Category"
                    options={workoutCategories}
                    value={selectedWorkoutCategory || ''}
                />
            </Box>
            {filteredWorkouts.map((workout) => (
                <WorkoutCard workout={workout} />
            ))}
        </>
    )
}

export default ViewWorkouts
