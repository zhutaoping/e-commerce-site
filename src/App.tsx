import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Jewelry from "./pages/Jewelry";
import Electronics from "./pages/Electronics";

function App() {
	const { user } = useAuthContext();

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/details/:id" element={<Details />} />
					<Route path="/men" element={<Men />} />
					<Route path="/women" element={<Women />} />
					<Route path="/jewelry" element={<Jewelry />} />
					<Route path="/electronics" element={<Electronics />} />
					<Route path="/signup" element={user ? <Home /> : <Signup />} />
					<Route path="/login" element={user ? <Home /> : <Login />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
