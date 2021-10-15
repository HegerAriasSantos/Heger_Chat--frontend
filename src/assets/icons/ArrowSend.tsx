function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={40} height={40} {...props}>
			<path d='M15.379 19.14l-3.271-6.54 7.359-7.359-4.088 13.9zM4.86 8.621l13.9-4.087-7.359 7.358-6.541-3.27zm-1.501-.6a.5.5 0 00-.083.927l7.852 3.925 3.925 7.851a.5.5 0 00.927-.083l5-17a.5.5 0 00-.621-.62l-17 5z' />
		</svg>
	);
}

export default SvgComponent;
