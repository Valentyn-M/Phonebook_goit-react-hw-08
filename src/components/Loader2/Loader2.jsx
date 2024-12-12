import { PropagateLoader } from "react-spinners"
import s from "./Loader2.module.css"

const Loader2 = () => {

	return (
		<div className={s.loader}>
			<PropagateLoader
				color="#078FFF"
				size={25}
				speedMultiplier="1.1"
				aria-label="Loading Spinner"
			/>
		</div>
	)
}

export default Loader2
