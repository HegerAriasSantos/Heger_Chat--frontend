import "../scss/components/Input.scss";
function Input(props: any) {
	return (
		<div className='input'>
			<label htmlFor={props.name}>{props.name}</label>
			<input
				type='text'
				name={props.name}
				value={props.value}
				onChange={props.handleChange}
				id={props.name}
				className='Input'
				placeholder={props.placeholder}
				{...props}
			/>
		</div>
	);
}

export default Input;
