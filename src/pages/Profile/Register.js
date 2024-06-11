import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { client } from "../../api/index";
import { loginUser } from "../../redux/slices/userSlice";
import { resetPlayer } from "../../redux/slices/playerSlice";
import { useNavigate } from "react-router-dom";
import '../style/Register.css'

const RegisterPage = () => {
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
        setLoading(false);
        navigate("/dash");
      } catch (err) {
        setError(err?.response?.data?.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className="title">RegisterPage</h1>
      <div className="form-group">
        <label className="label">Username:</label>
        <input
          className="input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Password:</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button className="button" onClick={handleLogin}>
        {loading ? <p>Loading...</p> : <p>Submit</p>}
      </button>
    </>
  );
};

export default RegisterPage;