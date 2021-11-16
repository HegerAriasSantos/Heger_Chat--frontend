import axios from "axios";
import ListOfMessages from "../../components/ListOfMessages";
import ListOfChats from "../../components/ListOfChats";
import { ChatHeader } from "../../components/chatHeader";
import { GetUser } from "../../utils/User";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../../scss/Chat.scss";
import Galery from "../../components/Galery";

function Chat() {
	const user = GetUser();
	const [responsive, setResponsive] = useState(false);
	const [galeryOpen, setGaleryOpen] = useState(false);
	// const [openImage, setOpenImage] = useState(false);
	const [images, setImages] = useState<any>([]);
	const param: any = useParams();
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_END_POINT}/message?chatId=${param.id}&fileType=images`,
			)
			.then(r => {
				let arr: any = [];
				r.data.body.forEach((element: any) => {
					arr.push({
						src: element.file,
					});
				});
				setImages(arr);
				console.log(arr);
			});
	}, [param.id]);

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
					<ListOfMessages
						images={images}
						chatId={useParams()}
						user={user}></ListOfMessages>
				</div>
				<Galery images={images} open={galeryOpen}></Galery>
			</div>
		</div>
	);
}

export default Chat;
