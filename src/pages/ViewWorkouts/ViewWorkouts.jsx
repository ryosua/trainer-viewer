import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useMutation } from '@apollo/react-hooks'

import ReportDialog from './ReportDialog'
import WorkoutCard from './WorkoutCard'
import Select from '../../components/Select'
import useWorkouts from '../../hooks/api/useWorkouts'
import useWorkoutCategories from '../../hooks/api/useWorkoutCategories'
import ReportWorkoutMutation from '../../graphql/mutations/ReportWorkoutMutation'
import analytics from '../../utils/analytics'

const ViewWorkouts = () => {
    const [reportedWorkout, setReportedWorkout] = useState()
    const [reason, setReason] = useState('')

    const { loading: loadingWorkouts, error: workoutsError, data: workoutsData } = useWorkouts()
    const {
        loading: loadingWorkoutCategories,
        error: workoutCategoriesError,
        data: workoutCategoriesData
    } = useWorkoutCategories()
    const [selectedWorkoutCategory, setSelectedWorkoutCategory] = useState()

    const [reportWorkoutMutation] = useMutation(ReportWorkoutMutation)

    if (loadingWorkouts || loadingWorkoutCategories || workoutsError || workoutCategoriesError) {
        return null
    }

    const { workouts } = workoutsData
    const { workoutCategories } = workoutCategoriesData

    const handleChange = (e) => setSelectedWorkoutCategory(e.target.value)
    const handleCloseDialog = () => setReportedWorkout()
    const handleOpenDialog = (workout) => {
        setReportedWorkout(workout)
    }
    const handleReportWorkout = () => {
        reportWorkoutMutation({ variables: { workoutId: reportedWorkout.id, reason } })
        handleCloseDialog()
        analytics.track('report workout', { workoutId: reportedWorkout.id, reason })
    }
    const handleReasonChange = (e) => setReason(e.target.value)

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
            {workouts.length === 0 && <Typography>There are no workouts yet. Come back soon!</Typography>}
            {filteredWorkouts.map((workout) => (
                <WorkoutCard
                    key={workout.id}
                    onReportWorkout={handleOpenDialog}
                    workout={workout}
                    onReasonChange={handleOpenDialog}
                />
            ))}
            <ReportDialog
                buttonDisabled={Boolean(!reason)}
                onClose={handleCloseDialog}
                open={Boolean(reportedWorkout)}
                onReportWorkout={handleReportWorkout}
                onReasonChange={handleReasonChange}
            />
        </>
    )
}

export default ViewWorkouts
