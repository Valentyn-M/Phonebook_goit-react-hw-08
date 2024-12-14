import { NavLink } from 'react-router-dom'
import s from './Navigation.module.css'
import { FaAddressBook } from 'react-icons/fa6'
import clsx from 'clsx'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/auth/selectors'

const Navigation = () => {

	const buildLinkClass = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

	const isLoggedIn = useSelector(selectIsLoggedIn);
	const linkRef = useRef(null);
	const handleClick = () => {
		!isLoggedIn && linkRef.current.blur();
	}

	return (
		<>
			<nav className={s.homeNav}>
				<NavLink to="/" className={({ isActive }) => clsx(buildLinkClass({ isActive }), s.home)}>
					<FaAddressBook className={s.icon} /><span className={s.appName}>Phonebook</span>
				</NavLink>
			</nav>
			{isLoggedIn && (
				<nav className={s.mainNav}>
					<NavLink to="/contacts" end className={buildLinkClass} ref={linkRef} onClick={handleClick}>
						Contacts
					</NavLink>
				</nav>
			)}
		</>
	)
}

export default Navigation
