import s from './AdditionalFeatures.module.css'

import Sorting from "../Sorting/Sorting"
import ViewMode from '../ViewMode/ViewMode'

const AdditionalFeatures = () => {
	return (
		<div className={s.AdditionalFeatures}>
			<Sorting />
			<ViewMode />
		</div>
	)
}

export default AdditionalFeatures
