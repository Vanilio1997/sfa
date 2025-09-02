import { Outlet } from 'react-router-dom'
import './Layout.scss'

export const AuthLayout = () => {
	return (
		<div className='auth-layout'>
			<main className='main_auth'>
				<Outlet />
			</main>
		</div>
	)
}
