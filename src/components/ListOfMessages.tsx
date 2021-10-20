import axios from "axios";
import io from "../utils/socket.io";
import ArrowSend from "../assets/icons/ArrowSend";
import Attachement from "../assets/icons/Attachement";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { signOut } from "../utils/User";

function ListOfMessages(props: any) {
	const [response, setResponse] = useState([{}]);
	const [message, setMessage] = useState("");
	const [file, setFile] = useState();
	const [data, setData] = useState([]);
	const messageListContainer = useRef<HTMLDivElement>(null);
	const param: any = useParams();
	const history = useHistory();
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_END_POINT}/message?chatId=${param.id}`)
			.then(response => {
				setData(response.data.body);
			})
			.catch(() => {
				alert("Internal error please refresh the page");
			});

		io.emit("joinRoom", {
			name: props.user.name,
			room: param.id,
		});
		setResponse([{}]);
		axios
			.post(`${process.env.REACT_APP_END_POINT}/user/auth`, props.user)
			.catch((err: any) => {
				signOut();
				history.push("/");
			});
	}, [history, param.id, props.user]);
	useEffect(() => {
		io.once("sentMessage", (r: any) => {
			setResponse([...response, r]);
		});
		messageListContainer.current?.scrollTo({
			top: messageListContainer.current?.scrollHeight,
			behavior: "smooth",
		});
	}, [response, data]);
	const handlesubmit = () => {
		if (message === "") {
			alert("You can't sent a empty message");
		}
		const packageMessage = {
			chatId: param.id,
			userId: props.user._id,
			message: message,
			name: props.user.name,
			file: file,
			token: props.user.token,
		};
		axios
			.post(`${process.env.REACT_APP_END_POINT}/message`, packageMessage)
			.then(() => {
				setMessage("");
				messageListContainer.current?.scrollTo({
					top: messageListContainer.current?.scrollHeight,
					behavior: "smooth",
				});
			})
			.catch((err: any) => {
				alert("Just happened a error, please try again ");
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
			<div ref={messageListContainer} className='Chat__conversation'>
				<ul id='scroll'>
					{data.map((message: any) => {
						return (
							<li
								className={
									message.name === props.user.name
										? "message-cover_me"
										: "message-cover"
								}
								key={message._id}
								id={message._id}>
								<div className='message_user'>{message.name}</div>
								<p>{message.message}</p>
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
									message.name === props.user.name
										? "message-cover_me"
										: "message-cover"
								}
								key={message._id || i}
								id={message._id || i}>
								<div className='message_user'>{message.name}</div>
								<p>{message.message}</p>
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
