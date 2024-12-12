import { NavLink } from 'react-router-dom'
import s from './AuthNav.module.css'
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

const AuthNav = () => {
	return (
		<nav className={s.authNav}>
			<NavLink to="/register" end className={buildLinkClass}>
				Register
			</NavLink>
			<NavLink to="/login" end className={buildLinkClass}>
				Login
			</NavLink>
		</nav>
	)
}

export default AuthNav
