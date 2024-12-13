import { useDispatch, useSelector } from 'react-redux'
import s from './UserMenu.module.css'
import { selectLoading, selectUser } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations';
import Loader from '../Loader/Loader';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineLogout } from 'react-icons/md';
import { useEffect, useRef } from 'react';

const UserMenu = () => {

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const isLoading = useSelector(selectLoading);

	const btnRefLogout = useRef(null);
	const btnRefUserName = useRef(null);
	const handleClick = () => {
		btnRefLogout.current.classList.toggle(s.isActive);
		btnRefUserName.current.classList.toggle(s.isActive);
	}

	const userMenuRef = useRef(null);
	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				userMenuRef.current &&
				!userMenuRef.current.contains(event.target)
			) {
				btnRefLogout.current?.classList.remove(s.isActive);
				btnRefUserName.current?.classList.remove(s.isActive);
			}
		};
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, []);

	return (
		<div className={s.userMenu} ref={userMenuRef}>
			<button type="button" className={s.userName} onClick={handleClick} ref={btnRefUserName}>{user.name}<IoIosArrowDown className={s.icon} /></button>
			<button type="button" className={s.logout} onClick={() => dispatch(logout())} ref={btnRefLogout}><MdOutlineLogout className={s.icon} />Logout</button>

			{isLoading && <Loader />}
		</div>
	)
}

export default UserMenu
