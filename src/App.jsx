import React from 'react'
import Box from '@material-ui/core/Box'
import { HashRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import AuthenticatedRoute from './components/AuthenticatedRoute'
import NavBar from './components/NavBar'
import CreateWorkout from './pages/CreateWorkout'
import Landing from './pages/Landing'
import ViewWorkouts from './pages/ViewWorkouts'
import { createWorkout, home, workouts } from './constants/routes'
import useSetToken from './hooks/useSetToken'

import './App.css'

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_API,
    request: operation => {
        const token = localStorage.getItem('token')
        operation.setContext({
            headers: {
                authorization: token ? token : ''
            }
        })
    }
})

const App = () => {
    useSetToken()
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <Router>
                    <header>
                        <NavBar />
                    </header>
                    <Box display="flex" flexDirection="column" mt={2}>
                        <AuthenticatedRoute exact path={createWorkout} component={CreateWorkout} />
                        <Route exact path={home} component={Landing} />
                        <Route exact path={workouts} component={ViewWorkouts} />
                    </Box>
                </Router>
            </ApolloProvider>
        </div>
    )
}

export default App
