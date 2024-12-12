import { useDispatch, useSelector } from 'react-redux'
// import s from './UserMenu.module.css'
import { selectError, selectLoading, selectUser } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations';
import Loader from '../Loader/Loader';
import ModalErrorAuth from '../ModalErrorAuth/ModalErrorAuth';

const UserMenu = () => {

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	// Отримуємо зі стану Redux дані про стан loading та error
	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const errorText = "Check the entered data and make sure it is correct.";

	return (
		<div>
			<div>{user.name}</div>
			<button type='button' onClick={() => dispatch(logout())}>Logout</button>

			{isLoading && <Loader />}
			{error && <ModalErrorAuth message={errorText} />}
		</div>
	)
}

export default UserMenu
