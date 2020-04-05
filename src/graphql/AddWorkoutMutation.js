import { gql } from 'apollo-boost'

const AddWorkoutMutation = gql`
    mutation AddWorkout(
        $title: String!
        $requiredEquipment: String
        $startTime: String!
        $link: String!
        $categories: [Int]!
    ) {
        addWorkout(
            title: $title
            requiredEquipment: $requiredEquipment
            startTime: $startTime
            link: $link
            categories: $categories
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
