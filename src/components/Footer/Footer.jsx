import s from "./Footer.module.css"

const Footer = () => {

	const currentYear = new Date().getFullYear();

	return (
		<div className={s.copyright}>Phonebook | Built with React | {currentYear}</div>
	)
}

export default Footer
