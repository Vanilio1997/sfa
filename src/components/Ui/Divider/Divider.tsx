import { CSSProperties } from 'react'

interface DividerProps {
	color?: string
	thickness?: number
	spacing?: number
	style?: CSSProperties
	variant?: 'solid' | 'dashed' | 'dotted'
	orientation?: 'horizontal' | 'vertical'
	length?: string | number
}

const Divider = ({
	color = '#e0e0e0',
	thickness = 1,
	spacing = 8,
	style,
	variant = 'solid',
	orientation = 'horizontal',
	length = '100%',
}: DividerProps) => {
	const dividerStyle: CSSProperties = {
		borderStyle: variant !== 'solid' ? variant : 'solid',
		borderWidth: variant !== 'solid' ? `0 0 ${thickness}px 0` : '0',
		borderColor: variant !== 'solid' ? color : 'transparent',
		backgroundColor: variant === 'solid' ? color : 'transparent',
		width: orientation === 'horizontal' ? length : `${thickness}px`,
		height: orientation === 'vertical' ? length : `${thickness}px`,
		margin: orientation === 'horizontal' ? `${spacing}px 0` : `0 ${spacing}px`,
		flexShrink: 0,
		...style,
	}

	return <div style={dividerStyle} />
}

export default Divider
