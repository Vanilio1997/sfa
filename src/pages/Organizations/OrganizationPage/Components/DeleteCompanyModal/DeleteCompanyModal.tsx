import { useStore } from '@/stores'
import { useParams, useNavigate } from 'react-router-dom'
import { ActionModal } from '@/components/Dialogs'
import { IModalProps } from '@/commonTypes'

const DeleteCompanyModal = ({ handleCloseModal, isModalOpen }: IModalProps) => {
	const { company } = useStore()
	const { id } = useParams()
	const navigate = useNavigate()

	const deleteCompany = async () => {
		if (id) {
			await company.deleteCompany(id)

			if (company.status === 'success') {
				handleCloseModal()
				navigate('/organizations')
			}
		}
	}

	return (
		<ActionModal
			isOpen={isModalOpen}
			onClose={handleCloseModal}
			isModalWithForm={false}
			text='Are you sure you want to remove this Organization?'
			headerText='Remove the Organization?'
			abortButtonText='No'
			confirmButtonText='Yes, remove'
			confirmAction={deleteCompany}
		/>
	)
}

export default DeleteCompanyModal
