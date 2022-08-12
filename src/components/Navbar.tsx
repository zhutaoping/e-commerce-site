import { Nav, Navbar, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

const NavbarBS = () => {
	return (
		<div>
			<Navbar className="shadow-sm" bg="light" variant="light" sticky="top">
				<div className="container">
					<Navbar.Brand as={Link} to="/">
						Navbar
					</Navbar.Brand>

					<Nav>
						<Nav.Link as={Link} to="/login">
							Login
						</Nav.Link>
						<Nav.Link as={Link} to="/signup">
							Signup
						</Nav.Link>
						<Nav.Link as={Link} to="/cart">
							<div className="d-flex position-relative">
								<BsCart4 size={24} />
								<Badge
									bg="danger"
									className="position-absolute top-0 start-100 translate-middle rounded-pill bg-danger"
								>
									9<span className="visually-hidden">shopping cart items</span>
								</Badge>
							</div>
						</Nav.Link>
					</Nav>
				</div>
			</Navbar>
		</div>
	);
};

export { NavbarBS as default };
