import DocumentTitle from '../../components/DocumentTitle'
import LoginForm from '../../components/LoginForm/LoginForm'
import s from "./LoginPage.module.css"

const LoginPage = () => {


	return (
		<div className={s.loginPage}>
			<DocumentTitle>Login</DocumentTitle>
			<LoginForm />
		</div>
	)
}

export default LoginPage
