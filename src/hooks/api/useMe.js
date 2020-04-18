import { useQuery } from '@apollo/react-hooks'

import MeQuery from '../../graphql/queries/MeQuery'

const useMe = () => useQuery(MeQuery)

export default useMe
