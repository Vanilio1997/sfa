import { useEffect } from 'react'
import Portal from '../Portal'
import { Card } from '@/components/Layouts'
import './ActionModal.scss'
import { Button, Typography } from '@/components/Ui'

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

interface IFormModal extends IModalProps {
	children: React.ReactNode
	isModalWithForm: true
}

type ModalProps = IActionModal | IFormModal

const ActionModal = (props: ModalProps) => {
	const { headerText, isModalWithForm, isOpen, onClose } = props
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
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
			onClose()
		}
	}

	return (
		<Portal isOpen={isOpen}>
			<div className='action-modal' onClick={handleOverlayClick}>
				<Card>
					<div>
						<Typography variant='accent' weight='bold' color='#333333'>
							{headerText}
						</Typography>
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
										onClick={props.onClose}
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
