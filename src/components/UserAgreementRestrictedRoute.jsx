import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import useMe from '../hooks/api/useMe'
import { home, userAgreement } from '../constants/routes'

const UserAgreementRestrictedRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth()
    const { data, loading, error } = useMe()
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (!isAuthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: home,
                                state: { from: location }
                            }}
                        />
                    )
                }

                if (loading || error) {
                    return null
                }

                const {
                    me: { dateUserAgreementSigned }
                } = data
                const userAgreementSigned = Boolean(dateUserAgreementSigned)

                if (!userAgreementSigned) {
                    return (
                        <Redirect
                            to={{
                                pathname: userAgreement,
                                state: { from: location }
                            }}
                        />
                    )
                }

                return children
            }}
        />
    )
}

export default UserAgreementRestrictedRoute
