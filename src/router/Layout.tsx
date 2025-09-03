import NavBar from '@/components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import './Layout.scss'

export const Layout = () => {
	return (
		<div className='layout'>
			<NavBar />
			<main className='main'>
				<div className='main__wrapper'>
					<Outlet />
				</div>
			</main>
		</div>
	)
}
