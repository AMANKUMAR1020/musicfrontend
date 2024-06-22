import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import "./style/HomePage.css";
import { resetPlayer, setCurrentTrack, setPlaying } from "../redux/slices/playerSlice";
//import {FlushMusic} from '../components/FlushMusic'

//import { useDispatch, useSelector } from "react-redux";
//import { setCurrentTrack, setPlaying } from "../redux/slices/playerSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    navigate("/");
  };

  if (location.pathname === "/") {
    bg1 = "#0056b3";
    bg2 = "#007bff";
  }

  if (location.pathname === "/artistes") {
    bg1 = "#0056b3";
    bg2 = "#007bff";
  }
  const GetArtistes = () => {
    console.log("GetArtists page");

    dispatch(resetPlayer());
    navigate("/artistes");
  };

  if (location.pathname === "/profile") {
    bg2 = "#0056b3";
    bg1 = "#007bff";
  }
  const GetProfile = () => {
    console.log("GetProfile page");

    dispatch(resetPlayer());
    navigate("/profile");
  };


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
    navigate('/auth/login');
  }

	const Register = () =>{
    console.log('Register done');

    dispatch(resetPlayer());
    navigate('/auth/register');
  }

	const Home = () =>{
    console.log('HomePage');

    dispatch(resetPlayer());
    user ? navigate('/dash') : navigate('/');
  }


  return (
    <>
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
    </>
  );
}
