import { z } from 'zod'

export const authSchema = z.object({
	userName: z.string().min(1, 'Username is required'),
})

export type AuthFormData = z.infer<typeof authSchema>
