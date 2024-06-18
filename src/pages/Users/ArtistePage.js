import { resetPlayer, setTrackList, playTrack, setPlaying } from '../../redux/slices/playerSlice';
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
import { logoutUser } from '../../redux/slices/userSlice';
import MyNavbar from '../MyNavbar';
import Footer from '../Footer';

export default function ArtistePage() {

    const { id } = useParams()
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user, token } = useSelector((state) => state.user);
    const { currentTrack, trackList, currentIndex } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const navigate = useNavigate();

	const location = useLocation();
  
	let bg1 = "#007bff";
	let bg2 = "#007bff";
	let bg3 = "#007bff";
  
	if (location.pathname === "/artistes") {
	  bg1 = "#0056b3";
	  bg2 = "#007bff";
	}
  
	if (location.pathname === "/profile") {
	  bg2 = "#0056b3";
	  bg1 = "#007bff";
	}
  
	if (location.pathname === "/playlist") {
	  bg3 = "#0056b3";
	  bg1 = "#007bff";
	}

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
        <MyNavbar/>
        <h1 className="headline1">ArtistePage</h1>
        <p className="headline2">Discover new artistes</p>

        <div style={{textAlign: 'left', margin: '20px' , padding: '20px'}}>
                {/* <h1 className="headline1">ArtistePage</h1> */}
                {!loading && !error && !data && (<p>{"You haven't any songs yet..."}</p>)}

                <div className='flex-card'>
                    {/* <button onClick={()=>{navigate('/profile/edit')}}>	Profile Edit </button> */}

                    <img style={{display: 'inline'}} src={data?.user?.image} alt={data?.user?.username} width="150px" height="150px"/>
                    <p className='headline3'>{" "}{data?.user?.username}</p>
                    <p className='headline3'>{data?.user?.name}{" "}</p>
                </div>

                <div className='Container'>
                    <h1 className="headline2">userCreateSongs</h1>
                    {/* <button onClick={()=>{navigate('/profile/createsong')}}>Upload New</button> */}

                    {loading && data?.userCreateSongs?.length < 1 && <p>You have not created any songs</p>}
                    {error && (<p>Sorry, an error occurred</p>)}
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
                {loading && data?.userFavoritesSongs?.length < 1 && <p>You have not favorited any songs</p>}
                {error && (<p>Sorry, an error occurred</p>)}
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


















// import { resetPlayer, setTrackList, playTrack, setPlaying } from '../../redux/slices/playerSlice';
// import { MusicPlayer } from "../../components/MusicPlayer";
// import { useLocation ,Link, useNavigate, useParams } from "react-router-dom";
// import ArtisteSong from "../../components/ArtisteSong";
// import { AiOutlineLoading } from "react-icons/ai";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from 'react';
// import { client } from "../../api";
// import SongList from "../SongList";
// //import '../style/ArtistePage.css'
// import '../style/HomePage.css'

// import ClipLoader from "react-spinners/ClipLoader";
// import { logoutUser } from '../../redux/slices/userSlice';
// import MyNavbar from '../MyNavbar';

// export default function ArtistePage() {

//     const { id } = useParams()
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const { user, token } = useSelector((state) => state.user);
//     const { currentTrack, trackList, currentIndex } = useSelector((state) => state.player);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

// 	const location = useLocation();
  
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

//     console.log("enter in ArtistePage");

//     const getUserId = async () => {
//         setLoading(true);
//         setError(false);
//         console.log("id",id);
//         await client
//             .get(`users/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         )
//             .then((res) => {
//                 setLoading(false);
//                 setData(res.data);
//             })
//             .catch(() => {
//                 setLoading(false);
//                 setError(true);
//             });
//         // console.log("user.id", user.id);
//     };

//     useEffect(() => {
//         if (token) {
//             getUserId();
//             dispatch(resetPlayer());
//         }
//         setPlaying(false);
//     }, []);

//   const onPlay = (song) => {
//         let index = data.userCreateSongs?.findIndex((s) => s._id === song._id);
//         if (index !== undefined && index !== null) {
// 			console.log(index, data.userCreateSongs)
//             dispatch(setTrackList({ list: data.userCreateSongs, index }));
//             dispatch(playTrack(song));
//         }

// 		if(index === undefined && index === null){
// 			index = data.userFavoritesSongs?.findIndex((s) => s._id === song._id);
// 			if (index !== undefined && index !== null) {
// 				console.log(index, data.userFavoritesSongs)
// 				dispatch(setTrackList({ list: data.userFavoritesSongs, index }));
// 				dispatch(playTrack(song));
// 			}
// 		}

