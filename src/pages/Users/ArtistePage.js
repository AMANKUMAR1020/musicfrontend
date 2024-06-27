import {setCurrentTrack, resetPlayer, setTrackList, playTrack, setPlaying } from '../../redux/slices/playerSlice';
import { MusicPlayer } from "../../components/MusicPlayer";
import { useLocation ,Link, useNavigate, useParams, Outlet } from "react-router-dom";
import ArtisteSong from "../../components/ArtisteSong";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { client } from "../../api";
import SongList from "../SongList";
//import '../style/ArtistePage.css'
import '../style/HomePage.css'

import ClipLoader from "react-spinners/ClipLoader";
import MyNavbar from '../MyNavbar';
import Footer from '../Footer';
import useTitle from '../useTitle';
//import { setCurrentTrack,setPlaying } from '../../redux/slices/playerSlice';

export default function ArtistePage() {


    const { id } = useParams()
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user, token } = useSelector((state) => state.user);
    const { currentTrack, trackList, currentIndex } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useTitle(`${user.username}'s Profile`)

	const location = useLocation();

    console.log("enter in ArtistePage");

    const getUserId = async () => {
        setLoading(true);
        setError(false);
        console.log("id",id);
        await client
            .get(`users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
//        console.log("user.id", user.id);
    };

    useEffect(() => {
        if (token) {
            dispatch(setCurrentTrack(null));
            dispatch(dispatch(resetPlayer()));
            
            getUserId();
            dispatch(resetPlayer());
        }
        setPlaying(false);
    }, []);

  const onPlay = (song) => {
    dispatch(resetPlayer());//dispatch(resetPlayer());

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
        <h1 className="headline1">ArtistePage</h1>
        <p className="headline2">Discover new artistes</p>

        <div style={{textAlign: 'left', margin: '20px' , padding: '20px'}}>
                {/* <h1 className="headline1">ArtistePage</h1> */}
                {!loading && !error && !data && (<p className='text'>{"You haven't any songs yet..."}</p>)}


                <div className='flex-card'>
                    {/* <button onClick={()=>{navigate('/profile/edit')}}>	Profile Edit </button> */}

                    <img style={{display: 'inline'}} src={data?.user?.image} alt={data?.user?.username} width="150px" height="150px"/>
                    <p className='headline3'>&nbsp;&nbsp;&nbsp;{data?.user?.username}</p>
                    <p className='headline3'>&nbsp;&nbsp;&nbsp;{data?.user?.name}</p>
                </div>

                <div className='Container'>
                    <h1 className="headline2">userCreateSongs</h1>
                    {/* <button onClick={()=>{navigate('/profile/createsong')}}>Upload New</button> */}

                    {data?.userCreateSongs?.length < 1 && <p className='text'>You have not created any songs</p>}
                    {error && (<p className='error' >Sorry, an error occurred</p>)}
                    <div>
                        {data?.userCreateSongs?.map((song) => (
                            <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
                        ))}
                        { data.userCreateSongs === undefined || data.userCreateSongs === null ?  <p className='headline3'>no element are right now</p>: <p></p>}
                    </div>
                </div>
        </div>

            <div className='Container'>
                <h1 className="headline2">userFavoritesSongs</h1>
                {data?.userFavoritesSongs?.length < 1 && <p className='text'>You have not favorited any songs</p>}
                {error && (<p className='error'>Sorry, an error occurred</p>)}
                <div>
                    {data?.userFavoritesSongs?.map((song) => (
                        <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
                    ))}
                    {data.userFavoritesSongs === undefined || data.userFavoritesSongs === null  ?  <p className='headline3'>no element are right now</p>: <p></p>}
                </div>
            </div>

            <div className='Container'>
                <h1 className="headline2">userPlaylist</h1>
                {loading && data?.userPlaylist?.length < 1 && <p>You have not created any playlists</p>}
                {error && (<p>Sorry, an error occurred</p>)}
                <div>
                    {/* {data?.userPlaylist?.map((song) => (
                        // <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
                        <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
                    ))} */}
                {data?.userPlaylist?.map((playlist) => (
                    <div key={playlist?._id}>
                        <div className="flex-card2">
                            <p className="headline3" style={{ cursor: 'pointer' }} onClick={() => { navigate(`/playlist/${playlist?._id}`) }}>{playlist?.title}</p>
                            <p className="text">{playlist?.description}</p>
                    </div>
                </div>
                ))}


                   {data.userPlaylist === undefined || data.userPlaylist === null  ?  <p className='headline3'>no element are right now</p>: <p></p>}
                </div>
            </div>
            {currentTrack && <MusicPlayer />}
        <Outlet/>
        <Footer/>
        </>
    );
}