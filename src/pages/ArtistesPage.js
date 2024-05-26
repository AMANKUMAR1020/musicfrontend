import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
//import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { client } from "../api";
import { Link } from "react-router-dom";
import './style/ArtistesPage.css'

const ArtistesPage = () => {
	const [artistes, setArtistes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchArtistes = async () => {
		setLoading(true);
		setError(false);
		await client
			.get("users/allusers")
			.then((res) => {
				setArtistes(res.data);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchArtistes();
	}, []);

	return (
		<>
		<h1 className="title">Artistes</h1>
		<p className="description">Discover new artistes</p>
		<div className="artistes-container">
			{loading && artistes.length < 1 && (<AiOutlineLoading className="spin" size={36} />)}

				{artistes.map((artiste) => (
					<div key={artiste._id}>
						<img src={artiste.image} alt={artiste.username} width="150px" height="150px"/>
						
						<Link to={`${artiste._id}`}> <p>{artiste.name}</p> </Link>
					</div>

					//<Artiste key={artiste._id} artiste={artiste} />
				))}

			{error && (<div>Sorry, an error occured</div>)}
		</div>
		</>
	);
};
export default ArtistesPage;
