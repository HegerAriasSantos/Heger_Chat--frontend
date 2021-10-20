import ListOfMessages from "../../components/ListOfMessages";
import ListOfChats from "../../components/ListOfChats";
import { ChatHeader } from "../../components/chatHeader";
import { GetUser } from "../../utils/User";
import { useParams } from "react-router";
import { useState } from "react";
import "../../scss/Chat.scss";

function Chat() {
	const user = GetUser();
	const [responsive, setResponsive] = useState(false);
	const handleClick = () => {
		setResponsive(!responsive);
	};
	const handleClickChats = () => {
		setResponsive(false);
	};

	return (
		<div className='Chat'>
			<div className={responsive === true ? "left_responsive" : "left"}>
				<ListOfChats handleClick={handleClickChats} />
			</div>
			<div className='right'>
				<ChatHeader handleClick={handleClick}></ChatHeader>
				<ListOfMessages chatId={useParams()} user={user}></ListOfMessages>
			</div>
		</div>
	);
}

export default Chat;
