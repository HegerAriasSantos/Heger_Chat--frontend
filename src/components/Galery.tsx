/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
function Galery(this: any, props: any) {
	const [images, setImages] = useState<any>([]);
	const param: any = useParams();
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_END_POINT}/message?chatId=${param.id}&fileType=images`,
			)
			.then(r => {
				let arr: { original: String; lazyLoad: boolean }[] = [];
				r.data.body.forEach((element: any) => {
					arr.push({ original: element.file, lazyLoad: true });
				});
				setImages(arr);
				console.log(arr);
			});
	}, [param.id]);

	return (
		<div id={props.open ? "Galery_open" : "Galery"}>
			<div className='images'>
				{images.map((e: { original: string }) => {
					return <img loading='lazy' src={e.original} alt='Galery img' />;
				})}
			</div>
			<ImageGallery items={images}></ImageGallery>
			{/* _renderCustomControls */}
			{/* <a
				href=''
				className='image-gallery-custom-action'
				onClick={this._customAction.bind(this)}
			/> */}
		</div>
	);
}

export default Galery;
