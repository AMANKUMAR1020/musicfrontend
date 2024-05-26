import { useEffect, useState } from "react";
import { client } from "../../api";
import { useParams, Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import ArtisteSong from "../../components/ArtisteSong";
import { useDispatch, useSelector } from "react-redux";
import { playTrack,setTrackList } from "../../redux/slices/playerSlice";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MusicPlayer } from "../../components/MusicPlayer";
import '../style/PlaylistId.css'

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

	const PlaylistById = async () => {
		setLoading(true);
		setError(false);
		await client
			.get(`/playlists/${id}`)
			.then((res) => {
				setData(res.data);
				setLoading(false);
                console.log(res.data);
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
		dispatch(setTrackList({ list: data?.playlistSongs }));
		dispatch(playTrack(data?.playlistSongs[0]));
	};

	const onSongPlay = (song) => {
		const index = data?.playlistSongs.findIndex((s) => s._id === song._id);

		dispatch(setTrackList({ list: data?.playlistSongs, index }));
		dispatch(playTrack(song));
	};

	if (loading) {
		return <>loading..</>;
	}

	if (error) {
		return (
        <>
        {errorMsg}
            <MdErrorOutline color="inherit" size={32} />
            <p>An error occured</p>
        </>
		);
	}

	return (
		<div className="playlist-container">
		<h2 className="playlist-title">{data?.playlist?.title}</h2>
		<p className="playlist-description">{data?.playlist?.description}</p>
		{data?.playlist?.isPrivate ? (
			<div className="playlist-privacy">private</div>
		) : (
			<div className="playlist-privacy">public</div>
		)}

		<h4 className="playlist-songs">{data?.playlistSongs?.length} Songs</h4>
		<button className="play-all-button" onClick={handlePlay}>
			Play All
		</button>

		<div className="playlist-songs-container">
			{data?.playlistSongs?.map((song) => (
			<div className="song">
				<ArtisteSong key={song?._id} song={song} handlePlay={onSongPlay} />
			</div>
			))}
		</div>
		{currentTrack && <MusicPlayer className="music-player" />}
		</div>
	);
};

export default PlaylistId;