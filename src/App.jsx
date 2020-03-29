import React from 'react'

import { HashRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import DayjsUtils from '@date-io/dayjs'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'

import useSetToken from './hooks/useSetToken'
import createGraphQLClient from './utils/createGraphQLClient'
import MainNavigation from './components/MainNavigation'
import theme from './designSystem/customTheme'

import './App.css'

const client = createGraphQLClient()

const App = () => {
    useSetToken()
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <MuiThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DayjsUtils}>
                        <CssBaseline />
                        <Router>
                            <MainNavigation />
                        </Router>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            </ApolloProvider>
        </div>
    )
}

export default App
