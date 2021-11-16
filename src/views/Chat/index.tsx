import ListOfMessages from "../../components/ListOfMessages";
import ListOfChats from "../../components/ListOfChats";
import { ChatHeader } from "../../components/chatHeader";
import { GetUser } from "../../utils/User";
import { useParams } from "react-router";
import { useState } from "react";
import "../../scss/Chat.scss";
import Galery from "../../components/Galery";

function Chat() {
	const user = GetUser();
	const [responsive, setResponsive] = useState(false);
	const [galeryOpen, setGaleryOpen] = useState(false);
	// const [openImage, setOpenImage] = useState(false);
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
			<div className={galeryOpen === true ? "right galeryOpen" : "right"}>
				<div>
					<ChatHeader
						setGaleryOpen={setGaleryOpen}
						galeryOpen={galeryOpen}
						handleClick={handleClick}></ChatHeader>
					<ListOfMessages chatId={useParams()} user={user}></ListOfMessages>
				</div>
				<Galery open={galeryOpen}></Galery>
			</div>
		</div>
	);
}

export default Chat;
