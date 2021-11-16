import axios from "axios";
import io from "../utils/socket.io";
import ArrowSend from "../assets/icons/ArrowSend";
import Attachement from "../assets/icons/Attachement";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { signOut } from "../utils/User";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../index";

function ListOfMessages(props: any) {
	const [response, setResponse] = useState([{}]);
	const [message, setMessage] = useState("");
	const [data, setData] = useState([]);
	const [files, setFiles] = useState<any>([]);
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
		messageListContainer.current?.scrollTo({
			top: messageListContainer.current?.scrollHeight + 10000000,
			behavior: "smooth",
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
			if (typeof r.message !== "string") {
				setResponse([...response, r]);
				return;
			}
			if (r.message.includes(props.user.name)) {
				return;
			}
			setResponse([...response, r]);
		});
		messageListContainer.current?.scrollTo({
			top: messageListContainer.current?.scrollHeight + 10000000,
			behavior: "smooth",
		});
	}, [response, data, props.user.name]);

	const handlesubmit = async () => {
		if (files) {
			files.forEach(async (e: any) => {
				const packageMessage = {
					chatId: param.id,
					userId: props.user._id,
					file: "",
					fileType: "",
					fileName: "",
					name: props.user.name,
					token: props.user.token,
				};
				const storageRef = ref(storage, e?.name);
				const isFile = e ? e : null;
				if (isFile !== null) {
					await uploadBytes(storageRef, isFile).then(snapshot => {
						console.log("Uploaded a blob or file!");
						console.log(snapshot);
						let type = snapshot.metadata.contentType;
						let newfileType = type?.substring(0, type.indexOf("/"));
						if (newfileType !== ("image" || "audio" || "video")) {
							newfileType = "otros";
						}
						console.log(newfileType);
						packageMessage.fileType = newfileType;
					});
					await getDownloadURL(storageRef)
						.then(url => {
							console.log("modificado");
							packageMessage.file = url;
							axios
								.post(
									`${process.env.REACT_APP_END_POINT}/message`,
									packageMessage,
								)
								.then(() => {
									setMessage("");
									messageListContainer.current?.scrollTo({
										top: messageListContainer.current?.scrollHeight + 10000000,
										behavior: "smooth",
									});
								})
								.catch((err: any) => {
									alert("Just happened a error, please try again ");
								});
						})
						.catch(error => {
							console.log(error);
						});
				}
			});
		}
		if (message) {
			const packageMessage = {
				chatId: param.id,
				userId: props.user._id,
				message: message,
				file: "",
				fileType: "",
				fileName: "name",
				name: props.user.name,
				token: props.user.token,
			};
			axios
				.post(`${process.env.REACT_APP_END_POINT}/message`, packageMessage)
				.then(() => {
					setMessage("");
					messageListContainer.current?.scrollTo({
						top: messageListContainer.current?.scrollHeight + 10000000,
						behavior: "smooth",
					});
				})
				.catch((err: any) => {
					alert("Just happened a error, please try again ");
				});
		}
		setFiles([]);
	};
	const onchange = (e: any) => {
		let arr = [];
		for (let i = 0; i < e.target.files.length; i++) {
			arr.push(e.target.files[i]);
		}

		setFiles(arr);
	};

	setTimeout(() => {
		messageListContainer.current?.scrollTo({
			top: messageListContainer.current?.scrollHeight + 10000000,
			behavior: "smooth",
		});
	}, 2000);
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

								{message.fileType && (
									<div>
										<img
											loading='lazy'
											src={message.file}
											alt={`img sent by ${message.name}`}
										/>
									</div>
								)}
								<p>{message.message}</p>
							</li>
						);
					})}

					{response.map((message: any, i: number) => {
						if (!message.message && !message.file) {
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
								{message.file && (
									<div>
										<img
											loading='lazy'
											src={message.file}
											alt={`img sent by ${message.name}`}
										/>
									</div>
								)}
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
						accept='image/*'
						multiple
					/>
					<label htmlFor='inputFile'>
						{files.length > 0 && (
							<div>
								<span>{files.length}</span>
							</div>
						)}
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
