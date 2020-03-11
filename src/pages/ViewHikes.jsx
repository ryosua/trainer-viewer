import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import dayjs from 'dayjs'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const ViewHikesQuery = gql`
    query ViewHikes {
        hikes {
            id
            carpoolOptions
            elevationGain
            expectedRoundTripTime
            miles
            name
            parkingLocation
            preparationNotes
            startingElevation
            time
            url
        }
    }
`

const ViewHikes = () => {
    const { loading, error, data } = useQuery(ViewHikesQuery)
    if (loading || error) {
        return null
    }
    const hikes = data.hikes
    return (
        <>
            <Typography variant="h2">View Hikes</Typography>
            {hikes.map(
                ({
                    id,
                    carpoolOptions,
                    elevationGain,
                    expectedRoundTripTime,
                    miles,
                    name,
                    parkingLocation,
                    preparationNotes,
                    startingElevation,
                    time,
                    url
                }) => (
                    <Card key={id} variant="outlined">
                        <CardContent>
                            <Typography variant="h3">{name}</Typography>
                            <Typography>{`Miles: ${miles}`}</Typography>
                            <Typography>{`Date and Time: ${dayjs(time).format('MM/DD/YYYY HH:mm')}`}</Typography>
                            <Typography>{`Starting Elevation: ${startingElevation} feet`}</Typography>
                            <Typography>{`Elevation Gain: ${elevationGain} feet`}</Typography>
                            <Typography>{`Expected Round Trip Time: ${expectedRoundTripTime / 60} hours`}</Typography>
                            <Typography>{`Carpool Options: ${carpoolOptions}`}</Typography>
                            <Typography>{`Preperation Notes: ${preparationNotes}`}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => window.open(url, '_blank')}>
                                View on All Trails
                            </Button>
                            <Button size="small" onClick={() => window.open(parkingLocation, '_blank')}>
                                Parking Location
                            </Button>
                        </CardActions>
                    </Card>
                )
            )}
        </>
    )
}

export default ViewHikes
