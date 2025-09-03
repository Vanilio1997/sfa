import { useEffect } from 'react'
import Portal from '../Portal'
import { Card } from '@/components/Layouts'
import './ActionModal.scss'
import { Button, Typography } from '@/components/Ui'
import { UseFormReset, FieldValues } from 'react-hook-form'

interface IModalProps {
	isOpen: boolean
	headerText: string
	isModalWithForm: boolean
	onClose: () => void
}

interface IActionModal extends IModalProps {
	isModalWithForm: false
	confirmAction: () => void
	abortButtonText: string
	confirmButtonText: string
	text: string
}

interface IFormModal<T extends FieldValues> extends IModalProps {
	children: React.ReactNode
	isModalWithForm: true
	reset: UseFormReset<T>
}

type ModalProps<T extends FieldValues> = IActionModal | IFormModal<T>

const ActionModal = <T extends FieldValues>(props: ModalProps<T>) => {
	const { headerText, isModalWithForm, isOpen, onClose } = props
	function closeDialog() {
		if (isModalWithForm) {
			props.reset()
		}
		onClose()
	}
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeDialog()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
			return () => document.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, onClose])

	if (!isOpen) return null

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeDialog()
		}
	}

	return (
		<Portal isOpen={isOpen}>
			<div className='action-modal' onClick={handleOverlayClick}>
				<Card className='action-modal__card'>
					<div className='action-modal__content'>
						<div className='action-modal__header'>
							<Typography variant='accent' weight='bold' color='#333333'>
								{headerText}
							</Typography>
						</div>
						{isModalWithForm ? (
							<>{props.children} </>
						) : (
							<>
								<Typography
									variant='body'
									tag='p'
									color='#333333'
									className='action-modal__text'
								>
									{props.text}
								</Typography>
								<div className='action-modal__actions'>
									<Button
										size='normal'
										variant='outline'
										label={props.abortButtonText}
										onClick={closeDialog}
										fullWidth
									/>
									<Button
										size='normal'
										variant='filled'
										label={props.confirmButtonText}
										onClick={props.confirmAction}
										fullWidth
									/>
								</div>
							</>
						)}
					</div>
				</Card>
			</div>
		</Portal>
	)
}

export default ActionModal
