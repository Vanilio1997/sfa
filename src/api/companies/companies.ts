import { fetchData } from '..'
import { ICompany, companyUpdateType } from './companiesTypes'

const companiesURL = 'companies'

export async function getCompany(id: string): Promise<ICompany> {
	const response = await fetchData<never, ICompany>({
		url: `${companiesURL}/${id}`,
	})
	return response
}

export async function updateCompany(
	id: string,
	data: companyUpdateType
): Promise<ICompany> {
	const response = await fetchData<companyUpdateType, ICompany>({
		method: 'PATCH',
		body: data,
		url: `${companiesURL}/${id}`,
	})
	return response
}

export async function deleteCompany(id: string): Promise<ICompany> {
	const response = await fetchData<never, ICompany>({
		url: `${companiesURL}/${id}`,
		method: 'DELETE',
	})
	return response
}

export async function addPicture(
	id: string,
	data: FormData
): Promise<ICompany> {

	const response = await fetchData<FormData, ICompany>({
		url: `${companiesURL}/${id}/image`,
		headers: { 'Content-Type': 'multipart/form-data' },
		body: data,
		method: 'POST',
	})
	return response
}

export async function deletePicture(
	id: string,
	imageName: string
): Promise<ICompany> {
	const response = await fetchData<never, ICompany>({
		url: `${companiesURL}/${id}/image/${imageName}`,
		method: 'DELETE',
	})
	return response
}
