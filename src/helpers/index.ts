export function formatUnderscoreToSpace(str: string) {
	return str.replace(/_/g, ' ')
}

export function toSnakeCase(str: string): string {
	return str.replace(/\s+/g, '_')
}

export function formatDate(
	dateString: string,
	isFateToForm: boolean = false
): string {
	const date = new Date(dateString)

	if (isNaN(date.getTime())) {
		return 'Invalid date'
	}

	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()
	if (isFateToForm) {
		return `${year}-${month}-${day}`
	}
	return `${day}.${month}.${year}`
}

export function getFirstLetters(str: string): string {
	return str
		.split(' ')
		.map((word) => word.charAt(0))
		.join('')
}
