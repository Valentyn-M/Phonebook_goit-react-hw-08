import { TiThListOutline } from 'react-icons/ti'
import s from './ViewMode.module.css'
import { TbLayoutGrid } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { changeViewMode } from '../../redux/viewMode/slice'

const ViewMode = () => {

	const dispatch = useDispatch();

	return (
		<div className={s.ViewMode}>
			<button
				type="button"
				aria-label="Switch to list view"
				className={s.btn}
				onClick={() => { dispatch(changeViewMode("list")) }}><TiThListOutline />
			</button>
			<button
				type="button"
				aria-label="Switch to tile view"
				className={`${s.btn} ${s.tile}`}
				onClick={() => { dispatch(changeViewMode("tile")) }}><TbLayoutGrid />
			</button>
		</div>
	)
}

export default ViewMode