// 		if(index === undefined && index === null){
// 			index = data.userPlaylist?.findIndex((s) => s._id === song._id);
// 			if (index !== undefined && index !== null) {
// 				console.log(index, data.userPlaylist)
// 				dispatch(setTrackList({ list: data.userPlaylist, index }));
// 				dispatch(playTrack(song));
// 			}
// 		}        
//     };

//     if(!token){
//       return <>
//           ArtistePage
//       </>
//     }

//     return (
//         <>

//         <h1 className="headline1">ArtistePage</h1>
//         <p className="headline2">Discover new artistes</p>
//         <MyNavbar/>

//         <div style={{textAlign: 'left', margin: '20px' , padding: '20px'}}>
//                 {/* <h1 className="headline1">ArtistePage</h1> */}
//                 {!loading && !error && !data && (<p>{"You haven't any songs yet..."}</p>)}

//                 <div className='flex-card'>
//                     {/* <button onClick={()=>{navigate('/profile/edit')}}>	Profile Edit </button> */}

//                     <img style={{display: 'inline'}} src={data?.user?.image} alt={data?.user?.username} width="150px" height="150px"/>
//                     <p className='headline3'>{" "}{data?.user?.username}</p>
//                     <p className='headline3'>{data?.user?.name}{" "}</p>
//                 </div>

//                 <div className='Container'>
//                     <h1 className="headline2">userCreateSongs</h1>
//                     {/* <button onClick={()=>{navigate('/profile/createsong')}}>Upload New</button> */}

//                     {loading && data?.userCreateSongs?.length < 1 && <p>You have not created any songs</p>}
//                     {error && (<p>Sorry, an error occurred</p>)}
//                     <div>
//                         {data?.userCreateSongs?.map((song) => (
//                             <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
//                         ))}
//                         { data.userCreateSongs === undefined || data.userCreateSongs === null ?  <p className='headline3'>no element are right now</p>: <p></p>}
//                     </div>
//                 </div>
//         </div>

//             <div className='Container'>
//                 <h1 className="headline2">userFavoritesSongs</h1>
//                 {loading && data?.userFavoritesSongs?.length < 1 && <p>You have not favorited any songs</p>}
//                 {error && (<p>Sorry, an error occurred</p>)}
//                 <div>
//                     {data?.userFavoritesSongs?.map((song) => (
//                         <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
//                     ))}
//                     {data.userFavoritesSongs === undefined || data.userFavoritesSongs === null  ?  <p className='headline3'>no element are right now</p>: <p></p>}
//                 </div>
//             </div>

//             <div className='Container'>
//                 <h1 className="headline2">userPlaylist</h1>
//                 {loading && data?.userPlaylist?.length < 1 && <p>You have not created any playlists</p>}
//                 {error && (<p>Sorry, an error occurred</p>)}
//                 <div>
//                     {data?.userPlaylist?.map((song) => (
//                         <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
//                     ))}

//                    {data.userPlaylist === undefined || data.userPlaylist === null  ?  <p className='headline3'>no element are right now</p>: <p></p>}
//                 </div>
//             </div>
//             {currentTrack && <MusicPlayer />}
//         </>
//     );
// }

















// import { resetPlayer, setTrackList, playTrack, setPlaying } from '../../redux/slices/playerSlice';
// import { MusicPlayer } from "../../components/MusicPlayer";
// import { useLocation ,Link, useNavigate, useParams } from "react-router-dom";
// import ArtisteSong from "../../components/ArtisteSong";
// import { AiOutlineLoading } from "react-icons/ai";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from 'react';
// import { client } from "../../api";
// import SongList from "../SongList";
// //import '../style/ArtistePage.css'
// import '../style/HomePage.css'

// import ClipLoader from "react-spinners/ClipLoader";
// import { logoutUser } from '../../redux/slices/userSlice';

// export default function ArtistePage() {

//     const { id } = useParams()
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const { user, token } = useSelector((state) => state.user);
//     const { currentTrack, trackList, currentIndex } = useSelector((state) => state.player);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

// 	const location = useLocation();
  
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

//     console.log("enter in ArtistePage");

//     const getUserId = async () => {
//         setLoading(true);
//         setError(false);
//         console.log("id",id);
//         await client
//             .get(`users/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         )
//             .then((res) => {
//                 setLoading(false);
//                 setData(res.data);
//             })
//             .catch(() => {
//                 setLoading(false);
//                 setError(true);
//             });
//         // console.log("user.id", user.id);
//     };

