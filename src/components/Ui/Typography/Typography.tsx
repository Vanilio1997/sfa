import React from 'react'
import './Typography.scss'
import { TypographyProps, TypographyTag } from './types'

const variantToDefaultTag: Record<TypographyTag, TypographyTag> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	div: 'div',
	span: 'span',
	p: 'p',
}

const Typography: React.FC<
	TypographyProps & React.HTMLAttributes<HTMLElement>
> = ({
	variant,
	tag = 'span',
	weight = 'regular',
	children,
	className = '',
	color = '#000',
	...otherProps
}) => {
	const Component = variantToDefaultTag?.[tag]

	const classNames = [
		`typography--variant--${variant}`,
		`typography--weight--${weight}`,
		className,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<Component className={classNames} {...otherProps} style={{ color }}>
			{children}
		</Component>
	)
}

export default Typography
