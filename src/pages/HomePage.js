// import HomeHero from "../components/HomeHero";
// import SmallSection from "../components/SmallSection";
// import TopCharts from "../components/TopCharts";
// import Categories from "../components/Categories";
// import Search from "../components/Search";
// import { Grid, GridItem, Hide } from "@chakra-ui/react";
// import Artistes from "../components/Artistes";
import { useNavigate,Outlet } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
//import '../App.css';
import '../pages/style/HomePage.css'

const HomePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const Login = () => {console.log('Login navigate');	navigate('/auth/login');}

	const Logout = () => {console.log('Logout done');  dispatch(logoutUser()); navigate('/');}

	const Register = () =>{console.log('Register done'); navigate('/auth/register');}

	return (
		<div className="container main-container">
		<h1>Welcome to the Front Page</h1>
		<h1>HomePage</h1>
		<button onClick={Login}>Login</button>
		<button onClick={Register}>Register</button>
		<button onClick={Logout}>Logout</button>
		<Outlet/>
		</div>
	);
};

export default HomePage;
