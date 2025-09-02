import EditIcon from '@/assets/Icons/Pencil.svg?react'
import { Button } from '@/components/Ui'
import { ButtonClickType } from '@/commonTypes'

interface IEditButton {
	onClick: ButtonClickType
}

const EditButton = ({ onClick }: IEditButton) => {
	return (
		<Button
			size='mini'
			Icon={EditIcon}
			variant='outline'
			label='Edit'
			onClick={onClick}
		/>
	)
}

export default EditButton
