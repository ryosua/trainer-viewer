import { gql } from 'apollo-boost'

const ViewWorkoutsQuery = gql`
    query ViewWorkouts {
        workouts {
            id
            title
            requiredEquipment
            startTime
            link
        }
    }
`
export default ViewWorkoutsQuery
