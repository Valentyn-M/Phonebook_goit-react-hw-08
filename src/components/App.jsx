import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { selectIsRefreshing } from '../redux/auth/selectors';
import { lazy, useEffect } from 'react';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import { refreshUser } from '../redux/auth/operations';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RestrictedRoute = lazy(() => import("./RestrictedRoute"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

function App() {

	const dispatch = useDispatch();
	useEffect(() => {
		// При переході до будь-якого компоненту нашого додатку ми робимо запит на сервер
		// Робимо запит на бекенд, щоб отримати дані про користувача (ключ цього користвуача є у локальному сховищі браузера, який при через persist записується у стан state.auth.token)
		// Тобто ми перевіряємо чи є залогінений користувач
		dispatch(refreshUser());
	}, [dispatch]);

	const isRefreshing = useSelector(selectIsRefreshing);
	// Рендеримо додаток тільки коли перевірка користувача (isRefreshing) закінчилась (або fulfilled, або rejected) - не pending
	return isRefreshing ? (
		<Loader />
	) : (
		<Layout>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/register"
					element={
						<RestrictedRoute redirectTo="/contacts" component={<RegistrationPage />} />
					}
				/>
				<Route
					path="/login"
					element={
						<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
					}
				/>
				<Route
					path="/contacts"
					element={
						<PrivateRoute redirectTo="/login" component={<ContactsPage />} />
					}
				/>
				{/* <Route path="*" element={<NotFoundPage />} /> */}
				{/* TODO 404 */}
			</Routes>
		</Layout>
	);
}

export default App
