import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import Modal from 'react-modal';
import { Provider } from 'react-redux'
import { persistor, store } from "./redux/store";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';

// Установка кореневого елемента для бібліотеки React Modal.
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<PersistGate loading={null} persistor={persistor}>
					<HelmetProvider>
						<App />
					</HelmetProvider>
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</StrictMode>,
)
