import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import analytics from '../utils/analytics'

const usePageViews = () => {
    let location = useLocation()
    useEffect(() => {
        analytics.track('pageview', { pathname: location.pathname })
    }, [location])
}

export default usePageViews
