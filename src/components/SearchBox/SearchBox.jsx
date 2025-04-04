import { useDispatch, useSelector } from 'react-redux';
import s from './SearchBox.module.css';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { selectContacts, selectVisibleContacts } from '../../redux/contacts/selectors';
import { changeFilter } from '../../redux/filters/slice';
import { selectValueFilter } from '../../redux/filters/selectors';

const SearchBox = () => {

	// Отримуємо початкове значення зі стора
	const filterValue = useSelector(selectValueFilter);

	const dispatch = useDispatch();

	const allContacts = useSelector(selectContacts).length;
	const filteredContacts = useSelector(selectVisibleContacts).length;

	return (
		<div className={s.search}>
			<h3 className={s.title}>Search by name or number</h3>
			<label className={s.label}>
				<div className={s.fieldWrap}>
					<input
						className={s.field}
						type="text"
						value={filterValue}
						autoComplete="off"
						placeholder={`Search amoung ${allContacts} contacts`}
						onChange={(evt) => dispatch(changeFilter(evt.target.value))}
					/>
					<MdOutlinePersonSearch className={s.fieldIcon} />
					<span className={`${s.floatingLabel} ${filterValue ? s.isActive : ''}`}><span>{filteredContacts}</span> contact{filteredContacts === 1 ? "" : "s"} found</span>
				</div>
			</label>
		</div>
	)
}

export default SearchBox
