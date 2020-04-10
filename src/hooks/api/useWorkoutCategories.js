import { useQuery } from '@apollo/react-hooks'

import ViewWorkoutsCategories from '../../graphql/queries/ViewWorkoutCategories'

const useWorkoutCategories = () => useQuery(ViewWorkoutsCategories)

export default useWorkoutCategories
