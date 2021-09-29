import * as Axios from "./../hooks/axios";
import axios from "axios";
import io from "../utils/socket.io";
import { useState } from "react";
import { GetUser, signOut } from "./../utils/User";
import { useHistory } from "react-router";

function ListOfMessages(props: any) {
	const [response, setResponse] = useState([{}]);
	const [message, setMessage] = useState("");
	let history = useHistory();
	let data = Axios.Get(
		`${process.env.REACT_APP_END_POINT}/message?chat=${props.Chat}`,
	);
	io.on("sentMessage", (r: any) => {
		setResponse([...response, r]);
	});
	const handlesubmit = () => {
		if (message === "") {
			alert("You can't sent a empty message");
		}
		const pakageMessage = {
			chatId: props.chatId.id,
			userId: props.userId,
			message: message,
			name: props.name,
			file: "",
			token: GetUser().token,
		};
		axios
			.post(`${process.env.REACT_APP_END_POINT}/message`, pakageMessage)
			.catch(err => {
				signOut();
				history.push("/");
			});
		setMessage("");
	};
	return (
		<div>
			<div className='Chat__conversation'>
				<ul>
					{data.map((message: any) => {
						return (
							<li
								className={
									message.name === props.name
										? "message-cover_me"
										: "message-cover"
								}
								key={message._id}>
								<div className='message_user'>{message.name}</div>
								{message.message}
							</li>
						);
					})}
					{response.map((message: any, i: number) => {
						if (!message.message) {
							return <span key={i}></span>;
						}
						return (
							<li
								className={
									message.name === props.name
										? "message-cover_me"
										: "message-cover"
								}
								key={message._id || i}>
								<div className='message_user'>{message.name}</div>
								{message.message}
							</li>
						);
					})}
				</ul>
			</div>
			<div className='Chat__input'>
				<input
					type='text'
					name='name'
					autoComplete='off'
					placeholder='Message'
					value={message}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setMessage(e.target.value);
					}}
					onKeyDown={(e: React.KeyboardEvent<any>) => {
						if (e.key === "Enter") {
							handlesubmit();
						}
					}}
				/>
			</div>
		</div>
	);
}

export default ListOfMessages;
