export const BASE_URL = 'https://test-task-api.allfuneral.com/'

interface FetchDataOptions<T> {
	url: string
	body?: T
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	headers?: Record<string, string>
}

export async function fetchData<T, K>({
	url,
	method = 'GET',
	body,
	headers = { 'Content-Type': 'application/json' },
}: FetchDataOptions<T>): Promise<K> {
	const fullUrl = `${BASE_URL}${url}`

	const shouldHaveBody = !['GET', 'HEAD'].includes(method)

	const fetchOptions: RequestInit = {
		method,
		headers: {
			Authorization: `${localStorage.getItem('token')}`,
			...headers,
		},
	}

	if (shouldHaveBody && body) {
		if (body instanceof FormData) {
			fetchOptions.body = body
			delete fetchOptions.headers?.['Content-Type']
		} else {
			fetchOptions.body = JSON.stringify(body)
			fetchOptions.headers = {
				...fetchOptions.headers,
				'Content-Type': 'application/json',
			}
		}
	}

	const response = await fetch(fullUrl, fetchOptions)

	if (!response.ok) {
		const errorText = await response.text()
		throw new Error(
			`HTTP ${response.status}: ${errorText || response.statusText}`
		)
	}

	if (method === 'DELETE') {
		return undefined as unknown as K
	}

	return await response.json()
}
