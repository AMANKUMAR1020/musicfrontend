import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { client } from "../api";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
 import '../pages/style/ArtisteSong.css'

const ArtisteSong = ({ song, handlePlay }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { currentTrack, isPlaying } = useSelector((state) => state.player);

  const { user, token } = useSelector((state) => state.user);
  const isCurrentTrack = currentTrack?._id === song?._id;

  const handleLike = async (id, e) => {
    e.preventDefault();
	const songId = id;
    await client
      .patch(
        "/songs/like",
        {
          songId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        setErrorMsg(e);
      });

    cheacking(id);
  };

  const cheacking = (id) => {
    return song?.likes.includes(id);
  };

  const playSong = () => {
    handlePlay(song);
  };

  return (
    <div className="songlist">
      <img
        className="songlistimg"
        src={song?.coverImage}
        alt={song?.title}
        width="100px"
        height="100px"
      />
      <p className="songlistText">{song?.title}</p>
      <p className="songlistText">{song?.Artiste}</p>
      <p className="songlistText" onClick={(e) => { handleLike(user._id, e) }}>
        {cheacking(user._id) ? <FaHeart /> : <CiHeart />}
      </p>

      {isCurrentTrack && (
        <div className="songlist">
          <p className="songlistText">Playing</p>
        </div>
      )}

      {isCurrentTrack && isPlaying ? null : (
        <div className="songlist">
          <button className="songlistText" onClick={playSong}>
            Play
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtisteSong;
