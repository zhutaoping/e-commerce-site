import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Badge, Container } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";

import { useProductContext } from "../hooks/useProductContext";
import { useLogout } from "../hooks/useLogout";
import { useCollectionUser } from "../hooks/useCollectionUser";

import { auth } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

const NavbarBS = () => {
	const [expanded, setExpanded] = useState(false);

	const { logout } = useLogout();

	const { user } = useAuthContext();

	const { localCart, dispatch } = useProductContext();

	const userId = auth.currentUser ? auth.currentUser.uid : "";

	const { documents } = useCollectionUser("users", userId);

	useEffect(() => {
		if (documents) {
			dispatch({ type: "INIT", payload: documents });
		}
	}, [documents, dispatch]);

	const totalLocalCartCount = localCart.reduce(
		(prev, curr) => prev + curr.count!,
		0
	);

	return (
		<Navbar
			expand="lg"
			className="bg-light shadow-sm"
			variant="light"
			sticky="top"
			role="navigation"
			expanded={expanded}
		>
			<Container>
				<Navbar.Brand as={Link} to="/">
					<span className="display-6 me-lg-5">Mock</span>
				</Navbar.Brand>

				<Navbar.Toggle
					onClick={() => setExpanded(expanded ? false : true)}
					className="me-auto"
					aria-controls="responsive-navbar-nav"
				/>

				<Navbar.Collapse className="mb-2 mb-lg-0">
					<Nav className="gap-lg-3">
						<Nav.Link onClick={() => setExpanded(false)} as={Link} to="/men">
							<span className="fs-5">Men</span>
						</Nav.Link>
						<Nav.Link onClick={() => setExpanded(false)} as={Link} to="/women">
							<span className="fs-5">Women</span>
						</Nav.Link>
						<Nav.Link
							onClick={() => setExpanded(false)}
							as={Link}
							to="/jewelry"
						>
							<span className="fs-5">Jewelry</span>
						</Nav.Link>
						<Nav.Link
							onClick={() => setExpanded(false)}
							as={Link}
							to="/electronics"
						>
							<span className="fs-5">Electronics</span>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>

				{!user && (
					<Nav.Link
						onClick={() => setExpanded(false)}
						className="nav-login me-2 me-md-3"
						as={Link}
						to="/login"
					>
						<span className="fs-5">Login</span>
					</Nav.Link>
				)}

				{!user && (
					<Nav.Link
						onClick={() => setExpanded(false)}
						className="nav-login me-2 me-md-3"
						as={Link}
						to="/signup"
					>
						<span className="fs-5">Signup</span>
					</Nav.Link>
				)}

				{user && (
					<span className="d-none d-sm-flex fs-5 me-2 me-md-4">
						hi, {user.displayName}
					</span>
				)}

				{user && (
					
					<Nav.Link
						onClick={() => {
							setExpanded(false);
							logout();
						}}
						className="nav-login me-2 me-md-3"
						as={Link}
						to="/signup"
					>
						<span className="fs-5">Logout</span>
					</Nav.Link>
				)}

				<Nav.Link onClick={() => setExpanded(false)} as={Link} to="/cart">
					<div className="d-flex position-relative me-3">
						<BsCart4 size={24} />
						<Badge
							bg="danger"
							className="position-absolute top-0 start-100 translate-middle rounded-pill bg-danger"
						>
							{localCart ? totalLocalCartCount : 0}
							<span className="visually-hidden">shopping cart items</span>
						</Badge>
					</div>
				</Nav.Link>
			</Container>
		</Navbar>
	);
};

export { NavbarBS as default };
