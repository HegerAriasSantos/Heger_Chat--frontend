/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import React from "react";
import ReactDOM from "react-dom";
import App from "./router/app";
import registerServiceWorker from "./serviceWorker";
import "./scss/index.scss";

const firebaseConfig = {
	apiKey: "AIzaSyA7FTym1bV1HNwzwj-QIql1JpLsEhIbwwU",
	authDomain: "heger-chat-13f28.firebaseapp.com",
	projectId: "heger-chat-13f28",
	storageBucket: "heger-chat-13f28.appspot.com",
	messagingSenderId: "55319696157",
	appId: "1:55319696157:web:d0da01ad9381c23c6bc7f4",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app, "gs://heger-chat-13f28.appspot.com/");

registerServiceWorker();
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);
