import s from './RegistrationForm.module.css'
import { Form, ErrorMessage, Field, Formik } from 'formik'
import * as Yup from "yup";
import { MdAlternateEmail, MdOutlinePersonOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { NavLink } from 'react-router-dom';
import { selectError, selectIsLoggedIn, selectLoading, selectUser } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ModalErrorAuth from '../ModalErrorAuth/ModalErrorAuth';
import Loader from '../Loader/Loader';

const RegistrationForm = () => {
	const initialValues = {
		name: "",
		email: "",
		password: "",
	}

	const registerSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, "Too Short!")
			.max(20, "Too Long!")
			.required("Required"),
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
		dispatch(register(values));
		actions.resetForm();
	}

	const userName = useSelector(selectUser).name;
	const isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		if (isLoggedIn) {
			toast.success(`welcome ${userName}!`);
		};
	}, [isLoggedIn, userName, dispatch]);

	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const errorText = error?.includes("400")
		? "Check the entered data and make sure it is correct. Perhaps a user with this email already exists."
		: "Please refresh the page and try again.";

	return (
		<>
			<div className={s.regForm}>
				<h3 className={s.title}>Registration</h3>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={registerSchema}>
					{({ errors, touched }) => (
						<Form className={s.form}>
							<label className={s.label} htmlFor="name">
								<div className={`${s.fieldWrap} ${errors.name && touched.name ? s.error : ""}`}>
									<MdOutlinePersonOutline className={`${s.fieldIcon} ${s.person}`} />
									<Field className={s.field} type="text" name="name" id="name" placeholder=" " autoComplete="off" />
									<span className={s.floatingLabel}>Name</span>
									<ErrorMessage className={s.floatingError} name="name" component="span" />
								</div>
							</label>
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
							<button className={s.btn} type="submit">Register</button>
						</Form>
					)}
				</Formik>
				<p className={s.addText}>Already have an account? <NavLink to="/login" className={s.link}>Login</NavLink></p>
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

export default RegistrationForm
