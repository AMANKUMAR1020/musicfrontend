import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { client } from "../api";
//import '../style/Profile.css'
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { resetPlayer,setCurrentTrack,setPlaying } from "../redux/slices/playerSlice";

import './style/HomePage.css'
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";
import useTitle from "./useTitle";

const ArtistesPage = () => {

	useTitle('Ppopular Atistes')

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

	const flush=()=>{dispatch(resetPlayer());}

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
							borderColor: "yellow",
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
							<p className="text" onClick={flush}>{artiste.name}</p>
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