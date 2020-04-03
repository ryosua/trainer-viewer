import { useQuery } from '@apollo/react-hooks'

import ViewWorkoutsQuery from '../../graphql/ViewWorkoutsQuery'

const useWorkouts = () => useQuery(ViewWorkoutsQuery)

export default useWorkouts
