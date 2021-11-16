import { BrowserRouter, Route, Switch } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loading from "../views/Loading";
const Home = lazy(() => import("../views/Home"));
const Register = lazy(() => import("../views/Register"));
const NotFound = lazy(() => import("../views/NotFound"));
const Chat = lazy(() => import("../views/Chat"));
const Login = lazy(() => import("../views/Login"));

const App = () => {
	useEffect(() => {
		window.scrollTo(0, 1);
	}, []);
	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Switch>
					<Route component={Home} exact path='/' />
					<Route component={Loading} exact path='/loading' />
					<Route component={Login} exact path='/login' />
					<Route component={Register} exact path='/register' />
					<Route component={Chat} exact path='/chat/:id' />
					<Route component={NotFound} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
