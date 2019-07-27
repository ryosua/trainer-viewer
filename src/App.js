import React, { Component } from 'react'
import { Text, View, Platform } from 'react-native'

class App extends Component {
    render() {
        return (
            <View>
                <Text>Get Stoked App</Text>
            </View>
        )
    }
}

let hotWrapper = () => () => App
if (Platform.OS === 'web') {
    const { hot } = require('react-hot-loader')
    hotWrapper = hot
}
export default hotWrapper(module)(App)
