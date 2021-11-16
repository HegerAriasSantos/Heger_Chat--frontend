import img from "../assets/img/download.png";
import Menu from "../assets/icons/menu";
import ArrowBack from "../assets/icons/ArrowBack";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
export const ChatHeader = (props: any) => {
	let param: any = useParams();
	const [chatName, setChatName] = useState("");
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_END_POINT}/chat?id=${param.id}`)
			.then((data: any) => {
				let chats = data.data.body;
				setChatName(chats.filter((elem: any) => elem._id === param.id)[0].name);
			});
	}, [param]);

	return (
		<div className='Chat__header'>
			<div className='title'>
				<div className='back'>
					<ArrowBack onClick={props.handleClick} />
				</div>
				<img className='title_img' src={img} alt="Group's img" />
				<div className='title_text'>{chatName}</div>
			</div>
			<div
				onClick={() => {
					props.setGaleryOpen(!props.galeryOpen);
				}}
				className='Chat__header--menu'>
				<Menu className='img'></Menu>
			</div>
		</div>
	);
};
