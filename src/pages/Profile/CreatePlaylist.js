import React, { useEffect, useState } from "react";
import { client } from "../../api";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

import { useSelector } from "react-redux";
import '../style/HomePage.css';
import { Outlet } from "react-router-dom";
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

  const { token } = useSelector((state) => state.user);

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
    
    if (songIds.length === 0) {setSongIds([...songIds, id]); cheaking(id);} 
    else if (!isContains) {setSongIds([...songIds, id]);}
    else {setSongIds(songIds.filter((songid) => id !== songid));}
  };

  const cheaking = (id) => {
    return songIds.includes(id);
  };

  const handleSubmit = async (e) => {
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
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMsg(error);
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
    <MyNavbar/>
      <h1 className="headline1">Playlist Creation</h1>
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
        style={{ width: "40%", height: "87px", display:"block" }}
        value={description}
        onChange={(e) => { setDescription(e.target.value); }}
        rows="5"
        cols="6"
      ></textarea>
  
      <h4 className="text">Playlist is Private</h4>
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
  
      <button className="btn-type6" onClick={handleSubmit}>
        {loading ? <p><AiOutlineLoading className="AiOutlineLoading" size={36} /></p> : <p>Create Playlist</p>}
      </button>

    <Outlet/>
    <Footer/>
    </>
  );
};

export default CreatePlaylist;















// import React, { useEffect, useState } from "react";
// import { client } from "../../api";
// import { MdErrorOutline } from "react-icons/md";
// import { AiOutlineLoading } from "react-icons/ai";

// import { useSelector } from "react-redux";
// import '../style/HomePage.css';

