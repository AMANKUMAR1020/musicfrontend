import React, { useEffect, useState } from "react";
import { client } from "../../api";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";
import useTitle from "../useTitle";


const EditPlaylist = () => {

  useTitle('Edit Playlist')

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [songIds, setSongIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState("");


  const { id } = useParams();

  const { token } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const fetchPlaylist = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await client.get(`/playlists/${id}`);

      setTitle(res.data.playlist.title);
      setDescription(res.data.playlist.description);
      setIsPrivate(res.data.playlist.isPrivate);
      setSongIds(res.data.playlist.songs);

    } catch (error) {

      setError(true);
      setErrorMsg(error.message);

    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await client.put(`/playlists/${id}`,{
          title,
          description,
          isPrivate,
          songIds
        },{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      ).then((res)=>{
        console.log(res.data)
      })

      setSuccessMsg(":) you upadated Playlist Suceesfully")

    } catch (error) {

      setError(true);
      setErrorMsg(error.message);

    } finally {
      setLoading(false);
    }
  };

  const fetchSongs = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await client.get('/songs');
      setData(res.data);
      console.log(res.data)
    } catch (error) {
      setError(true);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

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
    if(songIds.length > 0){
        return songIds.includes(id);
    }
    return 0;
  };

  useEffect(() => {
    fetchPlaylist();
    fetchSongs();
  }, []);

  if (error) {
    return (
      <>
        {errorMsg}
        <MdErrorOutline size={32} />
        <p>An error occurred</p>
      </>
    );
  }

  return (
    <>
    <MyNavbar/>
      <h1 className="headline1">Playlist Edit</h1>
      {error && <p className="error">{errorMsg} <MdErrorOutline color="inherit" size={32} /></p>}
      {successMsg && <p className="success">{successMsg}</p>}


      <h3 className="headline3">Playlist title</h3>
      <input
        style={{width:"40%"}}
        className="input"
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <h3 className="headline3">Playlist description</h3>
      <textarea
        style={{ width: "40%", height: "87px", display:"block",fontSize: '18px', color:'darkslategray' }}
        value={description}
        onChange={(e) => { setDescription(e.target.value); }}
        rows="5"
        cols="6"
      ></textarea>

      <h3 className="text">Playlist is Private</h3>
      <button className="btn-type2"
        onClick={() => setIsPrivate(!isPrivate)}>{isPrivate ? <p className="text">true</p> : <p className="text">false</p>}
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

      <button className="btn-type-back" onClick={()=>{navigate(-1)}}> Back</button>
        {loading 
        ?
        <p><AiOutlineLoading className="AiOutlineLoading" size={36} /></p>
        :
        <button className="btn-type10" onClick={handleSubmit}>Edit Playlist</button>
        }

    <Outlet/>
    <Footer/>
    </>
  );
};
export default EditPlaylist;