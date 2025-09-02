import { ReactNode } from 'react'
import './Card.scss'

interface ICard {
	children: ReactNode
}

const Card = ({ children }: ICard) => {
	return <div className='card'>{children}</div>
}

export default Card
