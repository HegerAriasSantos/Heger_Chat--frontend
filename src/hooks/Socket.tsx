import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3080";

function Connection(Connection: string) {
	let response: any[] = [];
	const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
	socket.on(Connection, (data: any) => {
		response.push(data);
		console.log(response);
	});
	return response;
}

export default Connection;
