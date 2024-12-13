import ContactForm from '../../components/ContactForm/ContactForm'
import ContactList from '../../components/ContactList/ContactList'
import DocumentTitle from '../../components/DocumentTitle'
import Loader2 from '../../components/Loader2/Loader2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import ModalError from '../../components/ModalError/ModalError';
import { selectContacts, selectError, selectLoading } from '../../redux/contacts/selectors';
import s from "./ContactsPage.module.css"


const ContactsPage = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		// Після монтування компоннета отримуємо дані з бекенда
		dispatch(fetchContacts());
	}, [dispatch]);

	const allContacts = useSelector(selectContacts).length;

	// Отримуємо зі стану Redux дані про стан error
	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectError);

	return (
		<div className={s.contactsPage}>
			<DocumentTitle>Contacts</DocumentTitle>
			<ContactForm />
			{allContacts > 1 && <SearchBox />}
			{/* TODO Sorting (by name, by date added), Compact and advanced mode */}
			{isLoading ? <Loader2 /> : <ContactList />}
			{error && <ModalError />}
		</div>
	)
}

export default ContactsPage
