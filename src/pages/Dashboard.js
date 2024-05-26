// import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate,Outlet } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
// import { client } from "../api";
// import ArtisteSong from "../components/ArtisteSong";
// import { playTrack, setTrackList } from "../redux/slices/playerSlice";
// import { AiOutlineLoading } from "react-icons/ai";
// import { MusicPlayer } from "../components/MusicPlayer";
import SongList from './SongList'
//import ArtistesPage from './ArtistesPage'

const Dashboard = () => {
//    const [loading, setLoading] = useState(false);
//    const [error, setError] = useState(false);
   const { user, token } = useSelector((state) => state.user);
//	const { currentTrack } = useSelector((state) => state.player);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const Logout = () => {console.log('Logout done');  dispatch(logoutUser()); navigate('/');}
   const GetArtistes = ()=>{console.log('GetArtsites page'); navigate('/artistes');}
   const GetProfile = ()=>{console.log('GetProfile page'); navigate('/profile');}
   const GetPlaylist = ()=>{console.log('GetPlaylist page'); navigate('/playlist');}

   return (
    <>
      <h2 style={{ color: 'blue', fontSize: '24px' }}>Dashboard</h2>
      <img
        src={user.image}
        alt={user.username}
        style={{ width: '60px', height: '60px' }}
      />
  
      <p style={{ fontWeight: 'bold' }}>{user ? user.username : ''}</p>
      <button style={{ backgroundColor: 'green', color: 'white' }} onClick={Logout}>
        Logout
      </button>
      <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={GetArtistes}>
        GetArtistes
      </button>
      <button style={{ backgroundColor: 'purple', color: 'white' }} onClick={GetPlaylist}>
        GetPlaylist
      </button>
      <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={GetProfile}>
        {token ? user.username : ''}
      </button>
  
      <SongList />
      <Outlet />
    </>
  );
  
}

export default Dashboard