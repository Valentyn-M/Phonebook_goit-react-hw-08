import { Form, Field, Formik, ErrorMessage } from 'formik'
import s from './LoginForm.module.css'
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { selectError, selectIsLoggedIn, selectLoading, selectUser } from '../../redux/auth/selectors';
import ModalErrorAuth from '../ModalErrorAuth/ModalErrorAuth';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';


const LoginForm = () => {

	const initialValues = {
		email: "",
		password: ""
	}
	const registerSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email address")
			.required("Required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters long")
			.max(32, "Password must not exceed 32 characters")
			.matches(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])/,
				"Password must contain at least one uppercase letter, one number, and one special character (e.g., .!@#$%^&*)"
			)
			.required("Required"),
	});

	const dispatch = useDispatch();
	const handleSubmit = (values, actions) => {
		dispatch(login(values))
		actions.resetForm();
	}

	const userName = useSelector(selectUser).name;
	const isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		if (isLoggedIn) {
			toast.success(`welcome ${userName}!`);
		};
	}, [isLoggedIn, userName, dispatch]);

	// Отримуємо зі стану Redux дані про стан loading та error
	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const errorText = "Check the entered data and make sure it is correct.";

	return (
		<>
			<div className={s.loginForm}>
				<h3 className={s.title}>Login</h3>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
					{({ errors, touched }) => (
						<Form className={s.form}>
							<label className={s.label} htmlFor="email">
								<div className={`${s.fieldWrap} ${errors.email && touched.email ? s.error : ""}`}>
									<MdAlternateEmail className={s.fieldIcon} />
									<Field className={s.field} type="email" name="email" id="email" placeholder=" " autoComplete="off" />
									<span className={s.floatingLabel}>Email</span>
									<ErrorMessage className={s.floatingError} name="email" component="span" />
								</div>
							</label>
							<label className={s.label} htmlFor="password">
								<div className={`${s.fieldWrap} ${errors.password && touched.password ? s.error : ""}`}>
									<RiLockPasswordLine className={s.fieldIcon} />
									<Field className={s.field} type="password" name="password" id="password" placeholder=" " autoComplete="off" />
									<span className={s.floatingLabel}>Password</span>
									<ErrorMessage className={s.floatingError} name="password" component="span" />
								</div>
							</label>
							<button className={s.btn} type="submit">Login</button>
						</Form>
					)}
				</Formik>
				<p className={s.addText}>Don&apos;t have an account? <NavLink to="/register" className={s.link}>Register</NavLink></p>
			</div>

			{isLoading && <Loader />}
			{error && <ModalErrorAuth message={errorText} />}
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					success: {
						duration: 2500,
						style: {
							background: '#E2E5E9',
						},
					}
				}}
			/>

		</>
	)
}

export default LoginForm
