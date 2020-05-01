import gql from 'graphql-tag'

const ViewWorkoutCategoriesQuery = gql`
    query ViewWorkoutCategories {
        workoutCategories {
            id
            title
        }
    }
`
export default ViewWorkoutCategoriesQuery
