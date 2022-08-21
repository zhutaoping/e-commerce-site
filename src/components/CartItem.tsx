import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { FaTrash } from "react-icons/fa";

import { ProductTypes } from "../types/myTypes";
import { useProductContext } from "../hooks/useProductContext";

type Props = {
	items: ProductTypes[] | null;
};

const CartItem = ({ items }: Props) => {
	const { dispatch } = useProductContext();

	const navigate = useNavigate();

	const handleIncrease = (item: ProductTypes) => {
		// console.log("cartItem, handleIncrease");
		dispatch({
			type: "INCREASE",
			payload: { ...item, addedCount: 1 },
		});
	};

	const handleDecrease = (item: ProductTypes) => {
		// console.log("cartItem, handleDecrease");
		if (item.count! === 1) {
			handleDelete(item.id);
		}

		dispatch({
			type: "DECREASE",
			payload: { ...item, addedCount: 1 },
		});
	};

	const handleDelete = (id: string) => {
		dispatch({
			type: "DELETE",
			payload: id,
		});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			{items &&
				items.map((item) => (
					<Container key={item.id}>
						<Row className=" border-bottom mb-4">
							<Col className="mb-4" xs={4}>
								<img
									role="button"
									title="Details"
									className="img-fluid"
									src={item.image}
									alt="cart item"
									onClick={() =>
										navigate(`/details/${item.id}`, {
											state: item,
										})
									}
								/>
							</Col>

							<Col xs={8} className="d-flex flex-column justify-content-around">
								<Container className="pe-0  d-flex justify-content-between align-items-baseline">
									<h6 className="mb-0 me-3">
										{item.shortTitle ? item.shortTitle : item.title}
									</h6>
									<span className="fs-5 ">${item.price}</span>
								</Container>
								<Container className="d-flex align-items-baseline justify-content-between pe-0">
									<h1
										role="button"
										className="click-down-button text-warning fw-bold mb-0 ps-md-4"
										onClick={() => handleDecrease(item)}
									>
										&minus;
									</h1>
									<h4 className="mb-0 user-select-none">{item.count}</h4>
									<h1
										className="click-down-button text-warning fw-bold mb-0"
										onClick={() => handleIncrease(item)}
									>
										&#43;
									</h1>
									{/* <div className="d-flex gap-4"> */}
									{/* <div className="click-down-button d-flex align-items-center">
										<FaHeart size={20} color="gray" />
										<span className="ms-2">Save</span>
									</div> */}
									<div
										className="click-down-button d-flex align-items-center mb-4"
										onClick={() => handleDelete(item.id)}
									>
										<FaTrash size={20} color="gray" />
										<span className="ms-2">Delete</span>
									</div>
									{/* </div> */}
								</Container>
							</Col>
						</Row>
					</Container>
				))}
		</div>
	);
};

export default CartItem;
