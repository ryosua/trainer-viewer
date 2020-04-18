import React from 'react'

import useToken from '../../hooks/useToken'
import MainNavigation from './MainNavigation'

const MainNavigationContainer = () => {
    const { isAuthenticated } = useToken()
    return <MainNavigation isAuthenticated={isAuthenticated} />
}

export default MainNavigationContainer
