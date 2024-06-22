import React, { useEffect, useState } from "react";
import { client } from "../../api";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

import { useSelector } from "react-redux";
import '../style/HomePage.css';
import { Outlet, useNavigate } from "react-router-dom";
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";

const CreatePlaylist = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [songIds, setSongIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState("");

  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchSongs = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await client.get("/songs");
      setData(res.data);
      setLoading(false);

      console.log("songs", res.data);
      
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMsg(error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleCollect = (id) => {
    const isContains = songIds.includes(id);
    
    if (songIds.length === 0) {
      setSongIds([...songIds, id]);
      cheaking(id);
    } else if (!isContains) {
      setSongIds([...songIds, id]);
    } else {
      setSongIds(songIds.filter((songid) => id !== songid));
    }
  };

  const cheaking = (id) => {
    return songIds.includes(id);
  };

  const handleSubmit = async (e) => {
    const validateFields = () => {
      if (!title || !description || songIds===null ||songIds===undefined) {
        setErrorMsg("All fields are required!");
        return false;
      } else {
        setErrorMsg('');
        return true;
      }
    };
    validateFields();

    e.preventDefault();

    setLoading(true);
    setError(false);
    try {      
      await client.post("/playlists/create", {
        title,
        description,
        isPrivate,
        songIds
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }).then((res) => {
        console.log("songsIds", res.data);
      });
      successMsg(" :) you create playlist successFully")

    } catch (error) {
      setError(true);
      setErrorMsg(error);
    }  
    setLoading(false);
  };

  if (error) {
    return (
      <>
        {errorMsg}
        <MdErrorOutline color="inherit" size={32} />
      </>
    );
  }

  return (
    <>
      <MyNavbar/>
      <h1 className="headline1">Playlist Creation</h1>
      {error && <p className="error">{errorMsg} <MdErrorOutline color="inherit" size={32} /></p>}
      {successMsg && <p className="success">{successMsg}</p>}

      <h3 className="headline2">Playlist title</h3>
      <input
        style={{ width: "40%" }}
        className="input"
        value={title}
        type="text"
        onChange={(e) => { setTitle(e.target.value); }}
      />

      <h3 className="headline2">Playlist description</h3>
      <textarea
        style={{ width: "40%", height: "87px", display:"block",fontSize:'15px',color: "darkslategray" }}
        value={description}
        onChange={(e) => { setDescription(e.target.value); }}
        rows="5"
        cols="6"
      ></textarea>
  
      <h4 className="text" style={{display:'contents'}}>Playlist is Private</h4>
      <button className="btn-type7"
        onClick={() => setIsPrivate(!isPrivate)}>
        {isPrivate ? <p>true</p> : <p>false</p>}
      </button>
  
      <div className="Container"><h3 className="headline3">Songs </h3></div>
      <ul>
        {data.map((song) => (
          <li key={song._id} onClick={() => handleCollect(song._id)}>
            <p className="text1">
              {cheaking(song._id) ? (
                <s>{song.title}</s>
              ) : (
                <cite>{song.title}</cite>
              )}
              {"- by "}
              {song.Artiste}
            </p>
          </li>
        ))}
      </ul>
  
      <button className="btn-type6" onClick={()=>{navigate(-1)}}>Back</button>

      <button className="btn-type6" onClick={handleSubmit}>
        {loading 
        ?
        <p><AiOutlineLoading className="AiOutlineLoading" size={36} /></p>
        : 
        <p>Create Playlist</p>}
      </button>

      <Outlet/>
      <Footer/>
    </>
  );
};

export default CreatePlaylist;