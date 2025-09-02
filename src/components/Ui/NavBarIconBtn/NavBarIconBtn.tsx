import { IconType } from '@/commonTypes'
import './NavBarIconBtn.scss'

interface IButton {
	Icon: IconType
}

type ButtonProps = IButton &
	Omit<React.ComponentPropsWithoutRef<'button'>, keyof IButton>

const NavBarIconBtn = (props: ButtonProps) => {
	const { Icon, ...otherProps } = props
	return (
		<button className='navBar--btn' {...otherProps}>
			<Icon width={20} height={20} />
		</button>
	)
}

export default NavBarIconBtn
