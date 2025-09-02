import { useState, useRef, useEffect } from 'react'
import './SingleSelectForm.scss'
import ArrowIcon from '@/assets/Icons/Chevron.svg?react'

export interface ISingleSelectFormProps {
	label?: string
	options: string[]
	value?: string
	onChange?: (value: string) => void
	onBlur?: () => void
	error?: string
	placeholder?: string
	fullWidth?: boolean
	name?: string
}

const SingleSelectForm = ({
	label,
	options,
	value = '',
	onChange,
	onBlur,
	error,
	placeholder = 'Select...',
	fullWidth = true,
	name,
}: ISingleSelectFormProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const selectRef = useRef<HTMLDivElement>(null)

	const handleSelect = (option: string) => {
		onChange?.(option)
		setIsOpen(false)
		setIsFocused(false)
	}

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
		if (!selectRef.current?.contains(event.relatedTarget as Node)) {
			setIsFocused(false)
			setIsOpen(false)
			onBlur?.()
		}
	}

	const handleClick = () => {
		setIsOpen(!isOpen)
		if (!isFocused) {
			setIsFocused(true)
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (!isFocused) return

		switch (event.key) {
			case 'Escape':
				setIsOpen(false)
				selectRef.current?.blur()
				break
			case 'Enter':
			case ' ':
				event.preventDefault()
				setIsOpen(!isOpen)
				break
			case 'ArrowDown':
				event.preventDefault()
				if (!isOpen) setIsOpen(true)
				break
			case 'ArrowUp':
				event.preventDefault()
				if (isOpen) setIsOpen(false)
				break
			case 'Tab':
				if (isOpen) {
					event.preventDefault()
					setIsOpen(false)
				}
				break
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				setIsFocused(false)
				onBlur?.()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [onBlur])

	const displayValue = value || placeholder

	return (
		<div
			ref={selectRef}
			className={`select ${fullWidth ? 'select--full-width' : ''} ${
				isFocused ? 'select--focused' : ''
			} ${isOpen ? 'select--open' : ''}`}
			tabIndex={0}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
		>
			<div className='select-form__field'>
				{label && (
					<label htmlFor={name} className='select__label'>
						{label}
					</label>
				)}

				<div
					className={`select__trigger ${
						error ? 'select__trigger--error' : ''
					} ${isOpen ? 'select__trigger--open' : ''}`}
					onClick={handleClick}
					id={name}
				>
					<span className='select__value'>{displayValue}</span>
					<div className='select__arrow'>
						<ArrowIcon stroke='#333333' />
					</div>
				</div>
			</div>

			{isOpen && (
				<div className='select__options'>
					{options.map((option) => (
						<div
							key={option}
							className={`select__option ${
								value === option ? 'select__option--selected' : ''
							}`}
							onClick={() => handleSelect(option)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault()
									handleSelect(option)
								}
							}}
							tabIndex={0}
						>
							{option}
						</div>
					))}
				</div>
			)}

			{error && <span className='select__error'>{error}</span>}
		</div>
	)
}

export default SingleSelectForm
