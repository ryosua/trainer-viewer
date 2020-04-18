import React from 'react'

import useAuth from '../../hooks/useAuth'
import MainNavigation from './MainNavigation'

const MainNavigationContainer = () => {
    const { isAuthenticated } = useAuth()
    return <MainNavigation isAuthenticated={isAuthenticated} />
}

export default MainNavigationContainer
