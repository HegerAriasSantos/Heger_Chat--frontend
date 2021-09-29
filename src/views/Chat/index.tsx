import ListOfMessages from "../../components/ListOfMessages";
import "../../assets/scss/Chat.scss";
import { ChatHeader } from "../../components/chatHeader";
import { useHistory } from "react-router";
import ListOfChats from "../../components/ListOfChats";
import { GetUser } from "../../utils/User";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { signOut } from "../../utils/User";

function Chat() {
	let history = useHistory();
	let user = GetUser();
	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_END_POINT}/user/auth`, user)
			.then(() => {
				alert(`Welcome ${user.name}`);
			})
			.catch((err: any) => {
				signOut();
				history.push("/");
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='Chat'>
			<div className='left'>
				<ListOfChats></ListOfChats>
			</div>
			<div className='right'>
				<ChatHeader Name={"general"}></ChatHeader>
				<ListOfMessages
					name={user.name}
					chatId={useParams()}
					userId={user._id}></ListOfMessages>
			</div>
		</div>
	);
}

export default Chat;
