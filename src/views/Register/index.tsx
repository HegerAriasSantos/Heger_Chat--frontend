import axios from "axios";
import { useState } from "react";
import SetUser from "../../utils/User";
import { useHistory } from "react-router";

function Register() {
	let history = useHistory();
	const [user, setUser] = useState({
		name: "",
		password: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser(prevState => ({
			...prevState,
			[name]: value,
		}));
	};
	const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios
			.post(`${process.env.REACT_APP_END_POINT}/user/register`, user)
			.then(response => {
				SetUser(response.data.body);
				history.push("/chat/1");
			})
			.catch(err => {
				alert("Already exist");
				history.push("/login");
			});
	};
	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handlesubmit}>
				<div className='name'>
					<label htmlFor='#name'>Nombre</label>
					<input
						value={user.name}
						type='text'
						name='name'
						onChange={handleChange}
					/>
				</div>
				<div className='password'>
					<label htmlFor='#password'>Password</label>
					<input
						value={user.password}
						type='text'
						name='password'
						onChange={handleChange}
					/>
				</div>
				<button>enviar</button>
			</form>
		</div>
	);
}

export default Register;
