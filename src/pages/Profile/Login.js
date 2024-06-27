import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { client } from "../../api/index";
import { loginUser,setUser } from "../../redux/slices/userSlice";
import { resetPlayer } from "../../redux/slices/playerSlice";
import ClipLoader from "react-spinners/ClipLoader";

import '../style/Register.css'
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";
import useTitle from "../useTitle";
//import { useNotificationCenter } from 'react-toastify/addons/use-notification-center';

const LoginPage = () => {

	useTitle('Login Page')

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const validateFields = () => {
		if (username === "" || password === "") {
			setError("All fields are required!");
			return false;

		} else {
			setError(null);
			return true;
		}
	};

	const handleLogin = async () => {
		if (validateFields()) {
			setLoading(true);
			await client
				.post("/users/login", {
					username,
					password,
				})
				.then((res) => {
					dispatch(resetPlayer());
					dispatch(loginUser(res.data));

					console.log(res.data)
					dispatch(setUser(res.data.user))

					navigate('/dash')
				})
				.catch((err) => {
					setError(err?.response?.data?.message);
				});
				setLoading(false);
		}
	};

	if(loading){
		return (<>
		<ClipLoader
        color='yellow'
        loading={loading}
		cssOverride={{
			display: "block",
			margin: "0 auto",
			borderColor: "yellow",
			}}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"/>
		</>)
	} 

	return (
	<>
	<MyNavbar/>
		<h1 className="headline1">Login</h1>
		
		<div className="Container">
			<div className="form-group">
				<h2 className="headline2">Username</h2>
				<input
				className="input"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}/>
			</div>
		<div className="form-group">
			<h2 className="headline2">Password</h2>
			<input
			className="input"
			type="password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			style={{position:'relative', right:'1px'}}/>
		</div>

			{error && <p className="error">{error}</p>}
			<button className="btn-type-back" onClick={()=>{navigate(-1)}}>Back</button>
			<button className="btn-type10" onClick={handleLogin}>Login</button>
		</div>
	<Outlet/>
	<Footer/>
	</>
	);
	
};

export default LoginPage;