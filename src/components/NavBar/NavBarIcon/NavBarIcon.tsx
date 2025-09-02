import { IconType } from '@/commonTypes'

interface IIcon {
	Icon: IconType
	color?: string
}

const NavBarIcon = ({ Icon, color = '#fff' }: IIcon) => {
	return <Icon fill={color} />
}

export default NavBarIcon
