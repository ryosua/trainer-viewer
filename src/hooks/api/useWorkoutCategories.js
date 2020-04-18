import { useQuery } from '@apollo/react-hooks'

import ViewWorkoutsCategories from '../../graphql/queries/ViewWorkoutCategoriesQuery'

const useWorkoutCategories = () => useQuery(ViewWorkoutsCategories)

export default useWorkoutCategories
