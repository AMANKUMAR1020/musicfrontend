import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import "./style/HomePage.css";


export default function MyNavbar(){

    const { user, token } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
  
    const Logout = () => {
      console.log("Logout done");
      dispatch(logoutUser());
      navigate("/");
    };
  
    const GetArtistes = () => {
      console.log("GetArtists page");
      navigate("/artistes");
    };
  
    const GetProfile = () => {
      console.log("GetProfile page");
      navigate("/profile");
    };
  
    const GetPlaylist = () => {
      console.log("GetPlaylist page");
      navigate("/playlist");
    };
  
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
  
      return(
        <div className="navbar">
        <button className="btn-type2" onClick={Logout}>Logout</button>
        
        <button
            className="btn-type2"
            style={{ backgroundColor: bg1 }}
            onClick={GetArtistes}
        >
        GetArtistes
        </button>
  
        <button
            className="btn-type2"
            style={{ backgroundColor: bg2 }}
            onClick={GetPlaylist}
        >
        GetPlaylist
        </button>
  
        <button
            className="btn-type2"
            style={{ backgroundColor: bg3 }}
            onClick={GetProfile}
        >
        {token ? user.username : ""}
  
        </button>
    </div>
      )
  }