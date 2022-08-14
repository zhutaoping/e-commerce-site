import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { State } from "../components/ProductList";
import Newsletter from "../components/Newsletter";

const Home = () => {
	const { documents, error } = useCollection("products");

	return (
		
		<div>
			<h5 className="p-4 text-center">Collections</h5>
			{error && <p className="error">{error}</p>}
			{documents && <ProductList products={documents} />}
			<Newsletter />
		</div>
	);
};

export default Home;
