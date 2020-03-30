import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import formatDate from '../utils/formatDate'
import openLink from '../utils/openLink'
import ViewWorkoutsQuery from '../graphql/ViewWorkoutsQuery'

const ViewWorkouts = () => {
    const { loading, error, data } = useQuery(ViewWorkoutsQuery)
    if (loading || error) {
        return null
    }
    const workouts = data.workouts
    return (
        <>
            <Typography variant="h2">Workouts</Typography>
            {workouts.map(({ id, title, startTime, link }) => (
                <Card key={id} variant="outlined">
                    <CardContent>
                        <Typography variant="h3">{title}</Typography>
                        <Typography>{`Start time: ${formatDate(startTime)}`}</Typography>
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
