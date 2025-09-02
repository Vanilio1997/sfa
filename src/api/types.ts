export interface ApiResponse<T> {
	data: T
	message?: string
	status: number
}

export interface ApiError {
	message: string
	status: number
	code?: string
}

export interface RequestConfig extends RequestInit {
	timeout?: number
	retries?: number
}

export interface UseApiState<T> {
	data: T | null
	loading: boolean
	error: ApiError | null
	status: number | null
}
