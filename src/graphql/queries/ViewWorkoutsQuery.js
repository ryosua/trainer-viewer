import { gql } from 'apollo-boost'
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
