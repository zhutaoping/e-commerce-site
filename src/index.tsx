import React from "react";
import ReactDOM from "react-dom/client";
import "./custom.scss";
import "./index.scss";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
