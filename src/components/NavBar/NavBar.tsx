import Icon from '@/assets/Icons/Logo.svg?react'
import { useState } from 'react'
import { Divider } from '../Ui'
import { ManagerSideMenu, SideMenu } from '../features'
import './NavBar.scss'
import { NavBarIcon } from './NavBarIcon'
import { LogOut, MainMenu, Search, Settings } from './SideMenuItems'

const NavBar = () => {
	const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false)

	const onHandleMenuOpen = () => setIsSideMenuOpen(true)
	const onHandleMenuClose = () => setIsSideMenuOpen(false)

	return (
		<>
			<div className='elements-wrapper'>
				<aside className='side-panel side-panel--expanded'>
					<nav className='side-panel__navigation'>
						<div className='side-panel-elements-container'>
							<NavBarIcon Icon={Icon} />
							<MainMenu menuOpen={onHandleMenuOpen} />
							<Search />
						</div>
						<div className='side-panel-elements-container'>
							<Divider color='#585858' length='19px' />
							<Settings />
							<LogOut />
						</div>
					</nav>
				</aside>
				{isSideMenuOpen && (
					<div className='sideMenu-wrapper'>
						<SideMenu>
							<ManagerSideMenu onClose={onHandleMenuClose} />
						</SideMenu>
					</div>
				)}
			</div>
		</>
	)
}

export default NavBar
