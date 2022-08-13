import { Nav, Navbar, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { useState } from "react";
import { useProductContext } from "../hooks/useProductContext";

const NavbarBS = () => {
	const [expanded, setExpanded] = useState(false);

	const { localCart } = useProductContext();

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

				<Nav.Link
					onClick={() => setExpanded(false)}
					className="nav-login"
					as={Link}
					to="/login"
				>
					<span className="fs-5">Login</span>
				</Nav.Link>
				<Nav.Link
					onClick={() => setExpanded(false)}
					className="nav-login"
					as={Link}
					to="/signup"
				>
					<span className="fs-5">Signup</span>
				</Nav.Link>
				<Nav.Link onClick={() => setExpanded(false)} as={Link} to="/cart">
					<div className="d-flex position-relative">
						<BsCart4 size={24} />
						<Badge
							bg="danger"
							className="position-absolute top-0 start-100 translate-middle rounded-pill bg-danger"
						>
							{localCart ? localCart.length : 0}
							<span className="visually-hidden">shopping cart items</span>
						</Badge>
					</div>
				</Nav.Link>
			</Container>
		</Navbar>
	);
};

export { NavbarBS as default };
