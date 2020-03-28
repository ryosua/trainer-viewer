import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth0 } from '../Auth0'
import { home } from '../constants/routes'

const AuthenticatedRoute = props => {
    const auth0 = useAuth0()
    const isAuthenticated = auth0.isAuthenticated
    return isAuthenticated ? <Route {...props} /> : <Redirect to={home} />
}

export default AuthenticatedRoute
