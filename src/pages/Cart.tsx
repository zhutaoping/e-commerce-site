import { useProductContext } from "../hooks/useProductContext";
import { Row, Col, Container } from "react-bootstrap";
import CartItem from "../components/CartItem";

import emptyCart from "../img/emptycart.jpg";

const Cart = () => {
	const { localCart } = useProductContext();
	console.log("localCart", localCart);

	return (
		<div>
			<Container>
				<h5 className="py-4 border-bottom mb-4">Cart</h5>
			</Container>
			<Row>
				<Col xs={12}>
					{localCart.length === 0 && (
						<Container>
							<h4>Your Cart is Empty</h4>
							<img className="img-fluid" src={emptyCart} alt="empty cart" />
						</Container>
					)}
					<CartItem items={localCart} />
				</Col>
				<Col>Right</Col>
			</Row>
			{/* {localCart && <ProductList products={localCart} />} */}
		</div>
	);
};

export default Cart;
