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
			<h4 className="p-4 text-center">Electronics</h4>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Electronics;
