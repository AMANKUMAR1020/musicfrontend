import { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { client } from "../../api/index";
import { loginUser,setUser } from "../../redux/slices/userSlice";
import { resetPlayer } from "../../redux/slices/playerSlice";
import ClipLoader from "react-spinners/ClipLoader";
import '../style/HomePage.css'
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";

const LoginPage = () => {

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
			return true;}
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
					setLoading(false);

					navigate('/dash')
				})
				.catch((err) => {
					setError(err?.response?.data?.message);
					setLoading(false);
				});
		}
	};

	if(loading){
		return (<>
		<ClipLoader
        color='#64B1F0'
        loading={loading}
		cssOverride={{
			display: "block",
			margin: "0 auto",
			borderColor: "red",
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
			
			<h2 className="headline2">Username</h2>
			<input
			className="input"
			type="text"
			value={username}
			onChange={(e) => setUsername(e.target.value)}/>

			<h2 className="headline2">Password</h2>
			<input
			className="input"
			type="password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}/>

			{error && <p style={{ color: 'red' }}>{error}</p>}
			<button className="btn-type1" onClick={handleLogin}>Login</button>

		<Outlet/>
		<Footer/>
		</>
	);
	
};

export default LoginPage;
















// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { client } from "../../api/index";
// import { loginUser,setUser } from "../../redux/slices/userSlice";
// import { resetPlayer } from "../../redux/slices/playerSlice";
// import ClipLoader from "react-spinners/ClipLoader";


// const LoginPage = () => {

// 	const [error, setError] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();

// 	const validateFields = () => {
// 		if (username === "" || password === "") {
// 			setError("All fields are required!");
// 			return false;
// 		} else {
// 			setError(null);
// 			return true;
// 		}
// 	};

// 	const handleLogin = async () => {
// 		if (validateFields()) {
// 			setLoading(true);
// 			await client
// 				.post("/users/login", {
// 					username,
// 					password,
// 				})
// 				.then((res) => {
// 					dispatch(resetPlayer());
// 					dispatch(loginUser(res.data));

// 					console.log(res.data)
					
// 					dispatch(setUser(res.data.user))
// 					setLoading(false);

// 					navigate('/dash')

// 				})
// 				.catch((err) => {
// 					setError(err?.response?.data?.message);
// 					setLoading(false);
// 				});
// 		}
// 	};


	
// 	if(loading){
// 		return (<>
// 		<ClipLoader
//         color={color}
//         loading={loading}
//         cssOverride={override}
//         size={150}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       />
// 		</>)
// 	} 

// 	return (
// 		<>
// 			<h1 style={{ color: 'blue', textAlign: 'center' }}>Login</h1>
// 			<p style={{ fontWeight: 'bold' }}>Username</p>
// 			<input
// 				type="text"
// 				value={username}
// 				onChange={(e) => setUsername(e.target.value)}
// 				style={{ border: '1px solid gray', borderRadius: '5px', padding: '5px' }}
// 			/>
// 			<p style={{ fontWeight: 'bold' }}>Password</p>
// 			<input
// 				type="password"
// 				value={password}
// 				onChange={(e) => setPassword(e.target.value)}
// 				style={{ border: '1px solid gray', borderRadius: '5px', padding: '5px' }}
// 			/>
// 			{error && <p style={{ color: 'red' }}>{error}</p>}
// 			<button
// 				onClick={handleLogin}
// 				style={{
// 					backgroundColor: 'blue',
// 					color: 'white',
// 					border: 'none',
// 					borderRadius: '5px',
// 					padding: '10px',
// 					marginTop: '10px',
// 					cursor: 'pointer',
// 				}}
// 			>
// 				{loading ? <p>Loading...</p> : <p>Login</p>}
// 			</button>
// 		</>
// 	);
	
// };

// export default LoginPage;