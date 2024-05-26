import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../api';
import { setUser } from '../../redux/slices/userSlice';


function EditProfile() {
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedImage, setUpdatedImage] = useState(user.image);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const res = await client.put(
        'users/myprofile',
        {
          updatedName,
          updatedImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      );

      console.log(res.data);
      dispatch(setUser(res.data));
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setLoading(false);
  };

  // useEffect(()=>{
    
  // },[dispatch])

  return (
    <>
      <h1 style={{ color: 'blue' }}>EditProfile</h1>
      <h3>{user.username}</h3>
  
      <div>
        <p>Artiste Name</p>
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          style={{ backgroundColor: 'lightgray', padding: '5px' }}
        />
      </div>
  
      <img
        src={user.image}
        alt={user.username}
        width="150px"
        height="150px"
        style={{ borderRadius: '50%' }}
      />
  
      <div>
        <p>Change Image</p>
        <input
          type="text"
          value={updatedImage}
          onChange={(e) => setUpdatedImage(e.target.value)}
          style={{ backgroundColor: 'lightgray', padding: '5px' }}
        />
      </div>
  
      <button
        onClick={handleSubmit}
        style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}
      >
        Submit
      </button>
      {loading ? <p>Loading...</p> : <p></p>}
      {error && <p>{error}</p>}
    </>
  );
  
}

export default EditProfile;
