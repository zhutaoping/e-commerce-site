import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";

const Electronics = () => {
	const { documents: products, error } = useCollection("products", [
		"category",
		"==",
		"electronics",
	]);

	return (
		<div>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Electronics;
