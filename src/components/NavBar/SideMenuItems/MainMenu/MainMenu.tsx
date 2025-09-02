import Icon from '@/assets/Icons/Company.svg?react'
import { NavBarIconBtn } from '@/components/Ui'

interface IMainMenu {
	menuOpen: () => void
}

const MainMenu = ({ menuOpen }: IMainMenu) => {
	return <NavBarIconBtn Icon={Icon} onClick={menuOpen} style={{ stroke: '#fff' }} />
}

export default MainMenu