//     useEffect(() => {
//         if (token) {
//             getUserId();
//             dispatch(resetPlayer());
//         }
//         setPlaying(false);
//     }, []);

//   const onPlay = (song) => {
//         let index = data.userCreateSongs?.findIndex((s) => s._id === song._id);
//         if (index !== undefined && index !== null) {
// 			console.log(index, data.userCreateSongs)
//             dispatch(setTrackList({ list: data.userCreateSongs, index }));
//             dispatch(playTrack(song));
//         }

// 		if(index === undefined && index === null){
// 			index = data.userFavoritesSongs?.findIndex((s) => s._id === song._id);
// 			if (index !== undefined && index !== null) {
// 				console.log(index, data.userFavoritesSongs)
// 				dispatch(setTrackList({ list: data.userFavoritesSongs, index }));
// 				dispatch(playTrack(song));
// 			}
// 		}

// 		if(index === undefined && index === null){
// 			index = data.userPlaylist?.findIndex((s) => s._id === song._id);
// 			if (index !== undefined && index !== null) {
// 				console.log(index, data.userPlaylist)
// 				dispatch(setTrackList({ list: data.userPlaylist, index }));
// 				dispatch(playTrack(song));
// 			}
// 		}        
//     };

//     if(!token){
//       return <>
//           ArtistePage
//       </>
//     }

//     return (
//         <>

//         <h1 className="headline1">ArtistePage</h1>
//         <p className="headline2">Discover new artistes</p>
//             <div className="navbar">
//             <button className="btn-type2" onClick={Logout}>Logout</button>
            
//             <button
//                 className="btn-type2"
//                 style={{ backgroundColor: bg1 }}
//                 onClick={GetArtistes}
//             >
//             GetArtistes
//             </button>

//             <button
//                 className="btn-type2"
//                 style={{ backgroundColor: bg2 }}
//                 onClick={GetPlaylist}
//             >
//             GetPlaylist
//             </button>

//             <button
//                 className="btn-type2"
//                 style={{ backgroundColor: bg3 }}
//                 onClick={GetProfile}
//             >
//             {token ? user.username : ""}

//             </button>
//         </div>

//         <div style={{textAlign: 'left', margin: '20px' , padding: '20px'}}>
//                 {/* <h1 className="headline1">ArtistePage</h1> */}
//                 {!loading && !error && !data && (<p>{"You haven't any songs yet..."}</p>)}

//                 <div className='flex-card'>
//                     {/* <button onClick={()=>{navigate('/profile/edit')}}>	Profile Edit </button> */}

//                     <p className='headline3'>{data?.user?.username}</p>
//                     <p className='headline3'>{data?.user?.name}{" "}</p>
//                     <img style={{display: 'inline'}} src={data?.user?.image} alt={data?.user?.username} width="150px" height="150px"/>
//                 </div>

//                 <div className='Container'>
//                     <h1 className="headline2">userCreateSongs</h1>
//                     {/* <button onClick={()=>{navigate('/profile/createsong')}}>Upload New</button> */}

//                     {loading && data?.userCreateSongs?.length < 1 && <p>You have not created any songs</p>}
//                     {error && (<p>Sorry, an error occurred</p>)}
//                     <div>
//                         {data?.userCreateSongs?.map((song) => (
//                             <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
//                         ))}
//                         { data.userCreateSongs === undefined || data.userCreateSongs === null ?  <p className='headline3'>no element are right now</p>: <p></p>}
//                     </div>
//                 </div>
//         </div>

//             <div className='Container'>
//                 <h1 className="headline2">userFavoritesSongs</h1>
//                 {loading && data?.userFavoritesSongs?.length < 1 && <p>You have not favorited any songs</p>}
//                 {error && (<p>Sorry, an error occurred</p>)}
//                 <div>
//                     {data?.userFavoritesSongs?.map((song) => (
//                         <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
//                     ))}
//                     {data.userFavoritesSongs === undefined || data.userFavoritesSongs === null  ?  <p className='headline3'>no element are right now</p>: <p></p>}
//                 </div>
//             </div>

//             <div className='Container'>
//                 <h1 className="headline2">userPlaylist</h1>
//                 {loading && data?.userPlaylist?.length < 1 && <p>You have not created any playlists</p>}
//                 {error && (<p>Sorry, an error occurred</p>)}
//                 <div>
//                     {data?.userPlaylist?.map((song) => (
//                         <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} />
//                     ))}

