import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';

/**
 * Публічний маршрут:
 * - Якщо користувач увійшов у систему, рендеримо <Navigate> до redirectTo (redirectTo="/contacts" - в компоненті App).
 * - В іншому випадку рендеримо Component
 */

const RestrictedRoute = ({ component, redirectTo = '/' }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	return isLoggedIn ? <Navigate to={redirectTo} /> : component;
}

export default RestrictedRoute