// const CreatePlaylist = () => {
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [songIds, setSongIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const { token } = useSelector((state) => state.user);

//   const fetchSongs = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const res = await client.get("/songs");
//       setData(res.data);
//       setLoading(false);

//       console.log("songs", res.data);
      
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error);
//     }
//   };

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const handleCollect = (id) => {
//     const isContains = songIds.includes(id);
    
//     if (songIds.length === 0) {setSongIds([...songIds, id]); cheaking(id);} 
//     else if (!isContains) {setSongIds([...songIds, id]);}
//     else {setSongIds(songIds.filter((songid) => id !== songid));}
//   };

//   const cheaking = (id) => {
//     return songIds.includes(id);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError(false);
//     try {      
//       await client.post("/playlists/create", {
//         title,
//         description,
//         isPrivate,
//         songIds
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       }).then((res) => {
//         console.log("songsIds", res.data);
//       });
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error);
//     }  
//   };

//   if (error) {
//     return (
//       <>
//         {errorMsg}
//         <MdErrorOutline color="inherit" size={32} />
//         <p>An error occurred</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <h1 className="headline1">Playlist Creation</h1>
//       <h3 className="headline2">Playlist title</h3>
//       <input
//         style={{ width: "40%" }}
//         className="input"
//         value={title}
//         type="text"
//         onChange={(e) => { setTitle(e.target.value); }}
//       />

//       <h3 className="headline2">Playlist description</h3>
//       <textarea
//         style={{ width: "40%", height: "87px", display:"block" }}
//         value={description}
//         onChange={(e) => { setDescription(e.target.value); }}
//         rows="5"
//         cols="6"
//       ></textarea>
  
//       <h4 className="text">Playlist is Private</h4>
//       <button className="btn-type7"
//         onClick={() => setIsPrivate(!isPrivate)}>
//         {isPrivate ? <p>true</p> : <p>false</p>}
//       </button>
  
//       <div className="Container"><h3 className="headline3">Songs </h3></div>

//       <ul>
//         {data.map((song) => (
//           <li key={song._id} onClick={() => handleCollect(song._id)}>
//             <p className="text1">
//               {cheaking(song._id) ? (
//                 <s>{song.title}</s>
//               ) : (
//                 <cite>{song.title}</cite>
//               )}
//               {"- by "}
//               {song.Artiste}
//             </p>
//           </li>
//         ))}
//       </ul>
  
//       <button className="btn-type6" onClick={handleSubmit}>
//         {loading ? <p><AiOutlineLoading className="AiOutlineLoading" size={36} /></p> : <p>Create Playlist</p>}
//       </button>
//     </>
//   );
// };

// export default CreatePlaylist;














// import React, { useEffect, useState } from "react";
// import { client } from "../../api";
// import { MdErrorOutline } from "react-icons/md";
// import { useSelector } from "react-redux";
// import '../style/HomePage.css'

// const CreatePlaylist = () => {
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [songIds, setSongIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const { token } = useSelector((state) => state.user);

//   const fetchSongs = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const res = await client.get("/songs");
//       setData(res.data);
//       setLoading(false);

//       console.log("songs",res.data)
      
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error)
//     }
//   };

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const handleCollect = (id) => {
//     const isContains = songIds.includes(id);
    
//     if(songIds.length === 0){
//         setSongIds([...songIds, id]);
//         cheaking(id);

//     }else if (!isContains) {
//         setSongIds([...songIds, id]);
//     }else {
//         setSongIds(songIds.filter((songid) => id !== songid));
//     }
// //    console.log("songIds",songIds)
//   };

//   const cheaking = (id) => {
//     return songIds.includes(id);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setLoading(true);
//     setError(false);
//     try {      
//         await client.post("/playlists/create",{
//         title,
//         description,
//         isPrivate,
//         songIds
//       },{
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type":"application/json"
//         },
//       }).then((res)=>{
//             console.log("songsIds",res.data)
//       });
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error)
//     }  
// };

//   if (error) {
//     return (<>
//       {errorMsg}
//       <MdErrorOutline color="inherit" size={32} />
//       <p>An error occurred</p>
//     </>);
//   }

//   return (
//     <>
//     <div className="Container"></div>

//       <h1 className="headline1">Playlist Creation</h1>
//       <h3 className="headline2">Playlist title</h3>
//       <input
//         style={{width: "20%"}}
//         className="input"
//         value={title}
//         type="text"
//         onChange={(e) => {setTitle(e.target.value);}}
//       />

//       <h3 className="headline2">Playlist description</h3>
//       <textarea style={{width: "279px", height: "87px"}}
//        value={description} onChange={(e) => {
//           setDescription(e.target.value);
//         }} rows="5" cols="6"></textarea>
  
//       <h4 className="text">Playlist is Private</h4>
//       <button style={{display:"flex"}} onClick={() => setIsPrivate(!isPrivate)}>
//         {isPrivate ? <p>true</p> : <p>false</p>}
//       </button>
  
//       <ul>
//         {data.map((song) => (
//           <li key={song._id} onClick={() => handleCollect(song._id)}>
            
//             <p className="text">
//               {cheaking(song._id) ? ({<s>{song.title}</s>{"  - by "}{song.Artiste}}) : (
//               <cite>{song.title}</cite>{"  - by "}{song.Artiste})}
//             </p>
//           </li>
//         ))}
//       </ul>
  
//       <button onClick={handleSubmit}>
//         {loading ? <p>loading...</p> : <p>Create Playlist</p>}
//       </button>
//     </>
//   );
// };

// export default CreatePlaylist;
















// import React, { useEffect, useState } from "react";
// import { client } from "../../api";
// import { MdErrorOutline } from "react-icons/md";
// import { useSelector } from "react-redux";
// import '../style/HomePage.css'

// const CreatePlaylist = () => {
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [songIds, setSongIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const { token } = useSelector((state) => state.user);

//   const fetchSongs = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const res = await client.get("/songs");
//       setData(res.data);
//       setLoading(false);

//       console.log("songs",res.data)
      
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error)
//     }
//   };

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const handleCollect = (id) => {
//     const isContains = songIds.includes(id);
    
//     if(songIds.length === 0){
//         setSongIds([...songIds, id]);
//         cheaking(id);

//     }else if (!isContains) {
//         setSongIds([...songIds, id]);
//     }else {
//         setSongIds(songIds.filter((songid) => id !== songid));
//     }
// //    console.log("songIds",songIds)
//   };

//   const cheaking = (id) => {
//     return songIds.includes(id);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setLoading(true);
//     setError(false);
//     try {      
//         await client.post("/playlists/create",{
//         title,
//         description,
//         isPrivate,
//         songIds
//       },{
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type":"application/json"
//         },
//       }).then((res)=>{
//             console.log("songsIds",res.data)
//       });
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error)
//     }  
// };

//   if (error) {
//     return (
//       <>
//         {errorMsg}
//         <MdErrorOutline color="inherit" size={32} />
//         <p>An error occurred</p>
//       </>
//     );
//   }

//   return (
//     <>
//     <div className="Container"></div>

//       <h1 className="headline1">Playlist Creation</h1>
//       <h3 className="headline2">Playlist title</h3>
//       <input className="input"
//         value={title}
//         type="text"
//         onChange={(e) => {setTitle(e.target.value);}}
//       />

//       <h3 className="headline2">Playlist description</h3>
//       <textarea value={description} onChange={(e) => {
//           setDescription(e.target.value);
//         }} rows="5" cols="6"></textarea>
// //      <textarea
// //        value={description}
// //        type="text"
// //        onChange={(e) => {
// //          setDescription(e.target.value);}}/> 
  
//       <h3 style={{ color: "purple" }}>Playlist isPrivate</h3>
//       <button onClick={() => setIsPrivate(!isPrivate)}>
//         {isPrivate ? <p>true</p> : <p>false</p>}
//       </button>
  
//       <ul>
//         {data.map((song) => (
//           <li key={song._id} onClick={() => handleCollect(song._id)}>
//             {cheaking(song._id) ? (
//               <p>Selected</p>
//             ) : (
//               <p>
//                 {song.title} {"  "}
//                 {song.Artiste}
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
  
//       <button onClick={handleSubmit}>
//         {loading ? <p>loading...</p> : <p>Create Playlist</p>}
//       </button>
//     </>
//   );
// };

// export default CreatePlaylist;



















// import React, { useEffect, useState } from "react";
// import { client } from "../../api";
// import { MdErrorOutline } from "react-icons/md";
// import { useSelector } from "react-redux";

// const CreatePlaylist = () => {
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [songIds, setSongIds] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const { token } = useSelector((state) => state.user);

//   const fetchSongs = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const res = await client.get("/songs");
//       setData(res.data);
//       setLoading(false);

//       console.log("songs",res.data)
      
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error)
//     }
//   };

