import gql from 'graphql-tag'

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
        trainer {
            id
        }
    }
`
export default WorkoutFragment
