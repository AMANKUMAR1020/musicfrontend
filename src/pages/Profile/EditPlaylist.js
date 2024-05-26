import React, { useEffect, useState } from "react";
import { client } from "../../api";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditPlaylist = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [songIds, setSongIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { id } = useParams();

  const { token } = useSelector((state) => state.user);

  const fetchPlaylist = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await client.get(`/playlists/${id}`);

      setTitle(res.data.playlist.title);
      setDescription(res.data.playlist.description);
      setIsPrivate(res.data.playlist.isPrivate);
      setSongIds(res.data.playlist.songs);

      // console.log(res.data)
      // console.log(songIds)
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
      await client.put(
        `/playlists/${id}`,
        {
          title,
          description,
          isPrivate,
          songIds
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      ).then((res)=>{
        console.log(res.data)
      })

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
      <h1 style={{ color: 'blue' }}>Playlist Creation</h1>

      <h3 style={{ color: 'green' }}>Playlist title</h3>
      <input
        value={title}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        style={{ backgroundColor: 'lightgray' }}
      />

      <h3 style={{ color: 'green' }}>Playlist description</h3>
      <input
        value={description}
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        style={{ backgroundColor: 'lightgray' }}
      />

      <h3 style={{ color: 'green' }}>Playlist isPrivate</h3>
      <button
        onClick={() => setIsPrivate(!isPrivate)}
        style={{ backgroundColor: isPrivate ? 'red' : 'green' }}
      >
        {isPrivate ? <p>true</p> : <p>false</p>}
      </button>

      <ul>
        {data.map((song) => (
          <li
            key={song._id}
            onClick={() => handleCollect(song._id)}
            style={{
              cursor: 'pointer',
              backgroundColor: songIds.includes(song._id) ? 'lightblue' : 'white',
            }}
          >
            {song.title} {song.Artiste}
            {songIds.includes(song._id) ? (
              <span>{"  Selected"}</span>
            ) : (
              <span>{"  Not Selected"}</span>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        style={{ backgroundColor: loading ? 'gray' : 'blue', color: 'white' }}
      >
        {loading ? <p>loading...</p> : <p>Edit Playlist</p>}
      </button>
    </>
  );
};
export default EditPlaylist;