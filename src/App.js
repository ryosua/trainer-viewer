import React from 'react'
import Box from '@material-ui/core/Box'

import Landing from './pages/Landing'

import './App.css'

const App = () => (
    <div className="App">
        <Box display="flex" flexDirection="column" mt={2}>
            <Landing />
        </Box>
    </div>
)

export default App
