import gql from 'graphql-tag'

const UserFragment = gql`
    fragment UserFragment on User {
        id
        dateUserAgreementSigned
    }
`
export default UserFragment
