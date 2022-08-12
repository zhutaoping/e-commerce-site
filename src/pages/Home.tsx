import { useCollection } from "../hooks/useCollection";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { State } from "../components/ProductList";
import Newsletter from "../components/Newsletter";

const Home = () => {
	const [localCart, setLocalCart] = useState<State[]>([]);
	const { documents, error } = useCollection("products");

	const handleLocalCart = (product: State) => {
		if (localCart.some((wish) => wish.id === product.id)) {
			console.log("return");
			return;
		}
		setLocalCart((prev) => [...prev, product]);
	};

	useEffect(() => {
		const json = JSON.stringify(localCart);
		localStorage.setItem("wishList", json);
	}, [localCart]);

	return (
		<div>
			<h5 className="p-4 text-center">Collections</h5>
			{error && <p className="error">{error}</p>}
			{documents && (
				<ProductList products={documents} handleLocalCart={handleLocalCart} />
			)}
			<Newsletter />
		</div>
	);
};

export default Home;
