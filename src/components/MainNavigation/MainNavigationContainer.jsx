import React from 'react'

import usePageViews from '../../hooks/usePageViews'
import useToken from '../../hooks/useToken'
import MainNavigation from './MainNavigation'

const MainNavigationContainer = () => {
    const { isAuthenticated } = useToken()
    usePageViews()
    return <MainNavigation isAuthenticated={isAuthenticated} />
}

export default MainNavigationContainer
