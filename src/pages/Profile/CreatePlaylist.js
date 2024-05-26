import React, { useEffect, useState } from "react";
import { client } from "../../api";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const CreatePlaylist = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [songIds, setSongIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { token } = useSelector((state) => state.user);

  const fetchSongs = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await client.get("/songs");
      setData(res.data);
      setLoading(false);

      console.log("songs",res.data)
      
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMsg(error)
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleCollect = (id) => {
    const isContains = songIds.includes(id);
    
    if(songIds.length === 0){
        setSongIds([...songIds, id]);
        cheaking(id);

    }else if (!isContains) {
        setSongIds([...songIds, id]);
    }else {
        setSongIds(songIds.filter((songid) => id !== songid));
    }
//    console.log("songIds",songIds)
  };

  const cheaking = (id) => {
    return songIds.includes(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true);
    setError(false);
    try {      
        await client.post("/playlists/create",{
        title,
        description,
        isPrivate,
        songIds
      },{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      }).then((res)=>{
            console.log("songsIds",res.data)
      });
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMsg(error)
    }  
};

  if (error) {
    return (
      <>
        {errorMsg}
        <MdErrorOutline color="inherit" size={32} />
        <p>An error occurred</p>
      </>
    );
  }

  return (
    <>
      <h1 style={{ color: "blue", fontSize: "24px" }}>Playlist Creation</h1>
  
      <h3 style={{ color: "red" }}>Playlist title</h3>
      <input
        value={title}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
  
      <h3 style={{ color: "green" }}>Playlist description</h3>
      <input
        value={description}
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
  
      <h3 style={{ color: "purple" }}>Playlist isPrivate</h3>
      <button onClick={() => setIsPrivate(!isPrivate)}>
        {isPrivate ? <p>true</p> : <p>false</p>}
      </button>
  
      <ul>
        {data.map((song) => (
          <li key={song._id} onClick={() => handleCollect(song._id)}>
            {cheaking(song._id) ? (
              <p>Selected</p>
            ) : (
              <p>
                {song.title} {"  "}
                {song.Artiste}
              </p>
            )}
          </li>
        ))}
      </ul>
  
      <button onClick={handleSubmit}>
        {loading ? <p>loading...</p> : <p>Create Playlist</p>}
      </button>
    </>
  );
};

export default CreatePlaylist;
