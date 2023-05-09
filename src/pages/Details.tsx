import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import { ProductTypes } from "../types/myTypes";
import { useProductContext } from "../context/ProductContext";

const Details = () => {
  const [quasiCount, setQuasiCount] = useState(1);

  const location = useLocation();
  const state = location.state as ProductTypes;

  const { localCart, dispatch } = useProductContext();

  const handleIncrease = () => {
    setQuasiCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quasiCount === 1) return;
    setQuasiCount((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!localCart.some((lo) => lo.id === state.id)) {
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
    setQuasiCount(1);
  };

  return (
    <div>
      <Container className="my-5">
        <Row className="gap-5 p-sm-0">
          <Col className="me-5 my-auto" sm={12} xl={6}>
            <img
              className="img-fluid d-flex mx-auto align-items-center text-center"
              src={state.image}
              alt="product details"
            />
          </Col>

          <Col className="px-4">
            <h5 className="mt-xl-5 bold">
              <strong>{state.title}</strong>
            </h5>
            <p className="lead my-4 mb-xl-5 mt-xl-5 text-muted fs-6">
              {state.description}
            </p>

            <p className="fw-bold mb-4 mb-xl-5 fs-6">${state.price}</p>

            <div className="d-md-flex gap-5">
              <Container className="d-flex align-items-center justify-content-between">
                <span
                  role="button"
                  className="click-down-button text-warning fw-bold mb-0 fs-4"
                  onClick={handleDecrease}
                >
                  &minus;
                </span>
                <span className="mb-0 user-select-none fs-5">{quasiCount}</span>
                <span
                  role="button"
                  className="click-down-button text-warning fw-bold mb-0 fs-4"
                  onClick={handleIncrease}
                >
                  &#43;
                </span>
              </Container>
              <Button
                className="click-down-button d-flex justify-content-center align-items-center my-3 w-100 shadow"
                variant="warning"
                size="sm"
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
