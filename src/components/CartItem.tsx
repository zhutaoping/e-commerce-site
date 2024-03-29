import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { ProductTypes } from "../types/myTypes";
import { useProduct } from "../products/ProductContext";

type Props = {
	items: ProductTypes[] | null;
};

const CartItem = ({ items }: Props) => {
	const { dispatch } = useProduct();

	const navigate = useNavigate();

	const handleIncrease = (item: ProductTypes) => {
		dispatch({
			type: "INCREASE",
			payload: { ...item, addedCount: 1 },
		});
	};

	const handleDecrease = (item: ProductTypes) => {
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
							<Col className="d-flex align-items-center mb-4" xs={4}>
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

							<Col
								xs={8}
								className="d-flex flex-column justify-content-around mb-4"
							>
								<Container className="pe-0 d-flex justify-content-between">
									<p className="title mb-0 me-3">
										{item.shortTitle ? item.shortTitle : item.title}
									</p>
									<span className="fs-6 fw-bold">${item.price}</span>
								</Container>
								<Container className="d-flex align-items-baseline justify-content-between pe-0">
									<span
										role="button"
										className="click-down-button text-warning fw-bold mb-0 ps-md-4 fs-4"
										onClick={() => handleDecrease(item)}
									>
										&minus;
									</span>
									<span className="mb-0 user-select-none fs-5">
										{item.count}
									</span>
									<span
										role="button"
										className="click-down-button text-warning fw-bold mb-0 fs-4"
										onClick={() => handleIncrease(item)}
									>
										&#43;
									</span>
									{/* <div className="d-flex gap-4"> */}
									{/* <div className="click-down-button d-flex align-items-center">
										<FaHeart size={20} color="gray" />
										<span className="ms-2">Save</span>
									</div> */}
									<div
										className="click-down-button d-flex align-items-center"
										onClick={() => handleDelete(item.id)}
									>
										<FaTrash size={15} color="gray" />
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
