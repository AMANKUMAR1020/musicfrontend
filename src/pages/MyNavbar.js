import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import "./style/HomePage.css";
import { resetPlayer, setCurrentTrack, setPlaying } from "../redux/slices/playerSlice";
//import {FlushMusic} from '../components/FlushMusic'

//import { useDispatch, useSelector } from "react-redux";
//import { setCurrentTrack, setPlaying } from "../redux/slices/playerSlice";
import { toast, ToastContainer } from 'react-toastify';

const FlushMusic = () => {
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  if (currentTrack) {dispatch(setCurrentTrack(null));}

  if (isPlaying) {dispatch(setPlaying(false));}
};





export default function MyNavbar() {
  const { user, token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
//  const [display,setDisplay] = useState(null);

  let bg1 = "#007bff";
  let bg2 = "#007bff";
  let bg3 = "#007bff";

  useEffect(() => {
//    setDisplay(`${user}`)
  }, [user]);

  const Logout = () => {
    console.log("Logout done");
    dispatch(logoutUser());
    // setNavlink2("none");
    // setNavlink1("flex");


    toast.success("Login Successufully! ", {
      data: {
        title: "Success toast",
        text: "This is a success message",
      },
    });

    navigate("/");
  };

  if (location.pathname === "/") {
    bg1 = "#0056b3";
    bg2 = "#007bff";
  }

  const GetArtistes = () => {
    console.log("GetArtists page");

    dispatch(resetPlayer());
    navigate("/artistes");
  };

  if (location.pathname === "/artistes") {
    bg1 = "#0056b3";
    bg2 = "#007bff";
  }

  const GetProfile = () => {
    console.log("GetProfile page");

    dispatch(resetPlayer());
    navigate("/profile");
  };

  if (location.pathname === "/profile") {
    bg2 = "#0056b3";
    bg1 = "#007bff";
  }

  if (location.pathname === "/playlist") {
    bg3 = "#0056b3";
    bg1 = "#007bff";
  }

  const GetPlaylist = () => {
    console.log("GetPlaylist page");

    dispatch(resetPlayer());
    navigate("/playlist");
  };

	const Login = () => {
    console.log('Login navigate');

    dispatch(resetPlayer());
    navigate('/auth/login');}

	const Register = () =>{
    console.log('Register done');

    dispatch(resetPlayer());
    navigate('/auth/register');}

	const Home = () =>{console.log('Home done');

    dispatch(resetPlayer());
    user ? navigate('/dash') : navigate('/');}


  return (
    <div className="navhead">
      <div className="Appname" onClick={() =>{Home()}}>Muyi</div>


      <div className="nav-link" >
      {user ? 
            <div className="nav-link1">
              <button className="btn-type8" onClick={Logout}> Logout </button>
              <button className="btn-type8" onClick={GetArtistes}> GetArtistes </button>
              <button className="btn-type8" onClick={GetPlaylist}> GetPlaylist </button>
              <button className="btn-type8" onClick={GetProfile}> {token ? user.username : ""} </button>
            </div>
      :
          <div className="nav-link1">
            <button className="btn-type8" onClick={Login}> Login </button>
            <button className="btn-type8" onClick={Register}> Signin </button>
          </div>
      }
      </div>
    </div>
  );
}
















// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";
// import "./style/HomePage.css";
// import { setCurrentTrack, setPlaying } from "../redux/slices/playerSlice";

// export default function MyNavbar() {
//   const { user, token } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [display,setDisplay] = useState(null);

//   let bg1 = "#007bff";
//   let bg2 = "#007bff";
//   let bg3 = "#007bff";

//   useEffect(() => {
//     setDisplay(`${user}`)
//   }, [user]);

//   const Logout = () => {
//     console.log("Logout done");
//     dispatch(logoutUser());
//     // setNavlink2("none");
//     // setNavlink1("flex");
//     navigate("/");
//   };

//   if (location.pathname === "/") {
//     bg1 = "#0056b3";
//     bg2 = "#007bff";
//   }

//   const GetArtistes = () => {
//     console.log("GetArtists page");
//     navigate("/artistes");
//   };

//   if (location.pathname === "/artistes") {
//     bg1 = "#0056b3";
//     bg2 = "#007bff";
//   }

//   const GetProfile = () => {
//     console.log("GetProfile page");
//     navigate("/profile");
//   };

//   if (location.pathname === "/profile") {
//     bg2 = "#0056b3";
//     bg1 = "#007bff";
//   }

//   if (location.pathname === "/playlist") {
//     bg3 = "#0056b3";
//     bg1 = "#007bff";
//   }

//   const GetPlaylist = () => {
//     console.log("GetPlaylist page");
//     navigate("/playlist");
//   };

//   return (
//     <div className="navhead">
//       <div className="Appname">Muyi</div>


//       {user ? }

//       <div className="nav-link">
//         <div className="nav-link1" style={{ display: display ? 'none' : 'flex' }}>
//           <button className="btn-type8" onClick={GetArtistes}> Register </button>
//           <button className="btn-type8" onClick={GetArtistes}> Login </button>
//           <button className="btn-type8" onClick={GetArtistes}> Signin </button>
//         </div>

//         <div className="nav-link2" style={{ display: display ? 'flex' : 'none'  }}>
//           <button className="btn-type8" onClick={Logout}> Logout </button>
//           <button className="btn-type8" onClick={GetArtistes}> GetArtistes </button>
//           <button className="btn-type8" onClick={GetPlaylist}> GetPlaylist </button>
//           <button className="btn-type8" onClick={GetProfile}> {token ? user.username : ""} </button>
//         </div>
//       </div>
//     </div>
//   );
// }

















// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";
// import "./style/HomePage.css";
// import { setCurrentTrack,setPlaying } from "../redux/slices/playerSlice";

// // export function flushMusic(){
// //   const dispatch = useDispatch();
// //   dispatch(setCurrentTrack(null));
// //   dispatch(setPlaying(false));
// // }

// export default function MyNavbar(){

//     const { user, token } = useSelector((state) => state.user);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const [navlink1,setNavlink1] = useState("flex");
//     const [navlink2,setNavlink2] = useState("none");

//     let bg1 = "#007bff";
//     let bg2 = "#007bff";
//     let bg3 = "#007bff";

//     if(user){
//       setNavlink1("none");
//       setNavlink2("flex");
//     }else{
//       setNavlink2("none");
//       setNavlink1("flex");
//     }
    
//     useEffect((()=>{

//     }),[user]);

//     const Logout = () => {console.log("Logout done"); dispatch(logoutUser()); navigate("/");};
//     if (location.pathname === "/") { bg1 = "#0056b3"; bg2 = "#007bff";}

//     const GetArtistes = () => {console.log("GetArtists page"); navigate("/artistes");};
//     if (location.pathname === "/artistes") { bg1 = "#0056b3"; bg2 = "#007bff";}
    
//     const GetProfile = () => {console.log("GetProfile page");  navigate("/profile")}; 
//     if (location.pathname === "/profile") { bg2 = "#0056b3"; bg1 = "#007bff";}
    
//     if (location.pathname === "/playlist") { bg3 = "#0056b3"; bg1 = "#007bff";}
//     const GetPlaylist = () => { console.log("GetPlaylist page"); navigate("/playlist");};
  
//       return(
//         <div className="navhead">
//           <div className="Appname">Muyi</div> 
          
//           <div className="nav-link">
//             <div className="nav-link1"  style={{display:navlink1}}>
//               <button
//                 className="btn-type8"
//                 onClick={GetArtistes}
//               >Register</button>
              
//               <button
//                 className="btn-type8"
//                 onClick={GetArtistes}
//               >Login</button>
              
//               <button
//                 className="btn-type8"
//                 onClick={GetArtistes}
//               >Signin</button>

//             </div>

//             <div className="nav-link2" style={{display:navlink2}}>
//               <button className="btn-type8" onClick={Logout}>Logout</button>
                
//                 <button
//                     className="btn-type8"
//                     onClick={GetArtistes}
//                 >
//                 GetArtistes
//                 </button>
          
//                 <button
//                     className="btn-type8"
//                     onClick={GetPlaylist}
//                 >
//                 GetPlaylist
//                 </button>
          
//                 <button
//                     className="btn-type8"
//                     onClick={GetProfile}
//                   >
//                     {token ? user.username : ""}      
//                 </button>
//             </div>
//           </div>
          
//         </div>
//       )
//   }
















// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";
// import "./style/HomePage.css";
// import { setCurrentTrack,setPlaying } from "../redux/slices/playerSlice";

// export function flushMusic(){
//   const dispatch = useDispatch();
//   dispatch(setCurrentTrack(null));
//   dispatch(setPlaying(false));
// }

// export default function MyNavbar(){

//     const { user, token } = useSelector((state) => state.user);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const dispatch = useDispatch();
  
//     const Logout = () => {
//       console.log("Logout done");
//       dispatch(logoutUser());
//       navigate("/");
//     };
  
//     const GetArtistes = () => {
//       console.log("GetArtists page");
//       navigate("/artistes");
//     };
  
//     const GetProfile = () => {
//       console.log("GetProfile page");
//       navigate("/profile");
//     };
  
//     const GetPlaylist = () => {
//       console.log("GetPlaylist page");
//       navigate("/playlist");
//     };
  
//     let bg1 = "#007bff";
//     let bg2 = "#007bff";
//     let bg3 = "#007bff";
  
//     if (location.pathname === "/artistes") {
//       bg1 = "#0056b3";
//       bg2 = "#007bff";
//     }
  
//     if (location.pathname === "/profile") {
//       bg2 = "#0056b3";
//       bg1 = "#007bff";
//     }
  
//     if (location.pathname === "/playlist") {
//       bg3 = "#0056b3";
//       bg1 = "#007bff";
//     }
  
//       return(
//         <div className="navbar">
//         <button className="btn-type2" onClick={Logout}>Logout</button>
        
//         <button
//             className="btn-type2"
//             style={{ backgroundColor: bg1 }}
//             onClick={GetArtistes}
//         >
//         GetArtistes
//         </button>
  
//         <button
//             className="btn-type2"
//             style={{ backgroundColor: bg2 }}
//             onClick={GetPlaylist}
//         >
//         GetPlaylist
//         </button>
  
//         <button
//             className="btn-type2"
//             style={{ backgroundColor: bg3 }}
//             onClick={GetProfile}
//         >
//         {token ? user.username : ""}
  
//         </button>
//     </div>
//       )
//   }


















// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
// import { logoutUser } from "../redux/slices/userSlice";
// import "./style/HomePage.css";

// export default function MyNavbar(){

//     const { user, token } = useSelector((state) => state.user);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const dispatch = useDispatch();
  
//     const Logout = () => {
//       console.log("Logout done");
//       dispatch(logoutUser());
//       navigate("/");
//     };
  
//     const GetArtistes = () => {
//       console.log("GetArtists page");
//       navigate("/artistes");
//     };
  
//     const GetProfile = () => {
//       console.log("GetProfile page");
//       navigate("/profile");
//     };
  
//     const GetPlaylist = () => {
//       console.log("GetPlaylist page");
//       navigate("/playlist");
//     };
  
//     let bg1 = "#007bff";
//     let bg2 = "#007bff";
//     let bg3 = "#007bff";
  
//     if (location.pathname === "/artistes") {
//       bg1 = "#0056b3";
//       bg2 = "#007bff";
//     }
  
//     if (location.pathname === "/profile") {
//       bg2 = "#0056b3";
//       bg1 = "#007bff";
//     }
  
//     if (location.pathname === "/playlist") {
//       bg3 = "#0056b3";
//       bg1 = "#007bff";
//     }
  
//       return(
//         <div className="navbar">
//         <button className="btn-type2" onClick={Logout}>Logout</button>
        
//         <button
//             className="btn-type2"
//             style={{ backgroundColor: bg1 }}
//             onClick={GetArtistes}
//         >
//         GetArtistes
//         </button>
  
//         <button
//             className="btn-type2"
//             style={{ backgroundColor: bg2 }}
//             onClick={GetPlaylist}
//         >
//         GetPlaylist
//         </button>
  
//         <button
//             className="btn-type2"
//             style={{ backgroundColor: bg3 }}
//             onClick={GetProfile}
//         >
//         {token ? user.username : ""}
  
//         </button>
//     </div>
//       )
//   }