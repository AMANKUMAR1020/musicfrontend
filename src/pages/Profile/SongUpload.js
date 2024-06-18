import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { client } from "../../api/index";
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";

export default function SongUpload() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [progresspercentimg, setProgresspercentimg] = useState(0);
  const [progresspercentsong, setProgresspercentsong] = useState(0);

  const { user, token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmitImg = (e) => {
    e.preventDefault();
    console.log("handleSubmitImg")

    const file = e.target.files[0];
    console.log(file)
    
    if (!file) return;
    const storageRef = ref(storage, `pictures/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercentimg(progress);
      },
      (error) => {
        alert(error);
        setErrorMsg(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCoverImage(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  const handleSubmitSong = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `songs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercentsong(progress);
      },
      (error) => {
        alert(error);
        setErrorMsg(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSongUrl(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title,coverImage,songUrl)

    const saveSong = async () => {
      setLoading(true);
      setError(false);
      try {
        await client.post("songs/create", {
          title,
          coverImage,
          songUrl,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }).then((res) => {
          console.log("created successfully", res.data);
        });
        setLoading(false);
        setTitle("");
        setCoverImage("");
        setSongUrl("");
        navigate(-1);
      } catch (error) {
        setErrorMsg(error.message);
        setError(true);
        setLoading(false);
      }
    };

    saveSong();
  };

  useEffect(() => {
    // handleSubmit();
  }, []);

  return (
    <>
      <MyNavbar/>
        <h1 style={{ color: 'blue', textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>Song Upload</h1>

        {error && errorMsg && <h3 style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</h3>}

        <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song title</h2>
        <input
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
        />

        <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song coverImage</h2>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleSubmitImg}
          style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
        />
        {!coverImage && (<div className="innerbar" style={{ width: `${progresspercentimg}%` }}>{progresspercentimg}%</div>)}
        {coverImage && <img src={coverImage} alt="image" height={70} weight={80} />}

        <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song Url</h2>
        <input
          type="file"
          accept="audio/*"
          onChange={handleSubmitSong}
          style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
        />
        {!songUrl && (<div className="innerbar" style={{ width: `${progresspercentsong}%` }}>{progresspercentsong}%</div>)}
        {songUrl && <audio controls src={songUrl} alt="image" height={70} weight={80}></audio>}

        <button className="btn-type4" onClick={handleSubmit}>Upload Song</button>
        {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      <Outlet />
      <Footer/>
    </>
  );
}















// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { client } from "../../api/index";
// import { storage } from '../../firebase';
// import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

// export default function SongUpload() {
//   const [title, setTitle] = useState("");
//   const [coverImage, setCoverImage] = useState("");
//   const [songUrl, setSongUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [progresspercentimg, setProgresspercentimg] = useState(0);
//   const [progresspercentsong, setProgresspercentsong] = useState(0);

//   const { user, token } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const handleSubmitImg = (e) => {
//     e.preventDefault();
//     console.log("handleSubmitImg")

//     const file = e.target.files[0];
//     console.log(file)
    
//     if (!file) return;
//     const storageRef = ref(storage, `pictures/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgresspercentimg(progress);
//       },
//       (error) => {
//         alert(error);
//         setErrorMsg(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setCoverImage(downloadURL);
//           console.log(downloadURL);
//         });
//       }
//     );
//   };

//   const handleSubmitSong = (e) => {
//     e.preventDefault();

//     const file = e.target.files[0];
//     if (!file) return;
//     const storageRef = ref(storage, `songs/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgresspercentsong(progress);
//       },
//       (error) => {
//         alert(error);
//         setErrorMsg(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setSongUrl(downloadURL);
//           console.log(downloadURL);
//         });
//       }
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(title,coverImage,songUrl)

//     const saveSong = async () => {
//       setLoading(true);
//       setError(false);
//       try {
//         await client.post("songs/create", {
//           title,
//           coverImage,
//           songUrl,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//         }).then((res) => {
//           console.log("created successfully", res.data);
//         });
//         setLoading(false);
//         setTitle("");
//         setCoverImage("");
//         setSongUrl("");
//         navigate(-1);
//       } catch (error) {
//         setErrorMsg(error.message);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     saveSong();
//   };

//   useEffect(() => {
//     // handleSubmit();
//   }, []);

//   return (
//     <>
//       <h1 style={{ color: 'blue', textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>Song Upload</h1>

//       {error && errorMsg && <h3 style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</h3>}

//       <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song title</h2>
//       <input
//         value={title}
//         type="text"
//         onChange={(e) => {
//           setTitle(e.target.value);
//         }}
//         style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
//       />

//       <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song coverImage</h2>
//       <input
//         type="file"
//         accept="image/png, image/jpeg"
//         onChange={handleSubmitImg}
//         style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
//       />
//       {!coverImage && (<div className="innerbar" style={{ width: `${progresspercentimg}%` }}>{progresspercentimg}%</div>)}
//       {coverImage && <img src={coverImage} alt="image" height={70} weight={80} />}

//       <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song Url</h2>
//       <input
//         type="file"
//         accept="audio/*"
//         onChange={handleSubmitSong}
//         style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
//       />
//       {!songUrl && (<div className="innerbar" style={{ width: `${progresspercentsong}%` }}>{progresspercentsong}%</div>)}
//       {songUrl && <audio controls src={songUrl} alt="image" height={70} weight={80}></audio>}

//       <button className="btn-type4" onClick={handleSubmit}>Upload Song</button>
//       {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
//       <Outlet />
//     </>
//   );
// }

















// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { client } from "../../api/index";
// import { storage } from '../../firebase';
// import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';

// export default function SongUpload() {
//   const [title, setTitle] = useState("");
//   const [coverImage, setCoverImage] = useState("");
//   const [songUrl, setSongUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [progresspercentimg, setProgresspercentimg] = useState(0);
//   const [progresspercentsong, setProgresspercentsong] = useState(0);

//   const { user, token } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const handleSubmitImg = (e) => {
//     e.preventDefault();
//     console.log("handleSubmitImg")

//     const file = e.target.files[0];
//     console.log(file)
    
//     if (!file) return;
//     const storageRef = ref(storage, `pictures/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgresspercentimg(progress);
//       },
//       (error) => {
//         alert(error);
//         setErrorMsg(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setCoverImage(downloadURL);
//           console.log(downloadURL);
//         });
//       }
//     );
//   };

//   const handleSubmitSong = (e) => {
//     e.preventDefault();

//     const file = e.target.files[0];
//     if (!file) return;
//     const storageRef = ref(storage, `songs/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setProgresspercentsong(progress);
//       },
//       (error) => {
//         alert(error);
//         setErrorMsg(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setSongUrl(downloadURL);
//           console.log(downloadURL);
//         });
//       }
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(title,coverImage,songUrl)

//     const saveSong = async () => {
//       setLoading(true);
//       setError(false);
//       try {
//         await client.post("songs/create", {
//           title,
//           coverImage,
//           songUrl,
//         }, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//         }).then((res) => {
//           console.log("created successfully", res.data);
//         });
//         setLoading(false);
//         setTitle("");
//         setCoverImage("");
//         setSongUrl("");
//         navigate(-1);
//       } catch (error) {
//         setErrorMsg(error.message);
//         setError(true);
//         setLoading(false);
//       }
//     };

//     saveSong();
//   };

//   useEffect(() => {
//     // handleSubmit();
//   }, []);

//   return (
//     <>
//       <h1 style={{ color: 'blue', textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>Song Upload</h1>

//       {error && errorMsg && <h3 style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</h3>}

//       <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song title</h2>
//       <input
//         value={title}
//         type="text"
//         onChange={(e) => {
//           setTitle(e.target.value);
//         }}
//         style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
//       />

//       <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song coverImage</h2>
//       <input
// //        value={coverImage}
//         type="file"
//         accept="image/png, image/jpeg"
//         onChange={handleSubmitImg}
//         style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
//       />
//       {!coverImage && (<div className="innerbar" style={{ width: `${progresspercentimg}%` }}>{progresspercentimg}%</div>)}
//       {coverImage && <img src={coverImage} alt="image" height={70} weight={80} />}

//       <h2 style={{ color: 'blue', fontSize: '24px', marginBottom: '10px' }}>Song Url</h2>
//       <input
//         type="file"
// //        value={songUrl}
//         accept="audio/*"
//         onChange={handleSubmitSong}
//         style={{ backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px', marginBottom: '10px', width: '100%' }}
//       />
//       {!songUrl && (<div className="innerbar" style={{ width: `${progresspercentsong}%` }}>{progresspercentsong}%</div>)}
//       {songUrl && <audio controls src={songUrl} alt="image" height={70} weight={80}></audio>}

//       <button
//         onClick={handleSubmit}
//         style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '20px', cursor: 'pointer' }}
//       >
//         Upload Song
//       </button>
//       {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
//       <Outlet />
//     </>
//   );
// }

