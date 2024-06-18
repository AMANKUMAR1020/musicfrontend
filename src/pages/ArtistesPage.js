import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { client } from "../api";
//import '../style/Profile.css'
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";

import './style/HomePage.css'
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

const ArtistesPage = () => {
	const [artistes, setArtistes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { user, token } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
  

	const fetchArtistes = async () => {
		setLoading(true);
		setError(false);
		try {
			const res = await client.get("users/allusers");
			setArtistes(res.data);
			setLoading(false);
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchArtistes();
	}, []);

	return (
		<>

		<MyNavbar/>

		<h1 className="headline1">Artistes</h1>
		<p className="headline2">Discover new artistes</p>
			{/* <MyNavbar/> */}
			{/* <h1 className="headline1">Artistes</h1>
			<p className="headline2">Discover new artistes</p> */}
			<div className="artistes-container">
				{loading && artistes.length < 1 && (
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
						data-testid="loader"
					/>
				)}

				{artistes.map((artiste) => (
					<div key={artiste.id}>
						<img src={artiste.image} alt={artiste.username} width="150px" height="150px" />
						<Link to={`${artiste.id}`}>
							<p>{artiste.name}</p>
						</Link>
					</div>
				))}

				{error && <div>Sorry, an error occurred</div>}
			</div>
			
		<Outlet/>
		<Footer/>
		</>
	);
};

export default ArtistesPage;
















// import React, { useEffect, useState } from "react";
// import { AiOutlineLoading } from "react-icons/ai";
// import { client } from "../api";
// //import '../style/Profile.css'
// import ClipLoader from "react-spinners/ClipLoader";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";

// import './style/HomePage.css'
// import MyNavbar from "./MyNavbar";

// const ArtistesPage = () => {
// 	const [artistes, setArtistes] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(false);
// 	const { user, token } = useSelector((state) => state.user);
// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	const dispatch = useDispatch();
  

// 	const fetchArtistes = async () => {
// 		setLoading(true);
// 		setError(false);
// 		try {
// 			const res = await client.get("users/allusers");
// 			setArtistes(res.data);
// 			setLoading(false);
// 		} catch (error) {
// 			setError(true);
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchArtistes();
// 	}, []);

// 	return (
// 		<>
// 		<h1 className="headline1">Artistes</h1>
// 		<p className="headline2">Discover new artistes</p>
// 			<MyNavbar/>
// 			{/* <h1 className="headline1">Artistes</h1>
// 			<p className="headline2">Discover new artistes</p> */}
// 			<div className="artistes-container">
// 				{loading && artistes.length < 1 && (
// 					<ClipLoader
// 						color='#64B1F0'
// 						loading={loading}
// 						cssOverride={{
// 							display: "block",
// 							margin: "0 auto",
// 							borderColor: "red",
// 						}}
// 						size={100}
// 						aria-label="Loading Spinner"
// 						data-testid="loader"
// 					/>
// 				)}

// 				{artistes.map((artiste) => (
// 					<div key={artiste.id}>
// 						<img src={artiste.image} alt={artiste.username} width="150px" height="150px" />
// 						<Link to={`${artiste.id}`}>
// 							<p>{artiste.name}</p>
// 						</Link>
// 					</div>
// 				))}

// 				{error && <div>Sorry, an error occurred</div>}
// 			</div>
// 		</>
// 	);
// };

// export default ArtistesPage;






















// import React, { useEffect, useState } from "react";
// import { AiOutlineLoading } from "react-icons/ai";
// import { client } from "../api";
// //import '../style/Profile.css'
// import ClipLoader from "react-spinners/ClipLoader";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";

// import './style/HomePage.css'

// const ArtistesPage = () => {
// 	const [artistes, setArtistes] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(false);
// 	const { user, token } = useSelector((state) => state.user);
// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	const dispatch = useDispatch();
  
// 	const Logout = () => {
// 	  console.log("Logout done");
// 	  dispatch(logoutUser());
// 	  navigate("/");
// 	};
  
// 	const GetArtistes = () => {
// 	  console.log("GetArtists page");
// 	  navigate("/artistes");
// 	};
  
// 	const GetProfile = () => {
// 	  console.log("GetProfile page");
// 	  navigate("/profile");
// 	};
  
// 	const GetPlaylist = () => {
// 	  console.log("GetPlaylist page");
// 	  navigate("/playlist");
// 	};
  
// 	let bg1 = "#007bff";
// 	let bg2 = "#007bff";
// 	let bg3 = "#007bff";
  
// 	if (location.pathname === "/artistes") {
// 	  bg1 = "#0056b3";
// 	  bg2 = "#007bff";
// 	}
  
// 	if (location.pathname === "/profile") {
// 	  bg2 = "#0056b3";
// 	  bg1 = "#007bff";
// 	}
  
// 	if (location.pathname === "/playlist") {
// 	  bg3 = "#0056b3";
// 	  bg1 = "#007bff";
// 	}

// 	const fetchArtistes = async () => {
// 		setLoading(true);
// 		setError(false);
// 		try {
// 			const res = await client.get("users/allusers");
// 			setArtistes(res.data);
// 			setLoading(false);
// 		} catch (error) {
// 			setError(true);
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchArtistes();
// 	}, []);

// 	return (
// 		<>
// 		<h1 className="headline1">Artistes</h1>
// 		<p className="headline2">Discover new artistes</p>
// 			<div className="navbar">
// 			<button className="btn-type2" onClick={Logout}>Logout</button>
			
// 			<button
// 				className="btn-type2"
// 				style={{ backgroundColor: bg1 }}
// 				onClick={GetArtistes}
// 			>
// 			GetArtistes
// 			</button>

// 			<button
// 				className="btn-type2"
// 				style={{ backgroundColor: bg2 }}
// 				onClick={GetPlaylist}
// 			>
// 			GetPlaylist
// 			</button>

// 			<button
// 				className="btn-type2"
// 				style={{ backgroundColor: bg3 }}
// 				onClick={GetProfile}
// 			>
// 			{token ? user.username : ""}

// 			</button>
// 		</div>
// 			{/* <h1 className="headline1">Artistes</h1>
// 			<p className="headline2">Discover new artistes</p> */}
// 			<div className="artistes-container">
// 				{loading && artistes.length < 1 && (
// 					<ClipLoader
// 						color='#64B1F0'
// 						loading={loading}
// 						cssOverride={{
// 							display: "block",
// 							margin: "0 auto",
// 							borderColor: "red",
// 						}}
// 						size={100}
// 						aria-label="Loading Spinner"
// 						data-testid="loader"
// 					/>
// 				)}

// 				{artistes.map((artiste) => (
// 					<div key={artiste.id}>
// 						<img src={artiste.image} alt={artiste.username} width="150px" height="150px" />
// 						<Link to={`${artiste.id}`}>
// 							<p>{artiste.name}</p>
// 						</Link>
// 					</div>
// 				))}

// 				{error && <div>Sorry, an error occurred</div>}
// 			</div>
// 		</>
// 	);
// };

// export default ArtistesPage;


















// import { useEffect, useState } from "react";
// import { AiOutlineLoading } from "react-icons/ai";
// //import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
// import { client } from "../api";
// import { Link } from "react-router-dom";
// import './style/ArtistesPage.css'

// const ArtistesPage = () => {
// 	const [artistes, setArtistes] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(false);

// 	const fetchArtistes = async () => {
// 		setLoading(true);
// 		setError(false);
// 		await client
// 			.get("users/allusers")
// 			.then((res) => {
// 				setArtistes(res.data);
// 				setLoading(false);
// 			})
// 			.catch(() => {
// 				setError(true);
// 				setLoading(false);
// 			});
// 	};

// 	useEffect(() => {
// 		fetchArtistes();
// 	}, []);

// 	return (
// 		<>
// 		<h1 className="title">Artistes</h1>
// 		<p className="description">Discover new artistes</p>
// 		<div className="artistes-container">
// 			{loading && artistes.length < 1 && (<AiOutlineLoading className="spin" size={36} />)}

// 				{artistes.map((artiste) => (
// 					<div key={artiste._id}>
// 						<img src={artiste.image} alt={artiste.username} width="150px" height="150px"/>
						
// 						<Link to={`${artiste._id}`}> <p>{artiste.name}</p> </Link>
// 					</div>

// 					//<Artiste key={artiste._id} artiste={artiste} />
// 				))}

// 			{error && (<div>Sorry, an error occured</div>)}
// 		</div>
// 		</>
// 	);
// };
// export default ArtistesPage;
