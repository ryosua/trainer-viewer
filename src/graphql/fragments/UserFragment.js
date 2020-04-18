import { gql } from 'apollo-boost'

const UserFragment = gql`
    fragment UserFragment on User {
        id
        dateUserAgreementSigned
    }
`
export default UserFragment
