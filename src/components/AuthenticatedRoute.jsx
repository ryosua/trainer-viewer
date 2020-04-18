import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import { home } from '../constants/routes'

const AuthenticatedRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth()
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
