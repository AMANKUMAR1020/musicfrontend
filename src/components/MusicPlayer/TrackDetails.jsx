import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../api";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./music.css";


const TrackDetails = ({ track }) => {
  const { user, token } = useSelector((state) => state.user);
  const [like, setLike] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      await client.patch(
        `/songs/${track._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Your favorites have been updated");
      setLike(!like);

    } catch (error) {
      console.log("An error occurred");
    }
  };

  const checking = () => {
    const result = track.likes.find((id) => id === user._id);
    return result || like;
  };

  return (
    <div className="music_title">
      <img
        src={track.coverImage}
        alt={track.title}
        width="100px"
        height="100px"
      />

      <p
        style={{ height: "20px", width: "20px" }}
        className="like"
        onClick={(e) => {
          handleLike(e);
        }}
      >
        {checking() ? <FaHeart /> : <CiHeart />}
      </p>

      <p className="music-text">{track.title}</p><span>&nbsp;&nbsp;&nbsp;</span>
      <p className="music-text">{track.Artiste}</p>
    </div>
  );
};

export default TrackDetails;















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { client } from "../../api";
// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import "./music.css";

// const TrackDetails = ({ track }) => {
//   const { user, token } = useSelector((state) => state.user);
//   const [like, setLike] = useState(false);

//   const handleLike = async (e) => {
//     e.preventDefault();

//     try {
//       await client.patch(
//         `/songs/${track._id}`,
//         null,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Your favorites have been updated");
//       setLike(!like);
//     } catch (error) {
//       console.log("An error occurred");
//     }
//   };

//   const checking = () => {
//     const result = track.likes.find((id) => id === user._id);
//     return result || like;
//   };

//   return (
//     <div className="music_title">
//       <img
//         src={track.coverImage}
//         alt={track.title}
//         width="100px"
//         height="100px"
//       />

//       <p
//         style={{ height: "20px", width: "20px" }}
//         className="like"
//         onClick={(e) => {
//           handleLike(e);
//         }}
//       >
//         {checking() ? <FaHeart /> : <CiHeart />}
//       </p>

//       <p className="text">{track.title}</p>
//       <p className="text">{track.Artiste}</p>
//     </div>
//   );
// };

// export default TrackDetails;

















// import { useDispatch, useSelector } from "react-redux";
// import { client } from "../../api";
// import { setUser } from '../../redux/slices/userSlice';
// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import "./music.css";

// import React, { useEffect, useState } from "react";

// const TrackDetails = ({ track }) => {

//   const dispatch = useDispatch();
//   const {user,token} = useSelector((state) => state.user);

//   const [like,setLike] = useState(false);

//   // console.log("track", track);
//   // console.log("user",user);

//   const handleLike = async (e) => {
//     e.preventDefault();

//     await client
//       .patch(`/songs/${track._id}`, null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
// //        dispatch(setUser(res.data));
//         console.log("Your favorites have been updated");
//         console.log(res)
//         setLike( !like )
//       })
//       .catch(() => {
//         console.log("An error occurred");
//       });
//   };

//   const checking = () => {
//     const result = track.likes.find((id) => id === user._id);
//  //   console.log(result)
//     return result;
//   };

//   return (
//     <div className="music_title">
//       <img
//         src={track.coverImage}
//         alt={track.title}
//         width="100px"
//         height="100px"
//       />

//       <p style={{ height: "20px", width: "20px" }}
//         className="like" onClick={(e) => {handleLike(e);}}>
//           {{checking() || like} ? <FaHeart /> : <CiHeart />}
//       </p>

//       <p className="text">{track?.title}</p>
//       <p className="text">{track?.Artiste}</p>
//     </div>
//   );
// };

// export default TrackDetails;














// import { useDispatch, useSelector } from "react-redux";
// import { client } from "../../api";

// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import "./music.css";

// const TrackDetails = ({ track }) => {

//   const dispatch = useDispatch();
//   const { setUser } = useSelector((state) => state.user);
//   const { user, token } = useSelector((state) => state.user);
  
//   console.log("track",track)

//   const handleLike = async (e) => {
//     e.preventDefault();

//     await client.patch(`/songs/${track._id}`,null, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         dispatch(setUser(res.data));
//         console.log("Your favorites have been updated");
//       })
//       .catch(() => {
//         console.log("An error occurred");
//       });
//     checking();
//   };

//   const checking = () => {return track.likes.find((id) => id === user._id);};

//   return (
//     <div className="music_title">
//       <img src={track.coverImage} alt={track.title}
//         width="100px"
//         height="100px"/>

//       <p style={{ height: "20px", width: "20px" }}  className="like"  onClick={(e) => {handleLike(e);}}>
//         {checking() ? <FaHeart /> : <CiHeart />}
//       </p>
	  
//       <p className="text">{track?.title}{'\n'}</p>
//       <p className="text">{track?.Artiste}</p>
//     </div>
//   );
// };

// export default TrackDetails;

















// import "./music.css"
// const TrackDetails = ({ track }) => {
// 	return (
// 		<div class="title">
// 			<img src={track?.coverImage} alt={track?.title}	width="100px" height="100px" />
// 			<p class="text">{track?.title}</p>
// 			<p class="text">{track?.Artiste}</p>
// 		</div>
// 	);
// };

// export default TrackDetails;

