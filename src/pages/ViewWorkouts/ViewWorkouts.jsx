import React, { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useMutation } from '@apollo/react-hooks'

import ReportDialog from './ReportDialog'
import DeleteDialog from './DeleteDialog'
import WorkoutCard from './WorkoutCard'
import Select from '../../components/Select'
import useWorkouts from '../../hooks/api/useWorkouts'
import useWorkoutCategories from '../../hooks/api/useWorkoutCategories'
import ReportWorkoutMutation from '../../graphql/mutations/ReportWorkoutMutation'
import DeleteWorkoutMutation from '../../graphql/mutations/DeleteWorkoutMutation'
import ViewWorkoutsQuery from '../../graphql/queries/ViewWorkoutsQuery'
import analytics from '../../utils/analytics'

const ViewWorkouts = () => {
    const [selectedWorkoutCategory, setSelectedWorkoutCategory] = useState()
    const [reportedWorkout, setReportedWorkout] = useState()
    const [workoutToDelete, setWorkoutToDelete] = useState()
    const [reason, setReason] = useState('')

    const { loading: loadingWorkouts, error: workoutsError, data: workoutsData } = useWorkouts()
    const {
        loading: loadingWorkoutCategories,
        error: workoutCategoriesError,
        data: workoutCategoriesData
    } = useWorkoutCategories()

    const [reportWorkoutMutation] = useMutation(ReportWorkoutMutation)
    const [deleteWorkoutMutation] = useMutation(DeleteWorkoutMutation, {
        update(cache, { data: { addWorkout } }) {
            const { workouts } = cloneDeep(cache.readQuery({ query: ViewWorkoutsQuery }))

            cache.writeQuery({
                query: ViewWorkoutsQuery,
                data: { workouts: workouts.filter((workout) => workout.id !== workoutToDelete.id) }
            })
        }
    })

    if (loadingWorkouts || loadingWorkoutCategories || workoutsError || workoutCategoriesError) {
        return null
    }

    const { workouts } = workoutsData
    const { workoutCategories } = workoutCategoriesData

    const handleChange = (e) => setSelectedWorkoutCategory(e.target.value)

    const handleCloseReportDialog = () => setReportedWorkout()

    const handleCloseDeleteDialog = () => setWorkoutToDelete()

    const handleOpenReportDialog = (workout) => setReportedWorkout(workout)

    const handleOpenDeleteDialog = (workout) => setWorkoutToDelete(workout)

    const handleReportWorkout = () => {
        reportWorkoutMutation({ variables: { workoutId: reportedWorkout.id, reason } })
        handleCloseReportDialog()
        analytics.track('report workout', { workoutId: reportedWorkout.id, reason })
    }

    const handleDeleteWorkout = () => {
        deleteWorkoutMutation({ variables: { workoutId: workoutToDelete.id } })
        handleCloseDeleteDialog()
        analytics.track('delete workout', { workoutId: workoutToDelete.id })
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
                    onDeleteWorkout={handleOpenDeleteDialog}
                    onReportWorkout={handleOpenReportDialog}
                    workout={workout}
                />
            ))}
            <ReportDialog
                buttonDisabled={Boolean(!reason)}
                onReasonChange={handleReasonChange}
                onReportWorkout={handleReportWorkout}
                open={Boolean(reportedWorkout)}
            />
            <DeleteDialog onDeleteWorkout={handleDeleteWorkout} open={Boolean(workoutToDelete)} />
        </>
    )
}

export default ViewWorkouts
