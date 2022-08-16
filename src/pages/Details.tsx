import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { State } from "../components/ProductList";
import { useEffect, useState } from "react";
import { useProductContext } from "../hooks/useProductContext";

import { BsCartPlus } from "react-icons/bs";

const Details = () => {
	const [quasiCount, setQuasiCount] = useState(0);

	const location = useLocation();
	const state = location.state as State;

	const { localCart, dispatch } = useProductContext();

	const handleIncrease = () => {
		setQuasiCount((prev) => prev + 1);
	};

	const handleDecrease = () => {
		if (quasiCount === 0) return;
		setQuasiCount((prev) => prev - 1);
	};

	const handleAddToCart = () => {
		if (quasiCount === 0) return;

		if (!localCart.some((lo) => lo.id === state.id)) {
			console.log("not in cart yet");
			dispatch({
				type: "ADD",
				payload: {
					...state,
					addedCount: quasiCount,
				},
			});
		} else {
			dispatch({
				type: "INCREASE",
				payload: { ...state, addedCount: quasiCount },
			});
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<Container className="my-5">
				<Row className="gap-5 p-sm-0">
					<Col className="me-5 my-auto" sm={12} xl={6}>
						<img
							className="img-fluid align-items-center text-center"
							src={state.image}
							alt="product details"
						/>
					</Col>

					<Col className="px-4">
						<h1 className="mt-xl-5 bold">
							<strong>{state.title}</strong>
						</h1>
						<p className="lead my-4 mb-xl-5 mt-xl-5 text-muted">
							{state.description}
						</p>

						<h1 className="fw-bold mb-4 mb-xl-5">${state.price}</h1>

						<div className="d-md-flex gap-5">
							<Container className="d-flex align-items-center justify-content-between">
								<h1
									role="button"
									className="click-down-button text-warning fw-bold mb-0"
									onClick={handleDecrease}
								>
									&minus;
								</h1>
								<h4 className="mb-0 user-select-none">{quasiCount}</h4>
								<h1
									className="click-down-button text-warning fw-bold mb-0"
									onClick={handleIncrease}
								>
									&#43;
								</h1>
							</Container>
							<Button
								className="click-down-button d-flex justify-content-center align-items-center my-3 w-100 shadow"
								variant="warning"
								size="lg"
								onClick={handleAddToCart}
							>
								<BsCartPlus className="me-3" />
								<span>Add to cart</span>
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Details;
