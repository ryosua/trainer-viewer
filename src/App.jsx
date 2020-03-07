import React from 'react'
import Box from '@material-ui/core/Box'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Landing from './pages/Landing'

import './App.css'

const App = () => (
    <div className="App">
        <Router>
            <header>
                <NavBar />
            </header>
            <Box display="flex" flexDirection="column" mt={2}>
                <Route exact path="/" component={Landing} />
            </Box>
        </Router>
    </div>
)

export default App
