import React from "react";
import ReactDOM from "react-dom/client";
import "./custom.scss";
import "./index.scss";
import App from "./App";

import { ProductContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";

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
