import { useStore } from '@/stores'

import '../../styles/InfoCard.scss'

import { Card } from '@/components/Layouts'
import { Typography, UploadButton } from '@/components/Ui'
import Picture from './Picture/Picture'
import AddIcon from '@/assets/Icons/Add Photo.svg?react'

import { observer } from 'mobx-react-lite'

const Pictures = observer(() => {
	const { company } = useStore()

	const handleFileSelect = async (file: File) => {
		const multipartFormData: FormData = new FormData()
		multipartFormData.append('file', file)
		if (company.company?.id) {
			company.addPicture(company.company?.id, multipartFormData)
		}
	}

	return (
		<Card>
			<div className='card-details__content'>
				<div className='card-details__header'>
					<Typography variant='accent' weight='bold'>
						Photos
					</Typography>
					<UploadButton
						onFileSelect={handleFileSelect}
						icon={<AddIcon height={16} width={16} />}
						text='Add'
						accept='image/jpeg'
					/>
				</div>

				<div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
					{company.company?.photos.map((photo) => (
						<Picture
							src={photo.filepath}
							alt={photo.name}
							height={108}
							width={144}
						/>
					))}
				</div>
			</div>
		</Card>
	)
})

export default Pictures
