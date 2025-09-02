export type TypographyVariant =
	| 'assistitive'
	| 'caption'
	| 'body'
	| 'accent'
	| 'h4'

export type TypographyTag =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'div'

export interface TypographyProps {
	variant: TypographyVariant
	tag?: TypographyTag
	children: React.ReactNode
	weight?: 'regular' | 'medium' | 'bold'
	className?: string
	color?: string
}
