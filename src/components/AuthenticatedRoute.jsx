import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import useAuth from '../hooks/useAuth'
import { home } from '../constants/routes'

const AuthenticatedRoute = props => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Route {...props} /> : <Redirect to={home} />
}

export default AuthenticatedRoute
