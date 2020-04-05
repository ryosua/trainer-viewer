import { gql } from 'apollo-boost'

const AddWorkoutMutation = gql`
    mutation AddWorkout(
        $title: String!
        $requiredEquipment: String
        $startTime: String!
        $link: String!
        $workoutCategories: [Int]!
    ) {
        addWorkout(
            title: $title
            requiredEquipment: $requiredEquipment
            startTime: $startTime
            link: $link
            workoutCategories: $workoutCategories
        ) {
            id
            title
            requiredEquipment
            startTime
            link
            categories {
                id
                title
            }
        }
    }
`

export default AddWorkoutMutation
