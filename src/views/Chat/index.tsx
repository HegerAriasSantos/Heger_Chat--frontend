import ListOfMessages from "../../components/ListOfMessages";
import ListOfChats from "../../components/ListOfChats";
import axios from "axios";
import { ChatHeader } from "../../components/chatHeader";
import { useHistory } from "react-router";
import { GetUser } from "../../utils/User";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { signOut } from "../../utils/User";
import "../../scss/Chat.scss";

function Chat() {
	let history = useHistory();
	let user = GetUser();
	const [responsive, setResponsive] = useState(false);

	const handleClick = () => {
		setResponsive(!responsive);
	};
	const handleClickChats = () => {
		setResponsive(false);
	};
	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_END_POINT}/user/auth`, user)
			.catch((err: any) => {
				signOut();
				history.push("/");
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='Chat'>
			<div className={responsive === true ? "left_responsive" : "left"}>
				<ListOfChats handleClick={handleClickChats} />
			</div>
			<div className='right'>
				<ChatHeader handleClick={handleClick} Name={"general"}></ChatHeader>
				<ListOfMessages
					name={user.name}
					chatId={useParams()}
					userId={user._id}></ListOfMessages>
			</div>
		</div>
	);
}

export default Chat;
