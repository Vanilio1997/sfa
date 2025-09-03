import { useEffect, useRef, useState } from 'react'
import './MultiSelectForm.scss'
import ArrowIcon from '@/assets/Icons/Chevron.svg?react'

export interface IMultiSelectFormProps<T extends string> {
	label?: string
	options: T[]
	value?: T[]
	onChange?: (value: T[]) => void
	onBlur?: () => void
	error?: string
	placeholder?: string
	fullWidth?: boolean
	name?: string
}

const MultiSelectForm = <T extends string>({
	label,
	options,
	value = [],
	onChange,
	onBlur,
	error,
	placeholder = 'Select...',
	fullWidth = true,
	name,
}: IMultiSelectFormProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const selectRef = useRef<HTMLDivElement>(null)

	const handleToggle = (option: T) => {
		const newValue = value.includes(option)
			? value.filter((item) => item !== option)
			: [...value, option]

		onChange?.(newValue)
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

	const handleOptionKeyDown = (event: React.KeyboardEvent, option: T) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			handleToggle(option)
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

	const displayValue = value.length > 0 ? value.join(', ') : placeholder

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
						<label
							key={option}
							className={`select__option ${
									value.includes(option) ? 'select__option--selected' : ''
								}`}
							tabIndex={0}
							onKeyDown={(e) => handleOptionKeyDown(e, option)}
						>
							<input
								type='checkbox'
								checked={value.includes(option)}
								onChange={() => handleToggle(option)}
								className='select__checkbox'
								tabIndex={-1}
							/>
							<span
								className={`select__option-text ${
									value.includes(option) ? 'select__option-text--selected' : ''
								}`}
							>
								{option}
							</span>
						</label>
					))}
				</div>
			)}

			{error && <span className='select__error'>{error}</span>}
		</div>
	)
}

export default MultiSelectForm
