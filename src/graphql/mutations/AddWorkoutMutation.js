import { gql } from 'apollo-boost'
import WorkoutFragment from '../fragments/WorkoutFragment'

const AddWorkoutMutation = gql`
    mutation AddWorkout(
        $title: String!
        $requiredEquipment: String
        $startTime: String!
        $link: String!
        $categories: [Int]!
        $duration: Int!
    ) {
        addWorkout(
            title: $title
            requiredEquipment: $requiredEquipment
            startTime: $startTime
            link: $link
            categories: $categories
            duration: $duration
        ) {
            ...WorkoutFragment
        }
    }
    ${WorkoutFragment}
`

export default AddWorkoutMutation
