import gql from 'graphql-tag'

import UserFragment from '../fragments/UserFragment'

const MeQuery = gql`
    query Me {
        me {
            ...UserFragment
        }
    }
    ${UserFragment}
`
export default MeQuery
