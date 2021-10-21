import turnOff from "../assets/icons/turnOff.svg";
import Plus from "../assets/icons/Plus.svg";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { signOut } from "./../utils/User";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

function ListOfChats(props: any) {
	const [chats, setChats] = useState([]);
	const history = useHistory();
	const MySwal = withReactContent(Swal);
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_END_POINT}/chat/`).then(data => {
			setChats(data.data.body);
		});
	}, [chats]);

	const handleSignOut = () => {
		MySwal.fire({
			title: "Are you sure?",
			text: "We'll miss you!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Agree",
		}).then(result => {
			if (result.isConfirmed) {
				signOut();
				history.push("/");
			}
		});
	};
	const handleCreateChat = () => {
		Swal.fire({
			title: "Create chat",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			inputPlaceholder: "Chat's name",
			showCancelButton: true,
			confirmButtonText: "Create",
			showLoaderOnConfirm: true,
			preConfirm: nombre => nombre,
			allowOutsideClick: () => !Swal.isLoading(),
			backdrop: true,
			returnInputValueOnDeny: true,
		}).then(result => {
			if (result.isConfirmed) {
				let chat = {
					name: result.value,
				};
				axios
					.post(`${process.env.REACT_APP_END_POINT}/chat/`, chat)
					.then(() => {
						Swal.fire("Saved!", "", "success");
					})
					.catch(err => {
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "The chat need a name",
						});
					});
			}
		});
	};

	return (
		<div className='chatList'>
			<div className='titulo'>
				<div onClick={handleSignOut} className='Chat__header--menu'>
					<img src={turnOff} alt='signOut' className='img'></img>
				</div>
				<h2>Chats</h2>
				<div onClick={handleCreateChat} className='plus'>
					<img src={Plus} alt='buttom for create a chat ' />
				</div>
			</div>
			<ul>
				{chats.map((elem: any) => {
					return (
						<li
							key={elem._id}
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
