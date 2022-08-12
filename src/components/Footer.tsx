import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

// icons
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import {
	FaMapMarked,
	FaPhone,
	FaCcVisa,
	FaCcMastercard,
	FaCcPaypal,
} from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { SiAmericanexpress } from "react-icons/si";

const Footer = () => {
	return (
		<div className="bg-dark py-5 text-light">
			<Container fluid="xxl">
				<Row className="gy-5 justify-">
					<Col md={6} lg={4}>
						<h2 className="text-center text-md-start">Mock</h2>
						<p className="text-center text-md-start">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
							vitae quidem qui sint odit iure quia corporis distinctio
						</p>
						<div className="d-flex gap-3 justify-content-center justify-content-md-start">
							<Nav.Link href="http://facebook.com">
								<BsFacebook size={30} />
							</Nav.Link>
							<Nav.Link href="http://instagram.com">
								<RiInstagramFill size={30} />
							</Nav.Link>
							<Nav.Link href="http://twitter.com">
								<BsTwitter size={30} />
							</Nav.Link>
							<Nav.Link href="http://youtube.com">
								<BsYoutube size={30} />
							</Nav.Link>
						</div>
					</Col>

					<Col
						className="d-flex flex-column align-items-center gap-2"
						md={6}
						lg={4}
					>
						<div className="d-flex gap-5">
							<Nav.Link as={Link} to="/">
								<span className="fs-5">Home</span>
							</Nav.Link>
							<Nav.Link as={Link} to="/cart">
								<span className="fs-5">Cart</span>
							</Nav.Link>
						</div>
						<div className="d-flex gap-5">
							<Nav.Link as={Link} to="/">
								<span className="fs-5">Jewelry</span>
							</Nav.Link>
							<Nav.Link as={Link} to="/">
								<span className="fs-5">Electronics</span>
							</Nav.Link>
						</div>
						<Nav.Link as={Link} to="/">
							<span className="fs-5">Men's Clothing</span>
						</Nav.Link>
						<Nav.Link as={Link} to="/">
							<span className="fs-5">Women's Clothing</span>
						</Nav.Link>
					</Col>

					<Col
						md={6}
						lg={4}
						className="footer-contact ps-lg-5 d-flex flex-column align-items-center align-items-md-start"
					>
						<h4 className="mb-3">Contact</h4>
						<span className="d-flex gap-2 mb-2">
							<FaMapMarked size={20} />
							<p className="m-0">66 Wagon St. Tucson, AZ 85718</p>
						</span>
						<span className="d-flex gap-2 mb-2">
							<FaPhone size={20} />
							<p className="m-0">817-357-4407</p>
						</span>
						<span className="d-flex  gap-2 mb-3">
							<AiTwotoneMail size={20} />
							<p className="m-0">mockstore@gmail.com</p>
						</span>
						<span className="d-flex gap-4 align-items-center">
							<FaCcVisa size={35} />
							<FaCcMastercard size={35} />
							<FaCcPaypal size={35} />
							<SiAmericanexpress size={27} />
						</span>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;