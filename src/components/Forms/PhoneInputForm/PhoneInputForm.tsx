import React, { useEffect } from 'react'
import { useIMask } from 'react-imask'
import { InputForm } from '@/components/Forms'
import { UseFormRegisterReturn } from 'react-hook-form'

interface PhoneInputFormProps {
	error?: string
	register: UseFormRegisterReturn
	placeholder?: string
	value?: string
}

export const PhoneInputForm: React.FC<PhoneInputFormProps> = ({
	error,
	register,
	placeholder = '+1 ___ ___ ____',
	value,
}) => {
	const { onChange, onBlur, name, ref: hookFormRef } = register

	const { ref: imaskRef, setValue } = useIMask({
		mask: '+1 000 000 0000',
		definitions: { '0': /[0-9]/ },
		onAccept: (value: string) => {
			const event = {
				target: { name, value },
			} as unknown as React.ChangeEvent<HTMLInputElement>
			onChange(event)
		},
	})

	useEffect(() => {
		if (value && imaskRef.current) {
			setValue(value)
		}
	}, [value, setValue, imaskRef])

	const combinedRef = (element: HTMLInputElement | null) => {
		if (element) {
			imaskRef.current = element
			hookFormRef(element)
		}
	}

	return (
		<InputForm
			type='tel'
			name={name}
			error={error}
			placeholder={placeholder}
			onBlur={onBlur}
			ref={combinedRef}
		/>
	)
}

export default PhoneInputForm
