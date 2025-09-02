import { Typography } from '@/components/Ui'
import './DetailsLabel.scss'

interface IDetailsLabelProps {
	text: string
	isSlim?: boolean
}

const DetailsLabel = ({ text, isSlim = false }: IDetailsLabelProps) => {
	return (
		<Typography
			variant='body'
			color='#808080'
			className={isSlim ? '' : 'details__label'}
			tag='p'
		>
			{text}:
		</Typography>
	)
}

export default DetailsLabel
