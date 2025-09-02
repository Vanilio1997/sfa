import './App.css'
import { AppRouter } from './router'
import { store, StoreProvider } from './stores'

function App() {
	return (
		<StoreProvider store={store}>
			<AppRouter />
		</StoreProvider>
	)
}

export default App
