import { Suspense } from "react"
import AppBar from "./AppBar/AppBar"
import Footer from "./Footer/Footer"


const Layout = ({ children }) => {

	return (
		<>
			<header className='header'>
				<AppBar />
			</header>

			<main className='main'>
				{/* Suspense призупиняє відображення компонента до завершення завантаження */}
				<Suspense fallback={null}>{children}</Suspense>
			</main>

			<footer className='footer'>
				<Footer />
			</footer>
		</>
	)
}

export default Layout
