import { z } from 'zod'

export const companySchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name cannot exceed 100 characters')
		.regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
		.refine((name) => name.trim().length > 0, {
			message: 'Name is required',
		}),

	shortName: z
		.string()
		.min(2, 'Short name must be at least 2 characters')
		.max(20, 'Short name cannot exceed 20 characters')
		.regex(/^[a-zA-Z0-9]+$/, 'Short name can only contain letters and numbers')
		.refine((shortName) => shortName.trim().length > 0, {
			message: 'Short name is required',
		}),

	businessEntity: z
		.string()
		.min(1, 'Business entity is required')
		.refine(
			(entity) =>
				[
					'Sole Proprietorship',
					'Partnership',
					'Limited Liability Company',
				].includes(entity),
			{
				message: 'Invalid business entity type',
			}
		),

	contract: z.object({
		no: z
			.string()
			.min(3, 'Contract number must be at least 3 characters')
			.max(50, 'Contract number cannot exceed 50 characters')
			.regex(
				/^[a-zA-Z0-9\/\-]+$/,
				'Contract number can only contain letters, numbers, slashes and hyphens'
			)
			.refine((no) => no.trim().length > 0, {
				message: 'Contract number is required',
			}),

		issue_date: z
			.string()
			.refine((date) => !isNaN(Date.parse(date)), {
				message: 'Invalid date format',
			})
			.transform((date) => new Date(date).toISOString()),
	}),

	type: z
		.array(z.string())
		.min(1, 'At least one company type is required')
		.max(3, 'Cannot have more than 3 company types')
		.refine((types) => types.length > 0, {
			message: 'At least one company type must be selected',
		}),
})

export type CompanyFormData = z.infer<typeof companySchema>
