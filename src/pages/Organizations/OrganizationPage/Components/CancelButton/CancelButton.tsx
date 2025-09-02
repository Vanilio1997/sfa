import SaveIcon from '@/assets/Icons/X.svg?react'
import { Button } from '@/components/Ui'
import { ButtonClickType } from '@/commonTypes'

interface ICancelButton {
	onClick: ButtonClickType
}

const CancelButton = ({ onClick }: ICancelButton) => {
	return (
		<Button
			size='mini'
			Icon={SaveIcon}
			variant='outline'
			label='Cancel'
			onClick={onClick}
		/>
	)
}

export default CancelButton
