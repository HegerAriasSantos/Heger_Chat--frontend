import { Link } from "react-router-dom";
import { useEffect } from "react";
import { GetUser } from "../../utils/User";
import { useHistory } from "react-router";
import "../../scss/Home.scss";

function App() {
	let history = useHistory();
	useEffect(() => {
		if (GetUser()) {
			history.push("/chat/6162206c1a095e06dce1b1b7");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div id='home'>
			<div id='Card'>
				<h2>
					<span>
						Hello, <br />
					</span>
					Welcome to this app
				</h2>
				<div className='description'>
					You are not registered yet, if you want to register use one of the
					following options
				</div>
				<div className='links'>
					<Link to='/register'>Register</Link>
					<Link to='/login'>Login</Link>
				</div>
			</div>
		</div>
	);
}

export default App;
