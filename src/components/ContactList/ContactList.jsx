// Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector)
import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"

import { selectSuccessAdd, selectSuccessDelete, selectVisibleContacts } from "../../redux/contacts/selectors";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { clearSuccess } from "../../redux/contacts/slice";
import { selectViewMode } from "../../redux/viewMode/selectors";

const ContactList = () => {

	// Отримуємо значення Складового селектору - Відфільтровані контакти
	const sortedAndFilteredContacts = useSelector(selectVisibleContacts);

	const isSuccessAdd = useSelector(selectSuccessAdd);
	const isSuccessDelete = useSelector(selectSuccessDelete);
	const dispatch = useDispatch();
	const didMount = useRef(false); // Захист від подвійного виклику toast
	useEffect(() => {
		if (didMount.current) {
			if (isSuccessAdd) {
				toast.success("Contact successfully created");
				dispatch(clearSuccess("successAdd"));
			}
			if (isSuccessDelete) {
				toast.success("Contact successfully deleted");
				dispatch(clearSuccess("successDelete"));
			}
		} else {
			didMount.current = true;
		}
	}, [isSuccessAdd, isSuccessDelete, dispatch]);

	const viewMode = useSelector(selectViewMode) || "list";

	const getGridClass = () => {
		const length = sortedAndFilteredContacts.length;
		if (length === 1) return "oneItem";
		if (length === 2) return "twoItems";
		return "threeOrMore";
	};

	return (
		<>
			<ul className={`${s.list} ${viewMode === "tile" ? s.extendedMode : s.compactMode} ${s[getGridClass()]}`}>
				{sortedAndFilteredContacts.map((contact) => (
					<li className={s.item} key={contact.id}>
						<Contact contact={contact} />
					</li>
				))}
			</ul>
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

export default ContactList
