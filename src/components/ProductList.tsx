import { Container, Row, Col, Card } from "react-bootstrap";
import { BsCurrencyDollar, BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import { useProductContext } from "../hooks/useProductContext";

export interface State {
	id: string;
	title?: string;
	price?: number;
	description?: string;
	category?: string;
	image?: string;
}

type Props = {
	products: State[];
};

const ProductList = ({ products }: Props) => {
	const navigate = useNavigate();

	const { localCart, dispatch } = useProductContext();

	const handleLocalCart = (product: State) => {
		console.log(product.id);
		if (localCart && localCart.some((p) => p.id === product.id)) {
			console.log("return");
			return;
		}
		dispatch!({ type: "ADD", payload: product });
		// const json = JSON.stringify(localCart);
		// localStorage.setItem("localCart", json);
	};

	return (
		<div>
			<Container className="mb-5">
				<Row>
					{products.map((product) => (
						<Col key={product.id} md={6} lg={4} xl={3}>
							<Card className="py-4 mb-4">
								<Card.Body>
									<img
										title="Details"
										src={product.image}
										className="img-fluid pointer"
										role="button"
										alt="product item"
										onClick={() => navigate("/details/:id")}
									/>
									<Card.Title className="mt-4">{product.title}</Card.Title>
									<Card.Link
										className="small d-flex justify-content-end mb-5"
										as={Link}
										to="/details/:id"
									>
										Details
									</Card.Link>

									<Card.Text className="d-flex justify-content-between align-items-center h4 fw-bold">
										<span className="d-flex align-items-center">
											<BsCurrencyDollar />
											<span className="fs-5">{product.price}</span>
										</span>

										<BsCartPlus
											role="button"
											className="pe-auto"
											onClick={() => handleLocalCart(product)}
										/>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};

export default ProductList;
