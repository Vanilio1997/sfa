import { fetchData } from '..'
import { IContact, updateContactType } from './contactsTypes'

const contactsURL = 'contacts'

export async function getContact(id: string): Promise<IContact> {
	const response = await fetchData<never, IContact>({
		url: `${contactsURL}/${id}`,
	})
	return response
}

export async function updateContact(
	id: string,
	data: updateContactType
): Promise<IContact> {
	const response = await fetchData<updateContactType, IContact>({
		method: 'PATCH',
		body: data,
		url: `${contactsURL}/${id}`,
	})
	return response
}
