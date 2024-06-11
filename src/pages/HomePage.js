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
		<>
		<div className="container main-container">
		<h1 className="headline1">Welcome to the Front Page</h1>
		<h1 className="headline2">HomePage</h1>
		<h4>The Project is on Progress.. </h4>
		<i> it will be finised within 4 to 5 days </i><br/>

		<h3>"<i> To start the application please Login or register </i>"<br/></h3>

		<button className="btn-type1" onClick={Login}>Login</button>
		<button className="btn-type1" onClick={Register}>Register</button>
		<button className="btn-type1" onClick={Logout}>Logout</button>
		</div>
		<Outlet/>
		</>
	);
};

export default HomePage;
