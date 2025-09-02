import './SideMenu.scss'

interface ISideMenuProps {
	children: React.ReactNode
}

const SideMenu = ({ children }: ISideMenuProps) => {
	return <div className='SideMenu--container'>{children}</div>
}

export default SideMenu
