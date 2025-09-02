import SaveIcon from '@/assets/Icons/Add Photo.svg?react'
import { Button } from '@/components/Ui'
import { ButtonClickType } from '@/commonTypes'

interface IAddButtonProps {
	onClick: ButtonClickType
	children: React.ReactNode
}

const AddButton = ({ onClick, children }: IAddButtonProps) => {
	return (
		<Button
			size='mini'
			Icon={SaveIcon}
			variant='outline'
			label='Add'
			onClick={onClick}
		>
			{children}
		</Button>
	)
}

export default AddButton
