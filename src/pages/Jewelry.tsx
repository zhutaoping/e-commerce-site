import { useCollection } from "../hooks/useCollection";
import ProductList from "../products/ProductList";

const Jewelry = () => {
	const { documents: products, error } = useCollection("products", [
		"category",
		"==",
		"jewelry",
	]);

	return (
		<div>
			<h5 className="p-4 text-center">Jewelry</h5>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Jewelry;
