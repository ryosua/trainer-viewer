import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import useToken from '../hooks/useToken'
import { home } from '../constants/routes'

const AuthenticatedRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useToken()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: home,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}

export default AuthenticatedRoute
