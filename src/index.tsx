import React from "react";
import ReactDOM from "react-dom";
import App from "./router/app";
import "./assets/scss/index.scss";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);
