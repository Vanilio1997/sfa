import { z } from 'zod'

export const contactSchema = z.object({
	person: z
		.string()
		.min(1, 'Full name is required')
		.min(3, 'Full name must be at least 3 characters long')
		.max(100, 'Full name cannot exceed 100 characters')
		.refine((value) => value.trim().split(/\s+/).length >= 2, {
			message:
				'Please enter first and last name separated by space (e.g., John Smith)',
		})
		.refine(
			(value) => {
				const parts = value.trim().split(/\s+/)
				return parts.every((part) => part.length >= 2)
			},
			{
				message: 'Each name part must contain at least 2 characters',
			}
		),

	phone: z
		.string()
		.min(1, 'Phone number is required')
		.transform((value) => {
			const cleaned = value.replace(/[^\d+]/g, '')
			if (cleaned.startsWith('+')) {
				return cleaned
			}
			return cleaned.replace(/\D/g, '')
		})
		.refine(
			(value) => {
				const digitsOnly = value.replace(/\D/g, '')
				return digitsOnly.length === 11
			},
			{
				message: 'Phone number must be 11 digits',
			}
		)
		.refine(
			(value) => {
				const digitsOnly = value.replace(/\D/g, '')
				return /^[1-9]\d{0,14}$/.test(digitsOnly)
			},
			{
				message: 'Please enter a valid phone number',
			}
		),

	email: z
		.string()
		.min(1, 'Email is required')
		.email('Please enter a valid email address')
		.max(100, 'Email cannot exceed 100 characters')
		.regex(
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
			{
				message: 'Please enter a valid email address format',
			}
		),
})

export type ContactData = z.infer<typeof contactSchema>
