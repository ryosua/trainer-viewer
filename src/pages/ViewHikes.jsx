import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const VIEW_HIKES_QUERY = gql`
    {
        hikes {
            id
            miles
            url
        }
    }
`

const ViewHikes = () => {
    const { loading, error, data } = useQuery(VIEW_HIKES_QUERY)
    if (loading || error) {
        return null
    }
    const hikes = data.hikes
    return (
        <>
            <Typography variant="h2">View Hikes</Typography>
            {hikes.map(({ id, miles, url }) => (
                <Card key={id} variant="outlined">
                    <CardContent>
                        <Typography>{`Link: ${url}`}</Typography>
                        <Typography>{`Miles: ${miles}`}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => window.open(url, '_blank')}>
                            Show Details
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

export default ViewHikes
