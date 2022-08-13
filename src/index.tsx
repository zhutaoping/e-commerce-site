import React from "react";
import ReactDOM from "react-dom/client";
import "./custom.scss";
import "./index.scss";
import App from "./App";
import { ProductContextProvider } from "./context/ProductContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	// <React.StrictMode>
	<ProductContextProvider>
		<App />
	</ProductContextProvider>
	// </React.StrictMode>
);
