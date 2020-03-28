import React from 'react'

import { HashRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import useSetToken from './hooks/useSetToken'
import createGraphQLClient from './utils/createGraphQLClient'
import MainNavigation from './components/MainNavigation'

import './App.css'

const client = createGraphQLClient()

const App = () => {
    useSetToken()
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <Router>
                    <MainNavigation />
                </Router>
            </ApolloProvider>
        </div>
    )
}

export default App
