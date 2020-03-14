import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { HashRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth0 } from './Auth0'

import NavBar from './components/NavBar'
import ViewHikes from './pages/ViewHikes'
import Landing from './pages/Landing'

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
    const auth0 = useAuth0()
    const isAuthenticated = auth0.isAuthenticated

    useEffect(() => {
        const getToken = async () => {
            const tokenClaims = await auth0.getIdTokenClaims()
            const token = tokenClaims.__raw
            localStorage.setItem('token', token)
        }
        if (isAuthenticated) {
            getToken()
        }
    }, [auth0, isAuthenticated])

    return (
        <div className="App">
            <ApolloProvider client={client}>
                <Router>
                    <header>
                        <NavBar />
                    </header>
                    <Box display="flex" flexDirection="column" mt={2}>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/hikes" component={ViewHikes} />
                    </Box>
                </Router>
            </ApolloProvider>
        </div>
    )
}

export default App
