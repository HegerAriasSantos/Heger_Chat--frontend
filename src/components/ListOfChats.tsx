import turnOff from "../assets/icons/turnOff.svg";
import Plus from "../assets/icons/Plus.svg";
import axios from "axios";
import { signOut } from "./../utils/User";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

function ListOfChats(props: any) {
	const [chats, setChats] = useState([]);
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_END_POINT}/chat/`).then(data => {
			setChats(data.data.body);
		});
	}, []);

	let history = useHistory();

	return (
		<div className='chatList'>
			<div className='titulo'>
				<div
					onClick={() => {
						signOut();
						history.push("/");
					}}
					className='Chat__header--menu'>
					<img src={turnOff} alt='signOut' className='img'></img>
				</div>
				<h2>Lista de chats</h2>
				<div className='plus'>
					<img src={Plus} alt='buttom for create a chat ' />
				</div>
			</div>
			<ul>
				{chats.map((elem: any) => {
					return (
						<li
							onClick={() => {
								props.handleClick();
								history.push(`${elem._id}`);
							}}>
							{elem.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ListOfChats;
