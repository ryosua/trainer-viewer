import { useEffect } from 'react'

import useAuth from '../hooks/useAuth'

const useSetToken = () => {
    const { isAuthenticated, getIdTokenClaims } = useAuth()
    useEffect(() => {
        const setToken = async () => {
            const tokenClaims = await getIdTokenClaims()
            const token = tokenClaims.__raw
            localStorage.setItem('token', token)
        }
        if (isAuthenticated) {
            setToken()
        }
    }, [getIdTokenClaims, isAuthenticated])
}

export default useSetToken
