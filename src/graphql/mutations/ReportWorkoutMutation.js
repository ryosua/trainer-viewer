import gql from 'graphql-tag'

const ReportWorkoutMutation = gql`
    mutation ReportWorkout($workoutId: Int!, $reason: String!) {
        reportWorkout(workoutId: $workoutId, reason: $reason) {
            id
        }
    }
`

export default ReportWorkoutMutation
