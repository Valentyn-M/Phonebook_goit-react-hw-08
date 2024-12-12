// DocumentTitle дозволяє змінювати заголовок сторінки залежно від контенту або поточної логіки програми.
// DocumentTitle є обгорткою над компонентом Helmet із бібліотеки react-helmet-async.
// Helmet дозволяє зручно керувати мета-інформацією сторінки (наприклад, <title>, <meta> тощо).

import { Helmet } from "react-helmet-async"

const DocumentTitle = ({ children }) => {
	return (
		<Helmet>
			<title>{children}</title>
		</Helmet>
	)
}

export default DocumentTitle
