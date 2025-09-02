import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const isAuthenticated = () => {
		try {
			const token = localStorage.getItem('token')
			return Boolean(token)
		} catch (error) {
			console.error('Ошибка при проверке аутентификации:', error)
			return false
		}
	}

	return isAuthenticated() ? <>{children}</> : <Navigate to='/auth' replace />
}

export default ProtectedRoute
