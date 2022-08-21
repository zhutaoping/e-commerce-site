import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	useLocation,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Jewelry from "./pages/Jewelry";
import Electronics from "./pages/Electronics";

import ScrollToTop from "./components/ScrollToTop";

import { useState, useEffect } from "react";

function App() {
	// const [show, setShow] = useState(false);

	// const location = useLocation();

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setShow(true);
	// 		console.log("Initial timeout!");
	// 	}, 1000);

	// 	return () => {
	// 		setShow(false);
	// 		clearTimeout(timer);
	// 	};
	// }, [location.pathname]);
	// console.log(show);

	const { user } = useAuthContext();

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={user ? <Home /> : <Login />} />
					<Route path="/signup" element={user ? <Home /> : <Signup />} />
					<Route path="/details/:id" element={<Details />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/men" element={<Men />} />
					<Route path="/women" element={<Women />} />
					<Route path="/jewelry" element={<Jewelry />} />
					<Route path="/electronics" element={<Electronics />} />
					<Route path="*" element={<Navigate replace to="/" />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
