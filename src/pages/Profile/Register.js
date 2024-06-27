import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { client } from "../../api/index";
import { loginUser } from "../../redux/slices/userSlice";
import { resetPlayer } from "../../redux/slices/playerSlice";
import { Outlet, useNavigate } from "react-router-dom";
import '../style/Register.css'
//import '../style/HomePage.css'
import MyNavbar from "../MyNavbar";
import Footer from "../Footer";
import { AiOutlineLoading } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import useTitle from "../useTitle";

const RegisterPage = () => {

  useTitle('Signin Page')

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateFields = () => {
    if (username === "" || password === "") {
      setError("All fields are required!");

      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleLogin = async () => {
    if (validateFields()) {
      setLoading(true);
      try {
        const res = await client.post("/users/register", {
          username,
          password,
        });
        dispatch(resetPlayer());
        dispatch(loginUser(res.data));
      
        navigate("/dash");
      } catch (err) {
        setError(err?.response?.data?.message);
      }
      setLoading(false);
    }
  };


  if(loading){
    return (<>
      	<ClipLoader
        color='yellow'
        loading={loading}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "yellow",
          }}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"/>
    </>)
  }

  return (
    <>
    <MyNavbar/>
      <h1 className="headline1">RegisterPage</h1>
      <div className="Container">
        <div className="form-group">
          <label className="headline2">Username:</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="headline2">Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        
          <button className="btn-type-back" onClick={()=>{navigate(-1)}}>Back</button>

          {loading 
          ?
          <p><AiOutlineLoading className="AiOutlineLoading" size={36} /></p>
          : 
          <button className="btn-type1" onClick={handleLogin}>Register</button>}
          
    </div>

    <Outlet/>
    <Footer/>
    </>
  );
};

export default RegisterPage;
