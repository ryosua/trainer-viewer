import { gql } from 'apollo-boost'

const AddWorkoutMutation = gql`
    mutation AddWorkout($title: String!, $requiredEquipment: String, $startTime: String!, $link: String!) {
        addWorkout(title: $title, requiredEquipment: $requiredEquipment, startTime: $startTime, link: $link) {
            id
            title
            requiredEquipment
            startTime
            link
        }
    }
`

export default AddWorkoutMutation
