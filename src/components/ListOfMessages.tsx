import * as Axios from "./../hooks/axios";
import axios from "axios";
import io from "../utils/socket.io";
import ArrowSend from "../assets/icons/ArrowSend";
import Attachement from "../assets/icons/Attachement";
import { useEffect, useState } from "react";
import { GetUser } from "./../utils/User";
import { useParams } from "react-router";

function ListOfMessages(props: any) {
	const [response, setResponse] = useState([{}]);
	const [message, setMessage] = useState("");
	const [file, setFile] = useState();
	let param: any = useParams();
	let data = Axios.Get(
		`${process.env.REACT_APP_END_POINT}/message?chatId=${param.id}`,
	);
	io.on("sentMessage", (r: any) => {
		setResponse([...response, r]);
	});
	useEffect(() => {
		io.emit("joinRoom", {
			name: GetUser().name,
			room: param.id,
		});
	}, [param.id]);
	const handlesubmit = () => {
		if (message === "") {
			alert("You can't sent a empty message");
		}
		const packageMessage = {
			chatId: param.id,
			userId: GetUser()._id,
			message: message,
			name: props.name,
			file: file,
			token: GetUser().token,
		};
		axios
			.post(`${process.env.REACT_APP_END_POINT}/message`, packageMessage)
			.then(() => {
				setMessage("");
			});
	};
	const onchange = (e: any) => {
		const Reader = new FileReader();
		Reader.readAsDataURL(e.target.files[0]);
		Reader.onload = (e: any) => {
			setFile(e.target.result);
		};
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
								key={message._id}
								id={message._id}>
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
				<div className='div'>
					<input
						onChange={onchange}
						id='inputFile'
						type='file'
						placeholder='Select a file'
					/>
					<label htmlFor='inputFile'>
						<Attachement />
					</label>
				</div>
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
				<div className='div' onClick={handlesubmit}>
					<ArrowSend />
				</div>
			</div>
		</div>
	);
}

export default ListOfMessages;
