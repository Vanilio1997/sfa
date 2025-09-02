import { useStore } from '@/stores'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import './OrganizationPage.scss'
import { DeleteCompanyModal } from './Components/DeleteCompanyModal'
import { useParams, useNavigate } from 'react-router-dom'

import EditIcon from '@/assets/Icons/Edit.svg?react'
import DeleteIcon from '@/assets/Icons/Trash.svg?react'
import ArrowIcon from '@/assets/Icons/Chevron.svg?react'
import CompanyForm from './Components/CompanyForm/CompanyForm'
import ContactForm from './Components/ContactForm/ContactForm'
import Pictures from './Components/Pictures/Pictures'

import { Button, Typography, Loader } from '@/components/Ui'
import { ChangeOrganizationNameModal } from './Components/ChangeOrganizationNameModal'

const OrganizationPage = observer(() => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isEditNameModlOpen, setIsEditNameModalOpen] = useState(false)

	const { company } = useStore()
	const { id } = useParams()
	const navigate = useNavigate()

	const handleOpenDeleteModal = () => setIsDeleteModalOpen(true)
	const handleCloseDeleteModal = () => setIsDeleteModalOpen(false)
	const handleOpenEditModal = () => setIsEditNameModalOpen(true)
	const handleCloseEditModal = () => setIsEditNameModalOpen(false)
	const backToOrganizationsPage = () => navigate('/organizations')

	useEffect(() => {
		if (id) {
			company.fetchCompany(id)
		}
	}, [id, company])

	if (company.status === 'loading' && !company.company) {
		return <Loader />
	}

	if (company.status === 'error') {
		return <div>Error</div>
	}

	if (!company.company) {
		return <div>Company not found</div>
	}

	return (
		<div className='organization-page'>
			<div className='organization-page__header'>
				<Typography variant='h4' color='#313131' weight='medium'>
					{company.company?.name}
				</Typography>
				<div className='organization-page__actions'>
					<Button
						size='mini'
						Icon={EditIcon}
						variant='bright'
						onClick={handleOpenEditModal}
					/>
					<Button
						size='mini'
						Icon={DeleteIcon}
						variant='bright'
						style={{ stroke: '#D72323' }}
						onClick={handleOpenDeleteModal}
					/>
				</div>
				<Button
					size='mini'
					Icon={ArrowIcon}
					variant='bright'
					onClick={backToOrganizationsPage}
					className='organization-page__button-back'
				/>
			</div>
			<div className='organization-page__content'>
				<CompanyForm />
				<ContactForm />
				<Pictures />
			</div>
			<DeleteCompanyModal
				isModalOpen={isDeleteModalOpen}
				handleCloseModal={handleCloseDeleteModal}
			/>
			<ChangeOrganizationNameModal
				isModalOpen={isEditNameModlOpen}
				handleCloseModal={handleCloseEditModal}
			/>
		</div>
	)
})

export default OrganizationPage
