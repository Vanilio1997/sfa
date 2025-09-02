import { IconType } from '@/commonTypes'
import './Button.scss'

interface IButtonProps {
	label?: string
	variant: 'outline' | 'filled' | 'bright'
	size: 'normal' | 'mini'
	Icon?: IconType
	iconPosition?: 'left' | 'right'
	className?: string
	fullWidth?: boolean
	children?: React.ReactNode
}

type ButtonProps = IButtonProps &
	Omit<React.ComponentPropsWithoutRef<'button'>, keyof IButtonProps>

const Button = (props: ButtonProps) => {
	const {
		label,
		size,
		variant,
		Icon,
		iconPosition = 'left',
		className = '',
		fullWidth = false,
		children,
		...otherProps
	} = props

	return (
		<button
			className={`btn btn--${variant} btn--${size}  ${
				label && size === 'mini' ? 'btn-mini-text' : ''
			} 
			${fullWidth ? 'btn-fullWidth' : ''}
			${className} `}
			{...otherProps}
		>
			{Icon && iconPosition === 'left' && <Icon />}
			{label && <span className='btn--label'>{label}</span>}
			{children}
			{Icon && iconPosition === 'right' && <Icon />}
		</button>
	)
}

export default Button
