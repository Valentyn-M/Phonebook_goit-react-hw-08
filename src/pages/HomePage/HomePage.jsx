import s from "./HomePage.module.css"
import DocumentTitle from '../../components/DocumentTitle';
import { FaAddressBook } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const HomePage = () => {

	const isLoggedIn = useSelector(selectIsLoggedIn);

	return (
		<div className={s.homePage}>
			<DocumentTitle>Phonebook</DocumentTitle>
			<h1 className={s.title}><FaAddressBook className={s.icon} /><span>Phonebook</span></h1>
			<p className={s.slogan}>Simple Solution for Managing Contacts</p>
			<p className={s.about}>Phonebook helps you store, find, and manage your contacts quickly and easily</p>
			<p className={s.actionСall}>Create, edit, and delete contacts with just a few clicks</p>
			<ul className={s.advantages}>
				<li className={s.advantage}><FiCheckCircle />User-friendly and intuitive interfac</li>
				<li className={s.advantage}><FiCheckCircle />Secure storage of your data</li>
				<li className={s.advantage}><FiCheckCircle />Fast search by name or number</li>
				<li className={s.advantage}><FiCheckCircle />Sorting and customizable contact display modes</li>
				<li className={s.advantage}><FiCheckCircle />Access from any device</li>
			</ul>

			{!isLoggedIn && (
				<div className={s.notLoggedIn}>
					<h3 className={s.authTitle}>Get Started with Phonebook</h3>
					<p className={s.authText}>To access your personal phonebook and manage your contacts, please create a free account or log in to an existing one.</p>
					<ul className={s.authList}>
						<li className={s.authItem}><MdOutlineLogin className={s.authIcon} /><NavLink to="/register" className={s.link}>Register</NavLink>: Sign up in just a few simple steps and start organizing your contacts today.</li>
						<li className={s.authItem}><MdOutlineLogin className={s.authIcon} /><NavLink to="/login" className={s.link}>Login</NavLink>: Already have an account? Log in to continue managing your contacts.</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default HomePage
