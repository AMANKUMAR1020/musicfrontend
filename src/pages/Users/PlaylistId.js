import { useEffect, useState } from "react";
import { client } from "../../api";
import { useParams, Link, Outlet } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import ArtisteSong from "../../components/ArtisteSong";
import { useDispatch, useSelector } from "react-redux";
import { resetPlayer, playTrack,setTrackList } from "../../redux/slices/playerSlice";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MusicPlayer } from "../../components/MusicPlayer";
//import '../style/PlaylistId.css'
import '../style/HomePage.css'
import { BsCollectionPlayFill } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";
import useTitle from "../useTitle";
import ClipLoader from "react-spinners/ClipLoader";
 
const PlaylistId = () => {


	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const { id } = useParams();

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { currentTrack } = useSelector((state) => state.player);
	const isUserPlaylist = user?.id === data?.userId;

	useTitle(`${user.username}'s playlist`)

	const PlaylistById = async () => {
		setLoading(true);
		setError(false);
		await client
			.get(`/playlists/${id}`)
			.then((res) => {
				setData(res.data);
				setLoading(false);
//                console.log(res.data);
			})
			.catch((e) => {
				setError(true);
				setLoading(false);
                setErrorMsg(e);
			});
	};

	useEffect(() => {
		PlaylistById();
	}, []);

	const handlePlay = () => {
		
		dispatch(resetPlayer());//dispatch(resetPlayer());

		dispatch(setTrackList({ list: data?.playlistSongs }));
		dispatch(playTrack(data?.playlistSongs[0]));
	};

	const onSongPlay = (song) => {

		//dispatch(resetPlayer());//dispatch(resetPlayer());

		const index = data?.playlistSongs.findIndex((s) => s._id === song._id);

		dispatch(setTrackList({ list: data?.playlistSongs, index }));
		dispatch(playTrack(song));
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

	if (error) {
		return (
        <>
        {errorMsg}
            <MdErrorOutline color="inherit" size={32} />
        </>
		);
	}

	return (
		<>
		<MyNavbar/>
			<h2 className="headline2">{data?.playlist?.title}</h2>
			<p style={{padding: '10px 0px 10px 0px',margin: '5px'}} className="text">{data?.playlist?.description}</p>
			
			{data?.playlist?.isPrivate ?
			(<div style={{padding: '10px 0px 10px 0px',margin: '5px'}} className="text">private</div>)
			:
			(<div style={{padding: '10px 0px 10px 0px',margin: '5px'}}className="text">public</div>)}

			{/* <MyNavbar/> */}

			<h4 style={{padding: '10px 0px 10px 0px',margin: '5px'}} className="text">{data?.playlistSongs?.length} Songs</h4>
			<button className="btn-type10" onClick={handlePlay}>Play All<BsCollectionPlayFill/></button>

			<div className="Container">
				{data?.playlistSongs?.map((song) => (
				<div className="songlist">
					<ArtisteSong key={song?._id} song={song} handlePlay={onSongPlay} />
				</div>
				))}
			</div>
			{currentTrack && <MusicPlayer className="music-player" />}

		<Outlet/>
		<Footer/>
		</>
	);
};

export default PlaylistId;
