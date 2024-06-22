import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { client } from "../../api/index";
import { storage } from '../../firebase';
import { AiOutlineLoading } from "react-icons/ai";
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
  const [successMsg, setSuccessMsg] = useState("");
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

    const validateFields = () => {
      if (!title || !coverImage || !songUrl) {
        setError("All fields are required!");
        return false;
      } else {
        setError(null);
        return true;
      }
    };
    validateFields();

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

        setSuccessMsg(" You Upload Song SuccessFully")

        // navigate(-1);
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
        <h1 className="headline1">Song Upload</h1>

        {error && errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className="success">{successMsg}</p>}

        <h2 className="headline2">Song title</h2>
        <input
          className="input"
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          style={{ width: '100%' }}
        />

        <h2 className="headline2">Song coverImage</h2>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleSubmitImg}
        />

        {coverImage ?
        <img src={coverImage} alt={coverImage} height={70} weight={80}/>
        :
        <div className="innerbar" style={{ width: `${progresspercentimg}%` }}>{progresspercentimg}%</div>
        }

        <h2 className="headline2">Song file</h2>
        <input
          type="file"
          accept="audio/*"
          onChange={handleSubmitSong}
          style={{ width: '100%' }}
        />

        {songUrl ? 
        <audio controls src={songUrl} alt="image" height={70} weight={80}></audio> 
        : 
        <div className="innerbar" style={{ width: `${progresspercentsong}%` }}>{progresspercentsong}%</div>
        }

      <button className="btn-type1" onClick={()=>{navigate(-1)}}>Back</button>
        {loading ?
        <p style={{ textAlign: 'center' }}><AiOutlineLoading className="AiOutlineLoading" size={36} /></p>
        :
        <button className="btn-type1" onClick={handleSubmit}>Upload Song</button>
      }

      <Outlet />
      <Footer/>
    </>
  );
}