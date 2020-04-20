import React, { useEffect } from 'react'
import T from 'prop-types'
import { Route } from 'react-router-dom'
import Box from '@material-ui/core/Box'

import useMe from '../../hooks/api/useMe'
import UserAgreementRestrictedRoute from '../UserAgreementRestrictedRoute'
import NavBar from './NavBar'
import AddWorkout from '../../pages/AddWorkout'
import Landing from '../../pages/Landing'
import UserAgreement from '../../pages/UserAgreement'
import ViewWorkouts from '../../pages/ViewWorkouts'
import { addWorkout, home, userAgreement, workouts } from '../../constants/routes'
import analytics from '../../utils/analytics'

const Nav = () => (
    <>
        <header>
            <NavBar />
        </header>
        <Box display="flex" flexDirection="column" mt={2}>
            <Route exact path={userAgreement}>
                <UserAgreement />
            </Route>
            <Route exact path={home}>
                <Landing />
            </Route>
            <UserAgreementRestrictedRoute exact path={addWorkout}>
                <AddWorkout />
            </UserAgreementRestrictedRoute>
            <UserAgreementRestrictedRoute exact path={workouts}>
                <ViewWorkouts />
            </UserAgreementRestrictedRoute>
        </Box>
    </>
)

const AuthenticatedNav = () => {
    const { data, loading, error } = useMe()
    useEffect(() => {
        if (!loading && !error) {
            const {
                me: { id }
            } = data
            analytics.identify(id)
            analytics.setUserProps({ id })
        }
    }, [data, loading, error])
    return <Nav />
}

const UnAuthenticatedNav = () => <Nav />

const MainNavigation = ({ isAuthenticated }) => (isAuthenticated ? <AuthenticatedNav /> : <UnAuthenticatedNav />)

MainNavigation.propTypes = {
    isAuthenticated: T.bool.isRequired
}

export default MainNavigation
