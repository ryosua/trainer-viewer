import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ReportIcon from '@material-ui/icons/Report'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'

import { Workout, WorkoutCategory } from '../../shared'
import isMyWorkout from '../../utils/isMyWorkout.js'
import useMe from '../../hooks/api/useMe'
import ButtonLink from '../../components/ButtonLink'
import formatDate from '../../utils/formatDate'
import analytics from '../../utils/analytics'

type WorkoutCardProps = {
    onDeleteWorkout: (workout: Workout) => void
    onReportWorkout: (workout: Workout) => void
    workout: Workout
}

const WorkoutCard = ({ onDeleteWorkout, onReportWorkout, workout }: WorkoutCardProps) => {
    const { data, loading, error } = useMe()

    if (loading) {
        return null
    }

    if (error) {
        return <Typography>There was an error loading your profile.</Typography>
    }

    const { me } = data

    const { title, requiredEquipment, startTime, link, categories, duration } = workout
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3">{title}</Typography>
                <Typography>{`Start time: ${formatDate(startTime)}`}</Typography>
                <Typography>{`Required equipment: ${requiredEquipment || 'No equipment needed'}`}</Typography>
                <Typography>{`Categories: ${categories.reduce(
                    (accumulator: string, category: WorkoutCategory, index: number) =>
                        accumulator + category.title + (index === categories.length - 1 ? '' : ', '),
                    ''
                )}`}</Typography>
                <Typography>{`Duration: ${duration} minutes`}</Typography>
            </CardContent>
            <CardActions>
                <ButtonLink to={link} text="Open Link" onClick={() => analytics.track('open link', { link })} />
                {!isMyWorkout(workout, me) && (
                    <Button onClick={() => onReportWorkout(workout)} variant="outlined">
                        <ReportIcon color="secondary" />
                    </Button>
                )}
                {isMyWorkout(workout, me) && (
                    <Button onClick={() => onDeleteWorkout(workout)} variant="outlined">
                        <DeleteIcon />
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default WorkoutCard
