import { SVGProps } from 'react'

export type IconType = React.FC<SVGProps<SVGSVGElement>>

export type ButtonClickType = () => void

export interface IModalProps {
	isModalOpen: boolean
	handleCloseModal: () => void
}
