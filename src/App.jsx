import React from 'react'
import Box from '@material-ui/core/Box'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import SignUp from './pages/SignUp'

import './App.css'

const App = () => (
    <div className="App">
        <Router>
            <Box display="flex" flexDirection="column" mt={2}>
                <Route exact path="/" component={Landing} />
                <Route path="/signup" component={SignUp} />
            </Box>
        </Router>
    </div>
)

export default App
