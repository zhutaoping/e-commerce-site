import { useProductContext } from "../hooks/useProductContext";
import ProductList from "../components/ProductList";

const Cart = () => {
	const { localCart } = useProductContext();

	return (
		<div>
			<h5 className="p-4 text-center">Cart</h5>
			{localCart && <ProductList products={localCart} />}
		</div>
	);
};

export default Cart;
