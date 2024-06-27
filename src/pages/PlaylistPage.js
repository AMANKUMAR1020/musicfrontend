import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { client } from "../api";
import { Link, Outlet } from "react-router-dom";
import './style/PlaylistPage.css'
import './style/HomePage.css'
import MyNavbar from './MyNavbar'
import Footer from "./Footer";
import useTitle from "./useTitle";
import ClipLoader from "react-spinners/ClipLoader";


export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useTitle('Get Awesome Playlist')

  const fetchPlaylists = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await client.get("playlists");
      setPlaylists(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const trimming = (desc) => {
    if (desc.length > 20) {
      return desc.substr(0, 20) + "...";
    }
    return desc;
  };

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
    <div>
      <h1 className="headline1">Playlists</h1>
      <p className="headline2">Discover new Playlists</p>
      <div className="Container">
        {loading && playlists.length < 1 && (
          <AiOutlineLoading className="spin" size={36} />
        )}
        {playlists.length < 1 && (
          <p className="text">No playlist found</p>
        )}
        {playlists.map((playlist) => (

          <div className="flex-card2" key={playlist._id}>
            <Link to={`${playlist._id}`}>
              <p  className="headline3">{playlist.title}<span>&nbsp;</span></p>
            </Link>
            <p className="text">{trimming(playlist.description)}</p>
          </div>
        ))}
        {error && <div  className="text">Sorry, an error occurred</div>}
      </div>
    </div>
    
    <Outlet/>
    <Footer/>
    </>
  );
  
}
