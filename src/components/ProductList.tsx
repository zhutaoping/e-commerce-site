import { Container, Row, Col, Card } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

import { ProductTypes } from "../types/myTypes";
import { useProductContext } from "../hooks/useProductContext";

type Props = {
	products: ProductTypes[];
};

const ProductList = ({ products }: Props) => {
	const navigate = useNavigate();

	const { localCart, dispatch } = useProductContext();

	const handleLocalCart = (product: ProductTypes) => {
		if (localCart && localCart.some((p) => p.id === product.id)) {
			dispatch({ type: "INCREASE", payload: { ...product, addedCount: 1 } });
		} else {
			dispatch({ type: "ADD", payload: { ...product, addedCount: 1 } });
		}
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
										role="button"
										title="Details"
										src={product.image}
										className="img-fluid pointer"
										alt="product item"
										onClick={() =>
											navigate(`/details/${product.id}`, {
												state: product,
											})
										}
									/>
									<Card.Title className="mt-4">{product.title}</Card.Title>
									<Card.Link
										className="small d-flex justify-content-end mb-5"
										as={Link}
										to={`/details/${product.id}`}
										state={product}
									>
										Details
									</Card.Link>

									<Card.Text className="d-flex justify-content-between align-items-baseline h3 fw-bold">
										<span className="fs-4 ">${product.price}</span>

										<BsCartPlus
											role="button"
											className="click-down-button pe-auto"
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
