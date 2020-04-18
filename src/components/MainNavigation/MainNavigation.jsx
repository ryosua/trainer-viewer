import React from 'react'
import T from 'prop-types'
import { Route } from 'react-router-dom'
import Box from '@material-ui/core/Box'

import useMe from '../../hooks/api/useMe'
import AuthenticatedRoute from '../AuthenticatedRoute'
import NavBar from './NavBar'
import AddWorkout from '../../pages/AddWorkout'
import Landing from '../../pages/Landing'
import ViewWorkouts from '../../pages/ViewWorkouts'
import { addWorkout, home, workouts } from '../../constants/routes'

const Nav = () => (
    <>
        <header>
            <NavBar />
        </header>
        <Box display="flex" flexDirection="column" mt={2}>
            <AuthenticatedRoute exact path={addWorkout} component={AddWorkout} />
            <Route exact path={home} component={Landing} />
            <Route exact path={workouts} component={ViewWorkouts} />
        </Box>
    </>
)

const AuthenticatedNav = () => {
    useMe()
    return <Nav />
}

const UnAuthenticatedNav = () => <Nav />

const MainNavigation = ({ isAuthenticated }) => (isAuthenticated ? <AuthenticatedNav /> : <UnAuthenticatedNav />)

MainNavigation.propTypes = {
    isAuthenticated: T.bool.isRequired
}

export default MainNavigation
