import axios from "axios";
import { useState } from "react";
import SetUser from "../../utils/User";
import { useHistory } from "react-router";
import Input from "./../../components/input";
import "../../scss/Register.scss";
import { Link } from "react-router-dom";

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
				history.push("/chat/6162206c1a095e06dce1b1b7");
			})
			.catch(err => {
				alert("Already exist");
				history.push("/login");
			});
	};
	return (
		<div id='register'>
			<div className='card'>
				<h1>Register</h1>
				<form onSubmit={handlesubmit}>
					<Input
						placeholder='Username'
						value={user.name}
						type='text'
						name='name'
						onChange={handleChange}
					/>
					<Input
						placeholder='Password'
						value={user.password}
						type='password'
						name='password'
						onChange={handleChange}
					/>

					<button>enviar</button>
				</form>
				<div className='dont'>
					have you an account? <Link to='login'>Click here</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
