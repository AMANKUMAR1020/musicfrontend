import { useNavigate,Outlet } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { resetPlayer } from "../redux/slices/playerSlice";
import '../pages/style/HomePage.css'
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";

const HomePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const Login = () => {
		console.log('Login navigate');
		dispatch(resetPlayer());
		navigate('/auth/login');
	}

	const Logout = () => {
		console.log('Logout done');
		dispatch(resetPlayer()); 
		dispatch(logoutUser());

		navigate('/');
	}

	const Register = () =>{console.log('Register done'); dispatch(resetPlayer()); navigate('/auth/register');}

	return (
		<>
		<MyNavbar/>
			<div className="container main-container">
			<h1 className="headline1">Welcome to the Front Page</h1>
			<h1 className="headline2">HomePage</h1>
			<button className="btn-type1" onClick={Login}>Login</button>
			<button className="btn-type1" onClick={Register}>Register</button>
			<button className="btn-type1" onClick={Logout}>Logout</button>
			</div>
		<Outlet/>
		<Footer/>
		</>
	);
};

export default HomePage;
