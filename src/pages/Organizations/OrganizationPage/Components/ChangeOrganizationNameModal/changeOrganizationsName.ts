import { z } from 'zod'

export const changeNameSchema = z.object({
	name: z.string().min(1, 'Organizations name is required'),
})

export type ChangeNameData = z.infer<typeof changeNameSchema>
