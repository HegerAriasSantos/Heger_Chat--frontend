import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' {...props}>
			<path
				d='M14 31a6 6 0 01-6-6V9a8 8 0 0116 0v19a1 1 0 01-2 0V9a6 6 0 00-12 0v16a4 4 0 008 0V10a2 2 0 00-4 0v13a1 1 0 01-2 0V10a4 4 0 018 0v15a6 6 0 01-6 6z'
				data-name='Layer 43'
			/>
		</svg>
	);
}

export default SvgComponent;
