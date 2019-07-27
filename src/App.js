import React, { Component } from 'react'
import { Text, Platform } from 'react-native'
import styled from 'styled-components/native'

const StyledView = styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
`

class App extends Component {
    render() {
        return (
            <StyledView>
                <Text>Need to find a route? Get Stoked!</Text>
                <br />
                <Text>
                    Stoked will be a new climbing guide that will help you find new routes faster, and spend more time
                    climbing.
                </Text>
                <br />
                <Text>Buy a T-Shirt to get access to the beta for a year when it is ready.</Text>
            </StyledView>
        )
    }
}

let hotWrapper = () => () => App
if (Platform.OS === 'web') {
    const { hot } = require('react-hot-loader')
    hotWrapper = hot
}
export default hotWrapper(module)(App)
