import { useCollection } from "../hooks/useCollection";
import ProductList from "../products/ProductList";
import Newsletter from "../components/Newsletter";

const Home = () => {
	const { documents: products, error } = useCollection("products");

	return (
		<div>
			<h5 className="p-4 text-center">Collections</h5>
			{error && <p className="error">{error}</p>}
			{products && <ProductList products={products} />}
			<Newsletter />
		</div>
	);
};

export default Home;
