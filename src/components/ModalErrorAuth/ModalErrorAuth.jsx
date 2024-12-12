import { useDispatch, useSelector } from "react-redux";
import s from "./ModalErrorAuth.module.css"
import Modal from 'react-modal';
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidErrorAlt } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import { selectError } from "../../redux/auth/selectors";
import { clearError } from "../../redux/auth/slice";

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.65)',
		backdropFilter: 'blur(5px)',
		WebkitBackdropFilter: 'blur(10px)',
	},
	content: {
		padding: "0",
		borderRadius: '8px',
		border: "none",
		backgroundColor: '#252728',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const ModalErrorAuth = ({ message }) => {

	const error = useSelector(selectError);
	const dispatch = useDispatch();

	const handleClose = () => {
		// Скидаємо помилку в стані Auth
		dispatch(clearError());
	};

	useEffect(() => {
		document.body.classList.add("lock");
		return () => {
			document.body.classList.remove("lock");
		};
	}, []);

	return (
		<Modal
			isOpen={true}
			onRequestClose={handleClose}
			shouldCloseOnOverlayClick={true}
			shouldCloseOnEsc={true}
			style={customStyles}
		>
			<div className={s.modalWrap}>
				<h3 className={s.title}><BiSolidErrorAlt className={s.icon} /><span>Error</span></h3>
				<p className={s.errorText}>{error}</p>
				<p className={s.text}>{message}</p>
				<button className={s.btn} type="button" onClick={handleClose}><IoMdCheckmarkCircleOutline /><span>Ok</span></button>
				<button
					className={s.btnClose}
					type="button"
					onClick={handleClose}
				>
					<IoCloseOutline />
				</button>
			</div>
		</Modal>
	)
}

export default ModalErrorAuth
