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
	const isRefreshing = useSelector(selectIsRefreshing);

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

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
			</Routes>
		</Layout>
	);
}

export default App
