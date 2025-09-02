import { useRef, ChangeEvent, ReactElement } from 'react'
import './UploadButton.scss'

interface UploadButtonProps {
	onFileSelect: (file: File) => void
	accept?: string
	multiple?: boolean
	icon?: ReactElement
	text?: string
}

const UploadButton = ({
	onFileSelect,
	accept = 'image/*',
	multiple = false,
	icon,
	text = '',
}: UploadButtonProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (!files || files.length === 0) return

		const file = files[0]
		onFileSelect(file)
		event.target.value = ''
	}

	return (
		<label className='upload-button'>
			{icon && <span className='upload-button__icon'>{icon}</span>}
			{text && <span className='upload-button__text'>{text}</span>}

			<input
				ref={fileInputRef}
				type='file'
				accept={accept}
				multiple={multiple}
				onChange={handleFileSelect}
				className='upload-button__input'
			/>
		</label>
	)
}
export default UploadButton
