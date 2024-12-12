import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation"
import s from "./AppBar.module.css"
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav"

const AppBar = () => {

	const isLoggedIn = useSelector(selectIsLoggedIn);

	return (
		<div className={s.navContainer}>
			<Navigation />
			{isLoggedIn ? <UserMenu /> : <AuthNav />}
		</div>
	)
}

export default AppBar
