import { useNavigate,Outlet } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { resetPlayer } from "../redux/slices/playerSlice";
import '../pages/style/HomePage.css'
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";
import useTitle from "./useTitle";

const HomePage = () => {

	useTitle('Muyi app')

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

	const Register = () =>{
		console.log('Register done');
		dispatch(resetPlayer());
		
		navigate('/auth/register');
	}

	return (
		<>
		<MyNavbar/>
			<div className="container">{/* main-container*/}
				<div className="inside-container">
					<h1 className="headline1">Welcome to the Front Page</h1>
					<p className="headline2">Create your own music</p>
					<p className="text">👉 Find the best tilented Artistes around the world</p>
					<p className="text">✨ Get Free created playlists</p>
					<p className="text">🚀 Explare New Song Player - Muyi</p>
				</div>
				<div className="inside-container">
					<button className="btn-type9" onClick={Login}>Login</button>
					<button className="btn-type9" onClick={Register}>Register</button>
					<button className="btn-type9" onClick={Logout}>Logout</button>
				</div>
			</div>
		<Outlet/>
		<Footer/>
		</>
	);
};

export default HomePage;















// import { useNavigate,Outlet } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";
// import { useDispatch } from "react-redux";
// import { resetPlayer } from "../redux/slices/playerSlice";
// import '../pages/style/HomePage.css'
// import Footer from "./Footer";
// import MyNavbar from "./MyNavbar";

// const HomePage = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();

// 	const Login = () => {
// 		console.log('Login navigate');
// 		dispatch(resetPlayer());
// 		navigate('/auth/login');
// 	}

// 	const Logout = () => {
// 		console.log('Logout done');
// 		dispatch(resetPlayer()); 
// 		dispatch(logoutUser());

// 		navigate('/');
// 	}

// 	const Register = () =>{console.log('Register done'); dispatch(resetPlayer()); navigate('/auth/register');}

// 	return (
// 		<>
// 		<MyNavbar/>
// 			<div className="container main-container">
// 			<h1 className="headline1">Welcome to the Front Page</h1>
// 			<h1 className="headline2">HomePage</h1>
// 			<button className="btn-type1" onClick={Login}>Login</button>
// 			<button className="btn-type1" onClick={Register}>Register</button>
// 			<button className="btn-type1" onClick={Logout}>Logout</button>
// 			</div>
// 		<Outlet/>
// 		<Footer/>
// 		</>
// 	);
// };

// export default HomePage;
