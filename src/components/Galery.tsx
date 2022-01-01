/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { SRLWrapper } from "simple-react-lightbox";
function Galery(props: any) {
	const options = {
		settings: {
			autoplaySpeed: 1500,
			transitionSpeed: 900,
			hideControlsAfter: true,
		},
		buttons: {
			backgroundColor: "rgba(30,30,36,0.8)",
			iconColor: "rgba(255, 255, 255, 0.8)",
			iconPadding: "10px",
			showAutoplayButton: false,
			showCloseButton: true,
			showDownloadButton: false,
			showFullscreenButton: true,
			showNextButton: true,
			showPrevButton: true,
			showThumbnailsButton: false,
			size: "40px",
		},
		thumbnails: {
			showThumbnails: true,
			thumbnailsAlignment: "space-between",
			thumbnailsContainerBackgroundColor: "transparent",
			thumbnailsContainerPadding: "0",
			thumbnailsGap: "0 5px",
			thumbnailsIconColor: "#ffffff",
			thumbnailsOpacity: 0.4,
			thumbnailsPosition: "bottom",
			thumbnailsSize: ["100px", "80px"],
		},
	};

	return (
		<div id={props.open ? "Galery_open" : "Galery"}>
			<div className='images'>
				<SRLWrapper options={options}>
					{props.images.map((e: any) => {
						return (
							<a key={e.src} href={e.src}>
								<img src={e.src} />
							</a>
						);
					})}
				</SRLWrapper>
			</div>
		</div>
	);
}

export default Galery;
