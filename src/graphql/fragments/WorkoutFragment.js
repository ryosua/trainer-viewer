import { gql } from 'apollo-boost'

const WorkoutFragment = gql`
    fragment WorkoutFragment on Workout {
        id
        categories {
            id
            title
        }
        duration
        link
        requiredEquipment
        startTime
        title
        trainerId
    }
`
export default WorkoutFragment
