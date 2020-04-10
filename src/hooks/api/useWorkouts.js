import { useQuery } from '@apollo/react-hooks'

import ViewWorkoutsQuery from '../../graphql/queries/ViewWorkoutsQuery'

const useWorkouts = () => useQuery(ViewWorkoutsQuery)

export default useWorkouts
