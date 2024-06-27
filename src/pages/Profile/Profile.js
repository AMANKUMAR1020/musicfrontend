import { setCurrentTrack,resetPlayer, setTrackList, playTrack, setPlaying } from '../../redux/slices/playerSlice';
import { MusicPlayer } from "../../components/MusicPlayer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ArtisteSong from "../../components/ArtisteSong";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { client } from "../../api";
import SongList from "../SongList";
//import '../style/Profile.css'

import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import MyNavbar from '../MyNavbar';
import '../style/HomePage.css'

import { RiEdit2Fill } from "react-icons/ri";
import { LuUpload } from "react-icons/lu";
// import { CiPlay1 } from "react-icons/ci";
// import { FaPlay } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import Footer from '../Footer';
import useTitle from '../useTitle';


export default function Profile() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { user, token } = useSelector((state) => state.user);
    const { currentTrack, trackList, currentIndex } = useSelector((state) => state.player);
    const [deleteItems, setDeleteItems] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useTitle(`Welcome ${user.username}`)
    

    console.log("enter in Profile");

    const getUserId = async () => {
      setLoading(true);
      setError(false);
      const userid = user.id//user._id !== undefined && user._id !== null ? user._id : user.id;
  
      try {
          const res = await client.get(`users/${userid}`, {
            headers: {
              Authorization: `Bearer ${token}`,},
          });
          setData(res.data);
          console.log(res.data);
  
        }catch (error) {
          setError(true);
          setErrorMsg(error.message);
        }
        
        setLoading(false);
      console.log("user", user);
    };

    const onPlay = (song) => {

      dispatch(setCurrentTrack(null));
      dispatch(setPlaying(false));

      let index = data.userCreateSongs?.findIndex((s) => s?._id === song?._id);
    
      console.log(index);
    
      if (index !== undefined && index !== null) {
        console.log(index, data.userCreateSongs);
        dispatch(setTrackList({ list: data.userCreateSongs, index }));
        // dispatch(playTrack(song));
      } else {
        index = data.userFavoritesSongs?.findIndex((s) => s?._id === song?._id);
        if (index !== undefined && index !== null) {
          console.log(index, data.userFavoritesSongs);
          dispatch(setTrackList({ list: data.userFavoritesSongs, index }));
          // dispatch(playTrack(song));
        } else {
          index = data.userPlaylist?.findIndex((s) => s?._id === song?._id);
          if (index !== undefined && index !== null) {
            console.log(index, data.userPlaylist);
            dispatch(setTrackList({ list: data.userPlaylist, index }));
            // dispatch(playTrack(song));
          }
        }
      }
      dispatch(playTrack(song));
    };
    

     const handleDeletePlaylist = async(id,e) => {
          e.preventDefault();
          setLoading(true);
          setError(false);
          
          await client.delete(`playlists/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
              }).then((res) => {
                  console.log("delete successfully playlist",res.data);
  //              setData(res.data);
  //                getUserId();
                  setDeleteItems(`:) you delete successfully playlist,${res.data.title}`)
                  dispatch(resetPlayer());
                  setPlaying(false);                            
              }).catch((e) => {
                setError(true);
                setErrorMsg(e);
                console.log(e);
              });
              setLoading(false);
      };
      
      const handleDeleteImg = async (imgUrl) => {
          const desertRef = ref(storage, imgUrl);
        
          if (desertRef) {
            await deleteObject(desertRef).then(() => {
                console.log('deleteSuccessfully');
              }).catch((error) => {
                console.log(error);
              });
          } else {
            return;
          }
        };
        
        const handleDeleteSong = async (songUrl) => {
          const desertRef = ref(storage, songUrl);
        
          if (desertRef) {
            await deleteObject(desertRef).then(() => {
                console.log('deleteSuccessfully');
              }).catch((error) => {
                console.log(error);
              });
          } else {
            return;
          }
        };
        
        const handleDelete = async (id, e) => {
          e.preventDefault();
        
          setLoading(true);
          setError(false);
        
          try {
            await handleDeleteImg(id.coverImage);
            await handleDeleteSong(id.songUrl);
          } catch (error) {
            setLoading(false);
            setError(true);
        
            setErrorMsg(error);
            console.log(error);
          }
        
          await client.delete(`songs/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((res) => {
              setLoading(false);
              console.log('delete successfully', res.data);
  //            getUserId();
              setDeleteItems(`:) you delete successfully Song, ${res.data.title}`)
              dispatch(resetPlayer());    
              setPlaying(false);
            }).catch((e) => {
              setLoading(false);
              setError(true);
        
              setErrorMsg(e);
              console.log(e);
            });
        };
  
      const trimming = (desc) => {
          if (desc?.length > 15) {
            return desc?.slice(0, 15) + "...";
          }
          return desc;
      };


    useEffect(() => {
      getUserId();
      dispatch(resetPlayer());
      setPlaying(false);
    }, []);

    useEffect(()=>{

    },
    [data.userCreateSongs,data.userFavoritesSongs,data.userPlaylist])

    return (
        <>
        <MyNavbar/>
        <h1 className='headline1'>Profile</h1>

            {!loading && !error && !data && (<p  className='text'>{"You haven't any songs yet..."}</p>)}
            {deleteItems && <p className='success'>{deleteItems}</p>}

            <div className='flex-card-edit'>
              <img src={data?.user?.image} alt={data?.user?.username} width="150px" height="150px"/><span>&nbsp;&nbsp;&nbsp;</span>
              <p className='headline3'>{data?.user?.username}<span>&nbsp;&nbsp;&nbsp;</span></p>
              <p className='headline3'>{data?.user?.name}</p>
              <button className='btn-type3' onClick={() => { navigate('/edit') }}><RiEdit2Fill/></button>
            </div>

          <div className='Container'>
              <h1 className='headline2'>userCreateSongs</h1>
              <button className='btn-type3' onClick={() => { navigate('/createsong') }}><LuUpload/></button>

              {data?.userCreateSongs?.length < 1 && <p className='text'>You have not created any songs</p>}
              {error && (<p className='error'>Sorry, an error occurred</p>)}

              <div>
              {data?.userCreateSongs?.map((song) => (
                  <span  key={song?._id}>
                    <ArtisteSong song={song} handlePlay={onPlay} />
                    {/* <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} /> */}
                    <button className='btn-type5' onClick={(e) => { handleDelete(song?._id, e) }}><MdOutlineDeleteOutline/></button>
                  </span>
              ))}
              </div>
          </div>

          <div className='Container'>
              <h1 className='headline2'>userFavoritesSongs</h1>
              {data?.userFavoritesSongs?.length < 1 && <p  className='text'>You have not favorited any songs</p>}
              {error && (<p className='error'>Sorry, an error occurred</p>)}
              <div>
              {data?.userFavoritesSongs?.map((song) => (
                  <span  key={song?._id} >
                    {/* <ArtisteSong key={song?._id} song={song} handlePlay={onPlay} /> */}
                    {/* <ArtisteSong key={song._id} song={song} handlePlay={onPlay} /> */}
                    <ArtisteSong song={song} handlePlay={onPlay} />
                    <button className='btn-type5' onClick={(e) => { handleDelete(song?._id, e) }}><MdOutlineDeleteOutline/></button>
                  </span>
              ))}
              </div>
          </div>

          <div className='Container'>
              <h1 className='headline2'>userPlaylist</h1>

              {data?.userPlaylist?.length < 1 && <p className='text'>You have not created any playlists</p>}
              {error && (<p className='error'>Sorry, an error occurred</p>)}
              <div>
              <div style={{alignContent:'left'}} className='place'>
                <button className='btn-type3' onClick={() => { navigate('/createplaylist') }}><MdOutlineCreateNewFolder/></button>
              </div>

              {data?.userPlaylist?.map((playlist) => (
                <div key={playlist?._id}>
                    <div className="flex-card2">
                      <p className="headline3" onClick={() => { navigate(`/playlist/${playlist?._id}`) }}>{playlist?.title}</p>
                      <p className="text">{trimming(playlist?.description)}</p>
                      <button className='btn-type6' onClick={(e) => { handleDeletePlaylist(playlist?._id, e) }}> <MdOutlineDeleteOutline/> </button>
                      <button className='btn-type8' onClick={(e) => { navigate(`/editplaylist/${playlist?._id}`) }}>Edit</button>
                    </div>
                  </div>
              ))}
              </div>
          </div>

          {currentTrack && <MusicPlayer />}

          <Outlet/>
          <Footer/>
        </>
    );
}