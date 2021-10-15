import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Input from "./../../components/input";
import SetUser from "../../utils/User";
import "../../scss/Login.scss";
import { Link } from "react-router-dom";

function Login() {
	let History = useHistory();
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
			.post(`${process.env.REACT_APP_END_POINT}/user/login`, user)
			.then(response => {
				SetUser(response.data.body);
				History.push("/chat/1");
			})
			.catch(error => {
				alert("Username or Password incorrect");
			});
	};
	return (
		<div id='login'>
			<div className='card'>
				<h2>
					<span>Hello</span>, <br />
					Welcome Back
				</h2>
				<form onSubmit={handlesubmit}>
					<Input
						value={user.name}
						type='text'
						name='name'
						placeholder='Username'
						onChange={handleChange}
					/>
					<Input
						value={user.password}
						type='password'
						name='password'
						placeholder='Password'
						onChange={handleChange}
					/>
					<button>enviar</button>
				</form>
				<div className='dont'>
					Don't have an account? <Link to='register'> Click Here</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
