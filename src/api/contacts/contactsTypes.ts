export interface IContact {
	id: string
	lastname: string
	firstname: string
	phone: string
	email: string
	createdAt: Date
	updatedAt: Date
}


export type updateContactType = Omit<IContact , 'id' | 'updatedAt' | 'createdAt'>
