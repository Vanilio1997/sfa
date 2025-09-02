import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
	onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
	hasError: boolean
	error?: Error
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
	}

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)

		if (this.props.onError) {
			this.props.onError(error, errorInfo)
		}
	}

	public render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div style={{ padding: '20px', textAlign: 'center' }}>
					<h2>Что-то пошло не так</h2>
					<p>Произошла ошибка. Пожалуйста, перезагрузите страницу.</p>
					{process.env.NODE_ENV === 'development' && (
						<details style={{ textAlign: 'left', marginTop: '10px' }}>
							<summary>Подробности ошибки (только для разработки)</summary>
							<pre>{this.state.error?.toString()}</pre>
						</details>
					)}
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
