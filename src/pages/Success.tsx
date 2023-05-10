import { useEffect } from "react";

export default function Success() {
	useEffect(() => {
		// Clear the cart
		localStorage.setItem("state", JSON.stringify([]));
	}, []);

	return <h1>Thank you for your purchase!</h1>;
}
