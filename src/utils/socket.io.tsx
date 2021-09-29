import io from "socket.io-client";

const socket = io(process.env.REACT_APP_END_POINT, {
	transports: ["websocket"],
});

export default socket;
