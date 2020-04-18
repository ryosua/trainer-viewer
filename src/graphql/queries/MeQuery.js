import { gql } from 'apollo-boost'

const MeQuery = gql`
    query Me {
        me {
            id
            dateUserAgreementSigned
        }
    }
`
export default MeQuery
