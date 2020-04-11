import React from 'react'
import T from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ReportIcon from '@material-ui/icons/Report'
import Typography from '@material-ui/core/Typography'

import formatDate from '../../utils/formatDate'
import openLink from '../../utils/openLink'

const WorkoutCard = ({ onReportWorkout, workout }) => {
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
                <Button onClick={() => openLink(link)} variant="outlined">
                    Open Link
                </Button>
                <Button onClick={() => onReportWorkout(workout)} variant="outlined">
                    <ReportIcon color="secondary" />
                </Button>
            </CardActions>
        </Card>
    )
}

WorkoutCard.propTypes = {
    onReportWorkout: T.func.isRequired,
    workout: T.object.isRequired
}
export default WorkoutCard
