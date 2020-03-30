import { gql } from 'apollo-boost'

const AddWorkoutMutation = gql`
    mutation AddWorkout($title: String!, $startTime: String!, $link: String!) {
        addWorkout(title: $title, startTime: $startTime, link: $link) {
            id
            title
            startTime
            link
        }
    }
`

export default AddWorkoutMutation
