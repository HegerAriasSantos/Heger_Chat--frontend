import img from "../assets/img/download.png";
import Menu from "../assets/icons/menu";
import { useHistory } from "react-router";
import { signOut } from "./../utils/User";
export const ChatHeader = (props: any) => {
	let history = useHistory();
	return (
		<div className='Chat__header'>
			<div className='title'>
				<img className='title_img' src={img} alt="Group's img" />
				<div className='title_text'>{props.Name}</div>
			</div>
			<div
				onClick={(e: any) => {
					signOut();
					history.push("/");
				}}
				className='Chat__header--menu'>
				<Menu className='img'></Menu>
			</div>
		</div>
	);
};
