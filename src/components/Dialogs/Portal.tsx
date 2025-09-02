import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface IProtalProps {
	isOpen: boolean
	children: React.ReactNode
}

const Portal = ({ children, isOpen }: IProtalProps) => {
	const [container, setContainer] = useState<HTMLDivElement | null>(null)

	useEffect(() => {
		if (isOpen) {
			const portalRoot = document.createElement('div')
			portalRoot.id = 'portal-root'
			document.body.appendChild(portalRoot)
			setContainer(portalRoot)

			document.body.style.overflow = 'hidden'

			return () => {
				document.body.removeChild(portalRoot)
				document.body.style.overflow = 'unset'
			}
		}
	}, [isOpen])

	if (!container || !isOpen) return null

	return createPortal(children, container)
}

export default Portal
