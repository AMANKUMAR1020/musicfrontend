import React from "react";
import "./style/HomePage.css";
import SongList from "./SongList";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';
import useTitle from "./useTitle";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user} = useSelector((state) => state.user);

  useTitle(`Welcome ${user.username}`)

  return (
    <>
      <MyNavbar/>
        <Navbar/>
        <SongList/>
        <ToastContainer/>
        <Outlet />
      <Footer/>
    </>
  );
};

export default Dashboard;









// import React from "react";
// import "./style/HomePage.css";
// import SongList from "./SongList";
// import Navbar from "./Navbar";
// import { Outlet } from "react-router-dom";
// import MyNavbar from "./MyNavbar";
// import Footer from "./Footer";

// const Dashboard = () => {
//   return (
//     <>
//       <MyNavbar/>
//         <Navbar/>
//         <SongList/>
//         <Outlet />
//       <Footer/>
//     </>
//   );
// };

// export default Dashboard;















// import React from "react";
// import "./style/HomePage.css";
// import SongList from "./SongList";
// import Navbar from "./Navbar";
// import { Outlet } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <>
//       <Navbar/>
//       <SongList />
//       <Outlet />
//     </>
//   );
// };

// export default Dashboard;









// import "./style/HomePage.css";
// import SongList from "./SongList";
// import Navbar from "./Navbar";
// import { Outlet } from "react-router-dom";

// const Dashboard = () => {
//   return (<>

//   <div style={display:'inline'}>
//     <Navbar/>
//     <SongList />
//     <Outlet />
//   </div>
  
//   </>);
// };

// export default Dashboard;




















// // import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link,useNavigate,Outlet } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";
// import './style/HomePage.css'
// import SongList from './SongList'

// // import { client } from "../api";
// // import ArtisteSong from "../components/ArtisteSong";
// // import { playTrack, setTrackList } from "../redux/slices/playerSlice";
// // import { AiOutlineLoading } from "react-icons/ai";
// // import { MusicPlayer } from "../components/MusicPlayer";
// //import ArtistesPage from './ArtistesPage'

// const Dashboard = () => {
// //    const [loading, setLoading] = useState(false);
// //    const [error, setError] = useState(false);
//    const { user, token } = useSelector((state) => state.user);
// //	const { currentTrack } = useSelector((state) => state.player);
//    const navigate = useNavigate();
//    const dispatch = useDispatch();

//    const Logout = () => {console.log('Logout done');  dispatch(logoutUser()); navigate('/');}
//    const GetArtistes = ()=>{console.log('GetArtsites page'); navigate('/artistes');}
//    const GetProfile = ()=>{console.log('GetProfile page'); navigate('/profile');}
//    const GetPlaylist = ()=>{console.log('GetPlaylist page'); navigate('/playlist');}

//    return (
//     <>
//     <div style={{display:'inline'}}>
//       <div className="navbar">

//       </div>
//     </div>
//       <h2 className="headline2">Dashboard</h2>
//       <img
//         src={user.image}
//         alt={user.username}
//         style={{ width: '80px', height: '80px' }}
//       />
  
//       <h3 className="headline3">{user ? user.username : ''}</h3>
//       <button style={{ backgroundColor: 'green', color: 'white' }} onClick={Logout}>
//         Logout
//       </button>
//       <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={GetArtistes}>
//         GetArtistes
//       </button>
//       <button style={{ backgroundColor: 'purple', color: 'white' }} onClick={GetPlaylist}>
//         GetPlaylist
//       </button>
//       <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={GetProfile}>
//         {token ? user.username : ''}
//       </button>
  
//       <SongList />
//       <Outlet />
//     </>
//   );
  
// }

// export default Dashboard














// // import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link,useNavigate,Outlet } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";
// // import { client } from "../api";
// // import ArtisteSong from "../components/ArtisteSong";
// // import { playTrack, setTrackList } from "../redux/slices/playerSlice";
// // import { AiOutlineLoading } from "react-icons/ai";
// // import { MusicPlayer } from "../components/MusicPlayer";
// import SongList from './SongList'
// //import ArtistesPage from './ArtistesPage'

// const Dashboard = () => {
// //    const [loading, setLoading] = useState(false);
// //    const [error, setError] = useState(false);
//    const { user, token } = useSelector((state) => state.user);
// //	const { currentTrack } = useSelector((state) => state.player);
//    const navigate = useNavigate();
//    const dispatch = useDispatch();

//    const Logout = () => {console.log('Logout done');  dispatch(logoutUser()); navigate('/');}
//    const GetArtistes = ()=>{console.log('GetArtsites page'); navigate('/artistes');}
//    const GetProfile = ()=>{console.log('GetProfile page'); navigate('/profile');}
//    const GetPlaylist = ()=>{console.log('GetPlaylist page'); navigate('/playlist');}

//    return (
//     <>
//       <h2 style={{ color: 'blue', fontSize: '24px' }}>Dashboard</h2>
//       <img
//         src={user.image}
//         alt={user.username}
//         style={{ width: '60px', height: '60px' }}
//       />
  
//       <p style={{ fontWeight: 'bold' }}>{user ? user.username : ''}</p>
//       <button style={{ backgroundColor: 'green', color: 'white' }} onClick={Logout}>
//         Logout
//       </button>
//       <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={GetArtistes}>
//         GetArtistes
//       </button>
//       <button style={{ backgroundColor: 'purple', color: 'white' }} onClick={GetPlaylist}>
//         GetPlaylist
//       </button>
//       <button style={{ backgroundColor: 'orange', color: 'white' }} onClick={GetProfile}>
//         {token ? user.username : ''}
//       </button>
  
//       <SongList />
//       <Outlet />
//     </>
//   );
  
// }

// export default Dashboard