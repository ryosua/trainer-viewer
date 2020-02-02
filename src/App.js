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
                <Text>Planning a trip? Get Stoked!</Text>
                <br />
                <Text>Stoked makes it easy to plan trips with other people who love the outdoors.</Text>
                <br />
                <Text>Buy a T-Shirt to reserve access to the beta for a year after launch.</Text>
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
