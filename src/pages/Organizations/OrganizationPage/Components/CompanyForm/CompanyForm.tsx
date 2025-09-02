import { useStore } from '@/stores'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/InfoCard.scss'

import {
	InputForm,
	MultiSelectForm,
	SingleSelectForm,
} from '@/components/Forms'
import { Card } from '@/components/Layouts'
import { Typography } from '@/components/Ui'

import { formatDate, formatUnderscoreToSpace, toSnakeCase } from '@/helpers'
import { CompanyFormData, companySchema } from './companySchema'

import CancelButton from '../CancelButton/CancelButton'
import { DetailsLabel } from '../DetailsLabel'
import { EditButton } from '../EditButton'
import { SaveButton } from '../SaveButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

const CompanyForm = observer(() => {
	const [isEditing, setIsEditing] = useState(false)
	const { company } = useStore()
	const { id } = useParams()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<CompanyFormData>({
		resolver: zodResolver(companySchema),
		mode: 'onChange',
		defaultValues: {
			contract: {
				no: '',
				issue_date: '',
			},
			businessEntity: '',
			name: '',
			shortName: '',
			type: [],
		},
	})

	const startEditing = () => setIsEditing(true)
	const stopEditing = () => {
		setIsEditing(false)
		reset()
	}

	const onSubmit = async (data: CompanyFormData) => {
		if (id) {
			const parsedTypes = data.type.map((item) => toSnakeCase(item))
			await company.updateCompany(id, { ...data, type: parsedTypes })
			if (company.status === 'success') {
				stopEditing()
			}
		}
	}

	useEffect(() => {
		if (company.company) {
			reset({
				contract: {
					no: company.company.contract.no,
					issue_date: formatDate(company.company.contract.issue_date, true),
				},
				businessEntity: company.company.businessEntity,
				name: company.company.name,
				shortName: company.company.shortName,
				type: company.company.type.map((item) => formatUnderscoreToSpace(item)),
			})
		}
	}, [company.company, reset])

	return (
		<Card>
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
				<div className='card-details__content'>
					<div className='card-details__header'>
						<Typography variant='accent' weight='bold'>
							Company Details
						</Typography>
						{isEditing ? (
							<div className='card-details__actions'>
								<SaveButton />
								<CancelButton onClick={stopEditing} />
							</div>
						) : (
							<EditButton onClick={startEditing} />
						)}
					</div>
					<div
						className={`card-details__agreement-content ${
							isEditing ? 'card-details__agreement-content--large' : ''
						}`}
					>
						<div
							className={`card-details__section ${
								isEditing ? 'card-details__section--large' : ''
							}`}
						>
							<DetailsLabel text='Agreement' />

							<div className='card-details__value'>
								{isEditing ? (
									<>
										<InputForm
											{...register('contract.no')}
											error={errors.contract?.no?.message}
										/>
										<DetailsLabel text='Date' isSlim={true} />
										<InputForm
											type='date'
											{...register('contract.issue_date')}
											error={errors.contract?.issue_date?.message}
										/>
									</>
								) : (
									<>
										<Typography variant='accent' color='#33333'>
											{company.company?.contract.no}
										</Typography>
										<Typography variant='accent' color='#B3b3b3'>
											/
										</Typography>
										<Typography variant='accent' color='#33333'>
											{company.company &&
												formatDate(company.company.contract.issue_date)}
										</Typography>{' '}
									</>
								)}
							</div>
						</div>
						<div
							className={`card-details__section ${
								isEditing ? 'card-details__section--large' : ''
							}`}
						>
							<DetailsLabel text='Business entity' />
							{isEditing ? (
								<Controller
									name='businessEntity'
									control={control}
									render={({ field, fieldState }) => (
										<SingleSelectForm
											options={[
												'Sole Proprietorship',
												'Partnership',
												'Limited Liability Company',
											]}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											error={fieldState.error?.message}
											name={field.name}
										/>
									)}
								/>
							) : (
								<Typography variant='accent' color='#33333'>
									{company.company?.businessEntity}
								</Typography>
							)}
						</div>
						<div
							className={`card-details__section ${
								isEditing ? 'card-details__section--large' : ''
							}`}
						>
							<DetailsLabel text='Company type' />

							{isEditing ? (
								<Controller
									name='type'
									control={control}
									render={({ field, fieldState }) => (
										<MultiSelectForm<string>
											options={[
												'funeral home',
												'logistics services',
												'burial care contractor',
											]}
											value={field.value || []}
											onChange={field.onChange}
											onBlur={field.onBlur}
											error={fieldState.error?.message}
											name={field.name}
										/>
									)}
								/>
							) : (
								company.company?.type.map((item, index, array) => (
									<Typography variant='accent' key={index}>
										{formatUnderscoreToSpace(item)}
										{index !== array.length - 1 && ', '}
									</Typography>
								))
							)}
						</div>
					</div>
				</div>
			</form>
		</Card>
	)
})

export default CompanyForm
