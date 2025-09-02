import { InputHTMLAttributes, forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import './InputForm.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	register?: UseFormRegisterReturn
	fullWidth?: boolean
}

const InputForm = forwardRef<HTMLInputElement, InputProps>(
	(
		{ label, error, register, fullWidth = true, className = '', ...props },
		ref
	) => {
		const inputId =
			props.id ||
			`input-${props.name || Math.random().toString(36).substr(2, 9)}`

		return (
			<div
				className={`input ${fullWidth ? 'input--full-width' : ''} ${className}`}
			>
				<div className='input-form__field'>
					{label && (
						<label htmlFor={inputId} className='input__label'>
							{label}
						</label>
					)}

					<input
						id={inputId}
						ref={ref}
						className={`input__field ${error ? 'input__field--error' : ''} ${
							props.disabled ? 'input__field--disabled' : ''
						} ${fullWidth ? 'input--full-width' : ''}`}
						{...register}
						{...props}
					/>
				</div>

				{error && <span className='input__error'>{error}</span>}
			</div>
		)
	}
)

export default InputForm
