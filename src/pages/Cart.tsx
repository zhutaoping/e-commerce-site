import { useProductContext } from "../hooks/useProductContext";
import {
	Row,
	Col,
	Container,
	ToggleButtonGroup,
	ToggleButton,
	Button,
} from "react-bootstrap";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import emptyCart from "../img/emptycart.jpg";

const Cart = () => {
	const [subtotal, setSubtotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [deliveryFee, setDeliveryFee] = useState(0);
	const [tax, setTax] = useState(0);
	const [total, setTotal] = useState(0);

	const { localCart } = useProductContext();
	console.log("localCart", localCart);

	const navigate = useNavigate();

	const handleChange = (value: any) => setDeliveryFee(value);

	useEffect(() => {
		const sum = localCart.reduce(
			(prev, curr) => prev + curr.price! * curr.count!,
			0
		);
		setSubtotal(+sum.toFixed(2));
	}, [localCart]);

	useEffect(() => {
		setTax(Number((subtotal * 0.172).toFixed(2)));
		setDiscount(subtotal * 0.2);
	}, [subtotal]);

	useEffect(() => {
		setTotal(+(subtotal - discount + tax + deliveryFee).toFixed(2));
	}, [tax, discount, subtotal, deliveryFee]);

	return (
		<div>
			<Container>
				<h4 className="py-4 border-bottom mb-4">Cart</h4>
			</Container>
			<Container>
				<Row>
					<Col xs={12} lg={8}>
						{localCart.length === 0 && (
							<Container>
								<h4>Your Cart is Empty</h4>
								<img className="img-fluid" src={emptyCart} alt="empty cart" />
							</Container>
						)}
						<CartItem items={localCart} />
					</Col>

					<Col>
						<div className="px-3 pt-3 mb-5 ms-xl-5">
							<Container>
								<h4 className="fw-light mb-3">Delivery</h4>
								<ToggleButtonGroup
									className="mb-3 ms-1"
									type="radio"
									name="options"
									onChange={handleChange}
									defaultValue={0}
								>
									<ToggleButton
										id="tbg-btn-1"
										value={0}
										size="lg"
										variant="outline-secondary"
									>
										Free
									</ToggleButton>
									<ToggleButton
										id="tbg-btn-2"
										value={9.99}
										size="lg"
										variant="outline-secondary"
									>
										Express: $9.99
									</ToggleButton>
								</ToggleButtonGroup>
								<p className="text-muted pb-4 dashed-border">
									Delivery date:{" "}
									{new Date(new Date().setDate(new Date().getDate() + 7))
										.toISOString()
										.substring(0, 10)}
								</p>
								<div className="d-flex justify-content-between">
									<h4 className="fw-light mb-3">Subtotal</h4>
									<span className="fs-5">${subtotal}</span>
								</div>
								<div className="d-flex justify-content-between text-muted mb-1">
									<p className="p-0 mb-2">Discount</p>
									<span className="ms-auto me-3">(20%)</span>
									<span>
										{discount ? "- " : ""} ${(subtotal * 0.2).toFixed(2)}
									</span>
								</div>
								<div className="d-flex justify-content-between text-muted">
									<p className="p-0 mb-2">Delivery</p>
									<span>
										{deliveryFee ? "+ " : ""} ${deliveryFee}
									</span>
								</div>
								<div className="d-flex justify-content-between text-muted dashed-border mb-4">
									<p className="mb-4">Tax</p>
									<span>
										{subtotal ? "+ " : ""} ${tax}
									</span>
								</div>
								<div className="d-flex justify-content-between mb-4">
									<h4 className="mb-3">Total</h4>
									<h4 className="">${total}</h4>
								</div>
							</Container>
							<Container className="my-wrapper d-flex flex-column gap-2 mb-5">
								<Button
									className="click-down-button shadow-sm"
									size="lg"
									type="button"
									variant="primary"
								>
									Proceed to checkout
								</Button>
								<Button
									className="click-down-button shadow-sm"
									size="lg"
									type="button"
									variant="outline-secondary"
									onClick={() => navigate("/")}
								>
									Continue shopping
								</Button>
							</Container>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Cart;
