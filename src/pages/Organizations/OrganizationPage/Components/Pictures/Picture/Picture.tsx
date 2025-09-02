import { Button } from '@/components/Ui'
import './Picture.scss'
import { CSSProperties } from 'react'
import DeleteIcon from '@/assets/Icons/Trash.svg?react'
import { useStore } from '@/stores'

import { useParams } from 'react-router-dom'

interface IPictureProps {
	src: string
	alt: string
	width?: number
	height?: number
	style?: CSSProperties
}

const Picture = ({
	alt,
	src,
	height = 108,
	width = 144,
	style = {},
	...otherProps
}: IPictureProps) => {
	const { company } = useStore()

	const { id } = useParams()

	const deletePicture = () => {
		if (id) {
			company.deletePicture(id, alt)
		}
	}

	return (
		<div className='picture'>
			<img
				src={src}
				alt={alt}
				width={width}
				height={height}
				style={{
					...style,
				}}
				className='picture__image'
				{...otherProps}
			/>

			<Button
				size='mini'
				variant='filled'
				Icon={DeleteIcon}
				onClick={deletePicture}
				className='picture__button'
			/>
		</div>
	)
}

export default Picture
