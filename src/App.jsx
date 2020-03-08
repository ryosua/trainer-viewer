import React from 'react'
import Box from '@material-ui/core/Box'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import NavBar from './components/NavBar'
import ViewHikes from './pages/ViewHikes'
import Landing from './pages/Landing'

import './App.css'

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_API
})

const App = () => (
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

export default App
