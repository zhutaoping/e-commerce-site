import { Container, Row, Col, Card } from "react-bootstrap";
import { BsCurrencyDollar, BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

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
	handleLocalCart: (product: State) => void;
};

const ProductList = ({ products, handleLocalCart }: Props) => {
	const navigate = useNavigate();

	return (
		<div>
			<Container>
				<Row>
					{products.map((product) => (
						<Col key={product.id} xs={12} md={6} lg={4} xl={3}>
							<Card className="py-4 mb-4">
								<Card.Body>
									<img
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
										to="/details"
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
