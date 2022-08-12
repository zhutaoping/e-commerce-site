import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

export const useProductContext = () => {
	const context = useContext(ProductContext);

	if (!context) {
		throw Error("useAuthContext must be used inside an AuthContextProvider");
	}

	return context;
};
