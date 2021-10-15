import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='prefix__bi prefix__bi-three-dots-vertical'
			{...props}>
			<path d='M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' />
		</svg>
	);
}

export default SvgComponent;
