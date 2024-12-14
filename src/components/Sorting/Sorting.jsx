import { useDispatch, useSelector } from 'react-redux';
import s from './Sorting.module.css'
import { MenuItem, Select, FormControl, OutlinedInput } from "@mui/material";
import { selectSorted } from '../../redux/sorting/selectors';
import { changeSorting } from '../../redux/sorting/slice';

const Sorting = () => {

	const dispatch = useDispatch();

	const handleChange = (event) => {
		dispatch(changeSorting(event.target.value));
	};

	const sorted = useSelector(selectSorted);

	return (
		<FormControl fullWidth>
			<Select
				className={s.select}
				value={sorted}
				onChange={handleChange}
				displayEmpty
				tabIndex={0}
				input={
					<OutlinedInput
						classes={{ notchedOutline: s.customNotchedOutline }}
					/>
				}
				classes={{
					icon: s.selectIcon, // Застосовуємо клас для стрілки
					select: s.selectInner,
				}}
				MenuProps={{
					classes: {
						paper: s.menu,
						list: s.menuList,
					},
				}}
			>
				<MenuItem
					value="alphabeticalAsc"
					className={s.menuItem}
					classes={{ selected: s.menuItemSelected }}
				>
					By Name (A-Z)
				</MenuItem>
				<MenuItem
					value="alphabeticalDesc"
					className={s.menuItem}
					classes={{ selected: s.menuItemSelected }}
				>
					By Name (Z-A)
				</MenuItem>
				<MenuItem
					value="dateAddedAsc"
					className={s.menuItem}
					classes={{ selected: s.menuItemSelected }}
				>
					By Date (Oldest First)
				</MenuItem>
				<MenuItem
					value="dateAddedDesc"
					className={s.menuItem}
					classes={{ selected: s.menuItemSelected }}
				>
					By Date (Newest First)
				</MenuItem>

			</Select>
		</FormControl>
	);
};

export default Sorting
