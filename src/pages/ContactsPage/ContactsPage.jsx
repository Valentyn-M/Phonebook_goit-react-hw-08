import ContactForm from '../../components/ContactForm/ContactForm'
import ContactList from '../../components/ContactList/ContactList'
import DocumentTitle from '../../components/DocumentTitle'
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations';
import SearchBox from '../../components/SearchBox/SearchBox';
import ModalError from '../../components/ModalError/ModalError';
import { selectContacts, selectError, selectLoading } from '../../redux/contacts/selectors';


const ContactsPage = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		// Після монтування компоннета отримуємо дані з бекенда
		dispatch(fetchContacts());
	}, [dispatch]);

	const allContacts = useSelector(selectContacts).length;

	// Отримуємо зі стану Redux дані про стан loading та error
	const isLoading = useSelector(selectLoading);
	const error = useSelector(selectError);

	return (
		<>
			<DocumentTitle>My Contacts</DocumentTitle>
			<ContactForm />
			{allContacts > 1 && <SearchBox />}
			<ContactList />

			{isLoading && <Loader />}
			{error && <ModalError />}
		</>
	)
}

export default ContactsPage
