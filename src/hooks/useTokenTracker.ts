import { useState, useEffect } from 'react'

export const useTokenTracker = () => {
  const [hasToken, setHasToken] = useState<boolean>(false)

  useEffect(() => {
    checkToken()

    const handleStorageChange = () => checkToken()

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const checkToken = () => {
    const token = localStorage.getItem('token')
    setHasToken(!!token)
  }

  return hasToken
}