import {
	Row,
	Col,
	Container,
	ToggleButtonGroup,
	ToggleButton,
	Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "../components/CartItem";

import emptyCart from "../assets/images/empty-cart.jpg";
import { useProduct } from "../products/ProductContext";

const URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:4000/checkout"
		: "https://e-comm-stripe-api.onrender.com/checkout";

const Cart = () => {
	const [subtotal, setSubtotal] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [deliveryFee, setDeliveryFee] = useState(0);
	const [tax, setTax] = useState(0);
	const [total, setTotal] = useState(0);
	const [disabledBtn, setDisabledBtn] = useState(false);

	const { state } = useProduct();

	const navigate = useNavigate();

	const handleChange = (value: React.SetStateAction<number>) =>
		setDeliveryFee(value);

	useEffect(() => {
		const sum = state.reduce(
			(prev, curr) => prev + curr.price! * curr.count!,
			0
		);
		setSubtotal(+sum.toFixed(2));
	}, [state]);

	useEffect(() => {
		setTax(Number((subtotal * 0.172).toFixed(2)));
		setDiscount(subtotal * 0.2);
	}, [subtotal]);

	useEffect(() => {
		setTotal(+(subtotal - discount + tax + deliveryFee).toFixed(2));
	}, [tax, discount, subtotal, deliveryFee]);

	async function checkout() {
		setDisabledBtn(true);

		await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				items: state,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.url) {
					window.location.assign(data.url);
				}
			});
	}

	return (
		<div>
			<Container>
				<h5 className="py-4 border-bottom mb-4">Cart</h5>
			</Container>
			<Container>
				<Row>
					<Col xs={12} lg={8} className="mb-lg-5">
						{state.length === 0 && (
							<Container className="d-flex flex-column align-items-center ">
								<h6>Your Cart is Empty</h6>
								<img
									className="img-fluid text-center"
									src={emptyCart}
									width="60%"
									alt="empty cart"
								/>
							</Container>
						)}
						<CartItem items={state} />
					</Col>

					<Col>
						<div className="px-3 pt-3 mb-5 ms-xl-5">
							<Container>
								<h5 className="fw-light mb-3">Delivery</h5>
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
										size="sm"
										variant="outline-secondary"
									>
										Free
									</ToggleButton>
									<ToggleButton
										id="tbg-btn-2"
										value={9.99}
										size="sm"
										variant="outline-secondary"
									>
										Express: $9.99
									</ToggleButton>
								</ToggleButtonGroup>
								<p className="fs-6 text-muted pb-4 dashed-border">
									Delivery date:{" "}
									{new Date(new Date().setDate(new Date().getDate() + 7))
										.toISOString()
										.substring(0, 10)}
								</p>
								<div className="d-flex justify-content-between">
									<h5 className="fw-light mb-3">Subtotal</h5>
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
									<h5 className="mb-3">Total</h5>
									<h5 className="">${total}</h5>
								</div>
							</Container>

							<Container fluid className="d-flex flex-column gap-2">
								<Button
									className={`checkout-btn mx-sm-5 mx-lg-0 click-down-button shadow-sm `}
									size="sm"
									type="button"
									variant="primary"
									onClick={checkout}
									disabled={disabledBtn}
								>
									Proceed to checkout
								</Button>
								<Button
									className="mx-sm-5 mx-lg-0 click-down-button shadow-sm"
									size="sm"
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
