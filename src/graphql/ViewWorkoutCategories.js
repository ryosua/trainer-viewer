import { gql } from 'apollo-boost'

const ViewWorkoutCategoriesQuery = gql`
    query ViewWorkoutCategories {
        workoutCategories {
            id
            title
        }
    }
`
export default ViewWorkoutCategoriesQuery
