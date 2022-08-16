import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";

const Women = () => {
	const { documents: products, error } = useCollection("products", [
		"category",
		"==",
		"women's clothing",
	]);

	return (
		<div>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Women;
