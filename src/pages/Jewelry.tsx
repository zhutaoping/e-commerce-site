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
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Jewelry;
