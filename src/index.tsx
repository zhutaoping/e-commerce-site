import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { ProductContextProvider } from "./products/ProductContext";
import { AuthContextProvider } from "./auth/AuthContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<ProductContextProvider>
				<App />
			</ProductContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
