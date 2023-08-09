import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {
	Layout,
	HomePage,
	OutOfStockPage,
	SettingsPage,
	NotFoundPage,
} from './routes';
import './App.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="out-of-stock" element={<OutOfStockPage />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
