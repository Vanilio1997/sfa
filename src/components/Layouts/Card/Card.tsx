import { ReactNode } from 'react'
import './Card.scss'

interface ICard {
	children: ReactNode,
	className?: string,
}

const Card = ({ children, className = '' }: ICard) => {
	return <div className={`card ${className}`}>{children}</div>
}

export default Card
