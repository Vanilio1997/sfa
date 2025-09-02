import { useStore } from '@/stores'
import { useEffect, useState } from 'react'

import '../../styles/InfoCard.scss'

import { InputForm } from '@/components/Forms'
import { Card } from '@/components/Layouts'
import { Loader, Typography } from '@/components/Ui'

import { ContactData, contactSchema } from './contactSchema'

import CancelButton from '../CancelButton/CancelButton'
import { DetailsLabel } from '../DetailsLabel'
import { EditButton } from '../EditButton'
import { SaveButton } from '../SaveButton'

import { zodResolver } from '@hookform/resolvers/zod'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'

const ContactForm = observer(() => {
	const [isEditing, setIsEditing] = useState(false)
	const { contact, company } = useStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactData>({
		resolver: zodResolver(contactSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			person: '',
			phone: '',
		},
	})

	useEffect(() => {
		const contactId = company.company?.contactId
		if (contactId) {
			contact.fetchContact(contactId)
		}
	}, [company.company?.contactId])

	const startEditing = () => setIsEditing(true)
	const stopEditing = () => {
		setIsEditing(false)
		reset()
	}

	const onSubmit = async (data: ContactData) => {
		if (company.company?.contactId) {
			const { email, phone, person } = data
			const [firstname, lastname] = person.split(' ')
			await contact.updateContact(company.company?.contactId, {
				email,
				phone,
				firstname,
				lastname,
			})
			if (company.status === 'success') {
				stopEditing()
			}
		}
	}

	useEffect(() => {
		if (contact.contact) {
			reset({
				email: contact.contact.email,
				phone: contact.contact.phone,
				person: `${contact.contact.firstname} ${contact.contact.lastname}`,
			})
		}
	}, [contact.contact, reset])

	if (contact.status === 'loading' && !contact.contact) {
		return <Loader />
	}

	if (contact.status === 'error') {
		return <div>Error</div>
	}

	if (!contact.contact) {
		return <div>Contact not found</div>
	}

	return (
		<Card>
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
				<div className='card-details__content'>
					<div className='card-details__header'>
						<Typography variant='accent' weight='bold'>
							Contacts
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
							<DetailsLabel text='Responsible person' />

							<div className='card-details__value'>
								{isEditing ? (
									<>
										<InputForm
											{...register('person')}
											error={errors.person?.message}
										/>
									</>
								) : (
									<>
										<Typography variant='accent' color='#33333'>
											{contact.contact?.firstname} {contact.contact?.lastname}
										</Typography>
									</>
								)}
							</div>
						</div>
						<div
							className={`card-details__section ${
								isEditing ? 'card-details__section--large' : ''
							}`}
						>
							<DetailsLabel text='Phone number' />
							{isEditing ? (
								<InputForm
									{...register('phone')}
									error={errors.phone?.message}
								/>
							) : (
								<Typography variant='accent' color='#33333'>
									{contact.contact.phone}
								</Typography>
							)}
						</div>
						<div
							className={`card-details__section ${
								isEditing ? 'card-details__section--large' : ''
							}`}
						>
							<DetailsLabel text='E-mail' />

							{isEditing ? (
								<InputForm
									{...register('email')}
									error={errors.email?.message}
								/>
							) : (
								<Typography variant='accent' color='#33333'>
									{contact.contact.email}
								</Typography>
							)}
						</div>
					</div>
				</div>
			</form>
		</Card>
	)
})

export default ContactForm
