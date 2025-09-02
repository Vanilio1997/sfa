import './ChangeOrganizationNameModal.scss'
import { useStore } from '@/stores'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionModal } from '@/components/Dialogs'
import { IModalProps } from '@/commonTypes'
import {
	changeNameSchema,
	type ChangeNameData,
} from './changeOrganizationsName'
import { InputForm } from '@/components/Forms'
import { Button } from '@/components/Ui'
import { companyUpdateType } from '@/api/companies/companiesTypes'
import { getFirstLetters } from '@/helpers'
import { useEffect } from 'react'
const ChangeOrganizationNameModal = ({
	handleCloseModal,
	isModalOpen,
}: IModalProps) => {
	const { company } = useStore()
	const { id } = useParams()

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		reset,
	} = useForm<ChangeNameData>({
		resolver: zodResolver(changeNameSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
		},
	})

	const onSubmit = async (data: ChangeNameData) => {
		if (id && company?.company) {
			clearErrors('root')
			const {
				businessEntity,
				contract,
				type,
			}: Omit<companyUpdateType, 'name' | 'shortName'> = company.company
			const preparedData: companyUpdateType = {
				...data,
				businessEntity,
				type,
				contract,
				shortName: getFirstLetters(data.name),
			}
			await company.updateCompany(id, preparedData)
			if (company.status === 'success') {
				handleCloseModal()
			}
		}
	}

	useEffect(() => {
		if (isModalOpen) {
			if (company.company) {
				reset({
					name: company.company.name,
				})
			}
		}
	}, [isModalOpen])

	function onClose() {
		handleCloseModal()
		reset()
	}
	return (
		<ActionModal
			isOpen={isModalOpen}
			onClose={handleCloseModal}
			isModalWithForm={true}
			headerText="Specify the Organization's name"
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='change-organization-name-modal__input-wrapper'>
					<InputForm
						type='text'
						placeholder='Enter organization name'
						autoComplete='name'
						error={errors.name?.message}
						fullWidth={true}
						{...register('name')}
					/>
				</div>
				<div className='action-modal__actions'>
					<Button
						size='normal'
						variant='outline'
						label='Cancel'
						onClick={onClose}
						fullWidth
					/>
					<Button
						size='normal'
						variant='filled'
						label='Save changes'
						fullWidth
						type='submit'
					/>
				</div>
			</form>
		</ActionModal>
	)
}

export default ChangeOrganizationNameModal
