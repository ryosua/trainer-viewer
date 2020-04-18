import { useEffect, useState } from 'react'

import useAuth from './useAuth'

const useToken = () => {
    const [tokenState, setTokenState] = useState(localStorage.getItem('token'))
    const { isAuthenticated, getIdTokenClaims } = useAuth()
    const hasToken = Boolean(tokenState)
    useEffect(() => {
        const setToken = async () => {
            const tokenClaims = await getIdTokenClaims()
            const token = tokenClaims.__raw
            localStorage.setItem('token', token)
            setTokenState(token)
        }

        if (!hasToken && isAuthenticated) {
            setToken()
        }
    }, [hasToken, getIdTokenClaims, isAuthenticated])

    return { isAuthenticated: hasToken, token: tokenState }
}

export default useToken