//   useEffect(() => {
//     fetchSongs();
//   }, []);

//   const handleCollect = (id) => {
//     const isContains = songIds.includes(id);
    
//     if(songIds.length === 0){
//         setSongIds([...songIds, id]);
//         cheaking(id);

//     }else if (!isContains) {
//         setSongIds([...songIds, id]);
//     }else {
//         setSongIds(songIds.filter((songid) => id !== songid));
//     }
// //    console.log("songIds",songIds)
//   };

//   const cheaking = (id) => {
//     return songIds.includes(id);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setLoading(true);
//     setError(false);
//     try {      
//         await client.post("/playlists/create",{
//         title,
//         description,
//         isPrivate,
//         songIds
//       },{
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type":"application/json"
//         },
//       }).then((res)=>{
//             console.log("songsIds",res.data)
//       });
//     } catch (error) {
//       setError(true);
//       setLoading(false);
//       setErrorMsg(error)
//     }  
// };

//   if (error) {
//     return (
//       <>
//         {errorMsg}
//         <MdErrorOutline color="inherit" size={32} />
//         <p>An error occurred</p>
//       </>
//     );
//   }

//   return (
//     <>
//       <h1 style={{ color: "blue", fontSize: "24px" }}>Playlist Creation</h1>
  
//       <h3 style={{ color: "red" }}>Playlist title</h3>
//       <input
//         value={title}
//         type="text"
//         onChange={(e) => {
//           setTitle(e.target.value);
//         }}
//       />
  
//       <h3 style={{ color: "green" }}>Playlist description</h3>
//       <input
//         value={description}
//         type="text"
//         onChange={(e) => {
//           setDescription(e.target.value);
//         }}
//       />
  
//       <h3 style={{ color: "purple" }}>Playlist isPrivate</h3>
//       <button onClick={() => setIsPrivate(!isPrivate)}>
//         {isPrivate ? <p>true</p> : <p>false</p>}
//       </button>
  
//       <ul>
//         {data.map((song) => (
//           <li key={song._id} onClick={() => handleCollect(song._id)}>
//             {cheaking(song._id) ? (
//               <p>Selected</p>
//             ) : (
//               <p>
//                 {song.title} {"  "}
//                 {song.Artiste}
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
  
//       <button onClick={handleSubmit}>
//         {loading ? <p>loading...</p> : <p>Create Playlist</p>}
//       </button>
//     </>
//   );
// };

// export default CreatePlaylist;
