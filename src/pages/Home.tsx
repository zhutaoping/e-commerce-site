import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";
import Newsletter from "../components/Newsletter";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

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
