import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";

const Men = () => {
	const { documents: products, error } = useCollection("products", [
		"category",
		"==",
		"men's clothing",
	]);

	return (
		<div>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Men;
