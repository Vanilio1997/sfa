import { z } from 'zod'

export const OrganizationUpdateSchema = z.object({
	userName: z.string().min(1, 'Username is required'),

})

export type OrganizationUpdateFormData = z.infer<
	typeof OrganizationUpdateSchema
>
