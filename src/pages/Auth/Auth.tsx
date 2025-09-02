import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputForm } from '@/components/Forms'
import './Auth.scss'
import { BASE_URL } from '@/api'
import { Card } from '@/components/Layouts'
import { Button, Typography } from '@/components/Ui'
import { authSchema, type AuthFormData } from './authSchema'

const Auth: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<AuthFormData>({
		resolver: zodResolver(authSchema),
		mode: 'onChange',
		defaultValues: {
			userName: '',
		},
	})

	const navigate = useNavigate()

	const onSubmit = async (data: AuthFormData) => {
		try {
			clearErrors('root')

			const response = await fetch(`${BASE_URL}auth?user=${data.userName}`)
			if (response.ok) {
				const token = response.headers.get('Authorization')
				if (token) {
					localStorage.setItem('token', token)
				}

				navigate('/main')
			} else {
				setError('root', {
					type: 'manual',
					message: 'Authorization error',
				})
			}
		} catch (err) {
			setError('root', {
				type: 'manual',
				message: 'Connection error. Please try again later.',
			})
			console.error('Auth error:', err)
		}
	}

	return (
		<div className='auth'>
			<div className='auth__container'>
				<div className='auth__form'>
					<Card>
						<>
							<Typography variant='accent' weight='bold'>
								Login
							</Typography>
							{errors.root && (
								<div className='auth__error'>
									<span className='auth__error-icon'>⚠️</span>
									<span className='auth__error-text'>
										{errors.root.message}
									</span>
								</div>
							)}

							<form
								onSubmit={handleSubmit(onSubmit)}
								className='auth__form-content'
							>
								<InputForm
									type='text'
									placeholder='Enter your username'
									autoComplete='username'
									error={errors.userName?.message}
									{...register('userName')}
								/>
								<Button
									size='normal'
									variant='filled'
									type='submit'
									disabled={isSubmitting}
									className={`auth__submit ${
										isSubmitting ? 'auth__submit--loading' : ''
									}`}
									label='Enter'
								/>
							</form>
						</>
					</Card>
				</div>
			</div>
		</div>
	)
}


export default Auth
