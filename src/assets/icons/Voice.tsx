import * as React from "react";

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' {...props}>
			<defs>
				<style>{".prefix__cls-1"}</style>
			</defs>
			<g data-name='Layer 46' id='prefix__Layer_46'>
				<path
					className='prefix__cls-1'
					d='M16 27A10 10 0 016 17a1 1 0 012 0 8 8 0 0016 0 1 1 0 012 0 10 10 0 01-10 10z'
				/>
				<path
					className='prefix__cls-1'
					d='M16 31a1 1 0 01-1-1v-4a1 1 0 012 0v4a1 1 0 01-1 1zM16 23a6 6 0 01-6-6V7a6 6 0 0112 0v10a6 6 0 01-6 6zm0-20a4 4 0 00-4 4v10a4 4 0 008 0V7a4 4 0 00-4-4z'
				/>
			</g>
		</svg>
	);
}

export default SvgComponent;
