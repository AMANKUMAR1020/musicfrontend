import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { client } from "../api";
import { Link } from "react-router-dom";
import './style/PlaylistPage.css'

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    if (desc.length > 15) {
      return desc.substr(0, 15) + "...";
    }
    return desc;
  };

  return (
    <div>
      <h1 className="headTag">Playlists</h1>
      <p className="paraTag">Discover new Playlists</p>
      <div className="container">
        {loading && playlists.length < 1 && (
          <AiOutlineLoading className="spin" size={36} />
        )}
        {playlists.length < 1 && (
          <p className="paraTag">No playlist found</p>
        )}
        {playlists.map((playlist) => (
          <div className="divdiv" key={playlist._id}>
            <Link to={`${playlist._id}`}>
              <p className="divpara">{playlist.title}</p>
            </Link>
            <p className="divpara">{trimming(playlist.description)}</p>
          </div>
        ))}
        {error && <div className="divdiv">Sorry, an error occurred</div>}
      </div>
    </div>
  );
  
}