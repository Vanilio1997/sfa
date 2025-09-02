import {
	Auth,
	Clients,
	Contractors,
	Main,
	NotFound,
	Organization,
	Organizations,
} from '@/pages'
import { RouteObject } from 'react-router-dom'
import { Layout } from './Layout'
import { AuthLayout } from './AuthLayout'
import ProtectedRoute from './ProtectedRoute'

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/main',
				element: (
					<ProtectedRoute>
						<Main />
					</ProtectedRoute>
				),
			},
			{
				element: (
					<ProtectedRoute>
						<Clients />
					</ProtectedRoute>
				),
			},
			{
				path: '/contractors',
				element: (
					<ProtectedRoute>
						<Contractors />
					</ProtectedRoute>
				),
			},
			{
				path: '/organizations',
				element: (
					<ProtectedRoute>
						<Organizations />
					</ProtectedRoute>
				),
			},
			{
				path: 'organizations/:id',
				element: (
					<ProtectedRoute>
						<Organization />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <NotFound />,
			},
			{
				path: '/auth',
				element: <Auth />,
			},
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: '/auth',
				element: <Auth />,
			},
		],
	},
]
