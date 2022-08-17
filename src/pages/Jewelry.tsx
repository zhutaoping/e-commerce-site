import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";

const Jewelry = () => {
	const { documents: products, error } = useCollection("products", [
		"category",
		"==",
		"jewelry",
	]);

	return (
		<div>
			<h4 className="p-4 text-center">Jewelry</h4>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Jewelry;
