/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import React from "react";
import ReactDOM from "react-dom";
import App from "./router/app";
import registerServiceWorker from "./serviceWorker";
import "./scss/index.scss";

const firebaseConfig = {
	apiKey: "AIzaSyCLtNDpvDvUrFo95Sjd62nQVivP1g7diiM",
	authDomain: "heger-chat.firebaseapp.com",
	projectId: "heger-chat",
	storageBucket: "heger-chat.appspot.com",
	messagingSenderId: "453785698077",
	appId: "1:453785698077:web:0ca2827adad68c8095ebf4",
	measurementId: "G-MXX7FMWMYT",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(
	app,
	"https://console.firebase.google.com/project/heger-chat/storage/heger-chat.appspot.com/files",
);

registerServiceWorker();
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);
