import DocumentTitle from "../../components/DocumentTitle"
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm"
import s from "./RegistrationPage.module.css"

const RegistrationPage = () => {
	return (
		<div className={s.registerPage}>
			<DocumentTitle>Register</DocumentTitle>
			<RegistrationForm />
		</div>
	)
}

export default RegistrationPage
