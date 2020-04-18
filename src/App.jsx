import React from 'react'

import { HashRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import DayjsUtils from '@date-io/dayjs'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'

import useToken from './hooks/useToken'
import createGraphQLClient from './utils/createGraphQLClient'
import MainNavigation from './components/MainNavigation'
import theme from './customTheme'

import './App.css'

const App = () => {
    const { token } = useToken()
    const client = createGraphQLClient(token)
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
