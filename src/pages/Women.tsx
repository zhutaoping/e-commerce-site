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
			<h4 className="p-4 text-center">Women's Clothing</h4>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
		</div>
	);
};

export default Women;
