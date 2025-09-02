import SaveIcon from '@/assets/Icons/Check.svg?react'
import { Button } from '@/components/Ui'

const SaveButton = () => {
	return (
		<Button
			size='mini'
			Icon={SaveIcon}
			variant='outline'
			label='Save changes'
			type='submit'
		/>
	)
}

export default SaveButton
