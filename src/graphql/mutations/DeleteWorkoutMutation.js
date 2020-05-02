import gql from 'graphql-tag'

const DeleteWorkoutMutation = gql`
    mutation DeleteWorkout($workoutId: Int!) {
        deleteWorkout(workoutId: $workoutId) {
            id
        }
    }
`

export default DeleteWorkoutMutation
