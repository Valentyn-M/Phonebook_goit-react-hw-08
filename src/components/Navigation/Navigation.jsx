import { NavLink } from 'react-router-dom'
import s from './Navigation.module.css'
import { FaAddressBook } from 'react-icons/fa6'
import clsx from 'clsx'

const Navigation = () => {

	const buildLinkClass = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

	return (
		<>
			<nav className={s.homeNav}>
				<NavLink to="/" className={({ isActive }) => clsx(buildLinkClass({ isActive }), s.home)}>
					<FaAddressBook className={s.icon} /> Phonebook
				</NavLink>
			</nav>
			<nav className={s.mainNav}>
				<NavLink to="/contacts" end className={buildLinkClass}>
					Contacts
				</NavLink>
			</nav>
		</>
	)
}

export default Navigation
