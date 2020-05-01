import gql from 'graphql-tag'
import WorkoutFragment from '../fragments/WorkoutFragment'

const ViewWorkoutsQuery = gql`
    query ViewWorkouts {
        workouts {
            ...WorkoutFragment
        }
    }
    ${WorkoutFragment}
`
export default ViewWorkoutsQuery
