import './Loader.scss'

interface ILoaderProps {
	size?: 'small' | 'medium' | 'large'
	color?: 'blue' | 'green' | 'red' | 'gray'
	text?: string
	overlay?: boolean
}

const Loader = ({
	size = 'medium',
	color = 'blue',
	text,
	overlay = false,
}: ILoaderProps) => {
	return (
		<div className={`loader ${overlay ? 'loader--overlay' : ''}`}>
			<div
				className={`loader__spinner loader__spinner--${size} loader__spinner--${color}`}
			></div>
			{text && <span className='loader__text'>{text}</span>}
		</div>
	)
}
export default Loader
