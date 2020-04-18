import { gql } from 'apollo-boost'

import UserFragment from '../fragments/UserFragment'

const SignUserAgreementMutation = gql`
    mutation SignUserAgreement {
        signUserAgreement {
            ...UserFragment
        }
    }
    ${UserFragment}
`

export default SignUserAgreementMutation
