import { resetPlayer, setTrackList, playTrack, setPlaying } from '../../redux/slices/playerSlice';
import { MusicPlayer } from "../../components/MusicPlayer";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArtisteSong from "../../components/ArtisteSong";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { client } from "../../api";
import SongList from "../SongList";
import '../style/ArtistePage.css'

export default function ArtistePage() {

    const { id } = useParams()
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user, token } = useSelector((state) => state.user);
    const { currentTrack, trackList, currentIndex } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("enter in ArtistePage");

    const getUserId = async () => {
        setLoading(true);
        setError(false);
        await client
            .get(`users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
        console.log("user.id", user.id);
    };

    useEffect(() => {
        if (token) {
            getUserId();
            dispatch(resetPlayer());
        }
        setPlaying(false);
    }, []);

  const onPlay = (song) => {
        let index = data.userCreateSongs?.findIndex((s) => s._id === song._id);
        if (index !== undefined && index !== null) {
			console.log(index, data.userCreateSongs)
            dispatch(setTrackList({ list: data.userCreateSongs, index }));
            dispatch(playTrack(song));
        }

		if(index === undefined && index === null){
			index = data.userFavoritesSongs?.findIndex((s) => s._id === song._id);
			if (index !== undefined && index !== null) {
				console.log(index, data.userFavoritesSongs)
				dispatch(setTrackList({ list: data.userFavoritesSongs, index }));
				dispatch(playTrack(song));
			}
		}

		if(index === undefined && index === null){
			index = data.userPlaylist?.findIndex((s) => s._id === song._id);
			if (index !== undefined && index !== null) {
				console.log(index, data.userPlaylist)
				dispatch(setTrackList({ list: data.userPlaylist, index }));
				dispatch(playTrack(song));
			}
		}
        
    };

    if(!token){
      return <>
          ArtistePage
      </>
    }

    return (
        <>
            <h1>ArtistePage</h1>
            {!loading && !error && !data && (<p>{"You haven't any songs yet..."}</p>)}

            <div>
                <h1 className='headTag'>User</h1>
                {/* <button onClick={()=>{navigate('/profile/edit')}}>	Profile Edit </button> */}

                <h2 className='paraTag'>{data?.user?.username}</h2>
                <h2 className='paraTag'>{data?.user?.name}</h2>
                <img src={data?.user?.image} alt={data?.user?.username} width="150px" height="150px"/>
            </div>

            <div>
                <h1>userCreateSongs</h1>
                {/* <button onClick={()=>{navigate('/profile/createsong')}}>Upload New</button> */}

                {loading && data?.userCreateSongs?.length < 1 && <p>You have not created any songs</p>}
                {error && (<p>Sorry, an error occurred</p>)}
                <div>
                    {data?.userCreateSongs?.map((song) => (
                        <ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
                    ))}
                </div>
            </div>

            <div>
                <h1>userFavoritesSongs</h1>
                {loading && data?.userFavoritesSongs?.length < 1 && <p>You have not favorited any songs</p>}
                {error && (<p>Sorry, an error occurred</p>)}
                <div>
                    {data?.userFavoritesSongs?.map((song) => (
                        <ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
                    ))}
                </div>
            </div>

            <div>
                <h1>userPlaylist</h1>
                {loading && data?.userPlaylist?.length < 1 && <p>You have not created any playlists</p>}
                {error && (<p>Sorry, an error occurred</p>)}
                <div>
                    {data?.userPlaylist?.map((song) => (
                        <ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
                    ))}
                </div>
            </div>
            {currentTrack && <MusicPlayer />}
        </>
    );
}
