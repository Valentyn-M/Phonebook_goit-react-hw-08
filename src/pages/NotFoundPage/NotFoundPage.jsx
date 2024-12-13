import DocumentTitle from '../../components/DocumentTitle'
import s from './NotFoundPage.module.css'

const NotFoundPage = () => {
	return (
		<div className={s.notFoundPage}>
			<DocumentTitle>Phonebook | Page is not found</DocumentTitle>
			<h1 className={s.title}>Ooops... Page is not found!</h1>
		</div>
	)
}

export default NotFoundPage
