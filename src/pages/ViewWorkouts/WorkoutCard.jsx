import React from 'react'
import T from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ReportIcon from '@material-ui/icons/Report'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'

import ButtonLink from '../../components/ButtonLink'
import formatDate from '../../utils/formatDate'
import analytics from '../../utils/analytics'

const WorkoutCard = ({ onDeleteWorkout, onReportWorkout, workout }) => {
    const { title, requiredEquipment, startTime, link, categories, duration } = workout
    return (
        <Card variant="outlined">
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
                <ButtonLink to={link} text="Open Link" onClick={() => analytics.track('open link', { link })} />
                <Button onClick={() => onReportWorkout(workout)} variant="outlined">
                    <ReportIcon color="secondary" />
                </Button>
                <Button onClick={() => onDeleteWorkout(workout)} variant="outlined">
                    <DeleteIcon />
                </Button>
            </CardActions>
        </Card>
    )
}

WorkoutCard.propTypes = {
    onDeleteWorkout: T.func.isRequired,
    onReportWorkout: T.func.isRequired,
    workout: T.object.isRequired
}
export default WorkoutCard