//                    {data.userPlaylist === undefined || data.userPlaylist === null  ?  <p className='headline3'>no element are right now</p>: <p></p>}
//                 </div>
//             </div>
//             {currentTrack && <MusicPlayer />}
//         </>
//     );
// }
















// import { resetPlayer, setTrackList, playTrack, setPlaying } from '../../redux/slices/playerSlice';
// import { MusicPlayer } from "../../components/MusicPlayer";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import ArtisteSong from "../../components/ArtisteSong";
// import { AiOutlineLoading } from "react-icons/ai";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from 'react';
// import { client } from "../../api";
// import SongList from "../SongList";
// import '../style/ArtistePage.css'

// export default function ArtistePage() {

//     const { id } = useParams()
//     const [data, setData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const { user, token } = useSelector((state) => state.user);
//     const { currentTrack, trackList, currentIndex } = useSelector((state) => state.player);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     console.log("enter in ArtistePage");

//     const getUserId = async () => {
//         setLoading(true);
//         setError(false);
//         await client
//             .get(`users/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//             .then((res) => {
//                 setLoading(false);
//                 setData(res.data);
//             })
//             .catch(() => {
//                 setLoading(false);
//                 setError(true);
//             });
//         console.log("user.id", user.id);
//     };

//     useEffect(() => {
//         if (token) {
//             getUserId();
//             dispatch(resetPlayer());
//         }
//         setPlaying(false);
//     }, []);

//   const onPlay = (song) => {
//         let index = data.userCreateSongs?.findIndex((s) => s._id === song._id);
//         if (index !== undefined && index !== null) {
// 			console.log(index, data.userCreateSongs)
//             dispatch(setTrackList({ list: data.userCreateSongs, index }));
//             dispatch(playTrack(song));
//         }

// 		if(index === undefined && index === null){
// 			index = data.userFavoritesSongs?.findIndex((s) => s._id === song._id);
// 			if (index !== undefined && index !== null) {
// 				console.log(index, data.userFavoritesSongs)
// 				dispatch(setTrackList({ list: data.userFavoritesSongs, index }));
// 				dispatch(playTrack(song));
// 			}
// 		}

// 		if(index === undefined && index === null){
// 			index = data.userPlaylist?.findIndex((s) => s._id === song._id);
// 			if (index !== undefined && index !== null) {
// 				console.log(index, data.userPlaylist)
// 				dispatch(setTrackList({ list: data.userPlaylist, index }));
// 				dispatch(playTrack(song));
// 			}
// 		}
        
//     };

//     if(!token){
//       return <>
//           ArtistePage
//       </>
//     }

//     return (
//         <>
//             <h1>ArtistePage</h1>
//             {!loading && !error && !data && (<p>{"You haven't any songs yet..."}</p>)}

//             <div>
//                 <h1 className='headTag'>User</h1>
//                 {/* <button onClick={()=>{navigate('/profile/edit')}}>	Profile Edit </button> */}

//                 <h2 className='paraTag'>{data?.user?.username}</h2>
//                 <h2 className='paraTag'>{data?.user?.name}</h2>
//                 <img src={data?.user?.image} alt={data?.user?.username} width="150px" height="150px"/>
//             </div>

//             <div>
//                 <h1>userCreateSongs</h1>
//                 {/* <button onClick={()=>{navigate('/profile/createsong')}}>Upload New</button> */}

//                 {loading && data?.userCreateSongs?.length < 1 && <p>You have not created any songs</p>}
//                 {error && (<p>Sorry, an error occurred</p>)}
//                 <div>
//                     {data?.userCreateSongs?.map((song) => (
//                         <ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <h1>userFavoritesSongs</h1>
//                 {loading && data?.userFavoritesSongs?.length < 1 && <p>You have not favorited any songs</p>}
//                 {error && (<p>Sorry, an error occurred</p>)}
//                 <div>
//                     {data?.userFavoritesSongs?.map((song) => (
//                         <ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <h1>userPlaylist</h1>
//                 {loading && data?.userPlaylist?.length < 1 && <p>You have not created any playlists</p>}
//                 {error && (<p>Sorry, an error occurred</p>)}
//                 <div>
//                     {data?.userPlaylist?.map((song) => (
//                         <ArtisteSong key={song._id} song={song} handlePlay={onPlay} />
//                     ))}
//                 </div>
//             </div>
//             {currentTrack && <MusicPlayer />}
//         </>
//     );
// }
