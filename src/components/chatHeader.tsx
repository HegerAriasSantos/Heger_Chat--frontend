import img from "../assets/img/download.png";
import Menu from "../assets/icons/menu";
import ArrowBack from "../assets/icons/ArrowBack";
export const ChatHeader = (props: any) => {
	return (
		<div className='Chat__header'>
			<div className='title'>
				<div className='back'>
					<ArrowBack onClick={props.handleClick} />
				</div>
				<img className='title_img' src={img} alt="Group's img" />
				<div className='title_text'>{props.Name}</div>
			</div>
			<div className='Chat__header--menu'>
				<Menu className='img'></Menu>
			</div>
		</div>
	);
};
