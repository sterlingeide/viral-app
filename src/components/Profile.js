import './NavigationBar.css';
import './Profile.css';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { useEffect, useState, useRef } from "react";
import { Image } from 'cloudinary-react';
import CountyOptions from './CountyOptions';
const { REACT_APP_SERVER_URL } = process.env;

let countyData = [];

const Profile = (props) => {
  const { handleLogout, handleProfileUpdateLogout, user } = props;
  console.log(user);
  const { id, name, email, exp, county, state } = user;
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();
  let file = {};
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [imageIds, setImageIds] = useState();
  const [userEmail, setUserEmail] = useState('');
  const firstRenderRef = useRef(true);
  const [newName, setName] = useState(user.name);
  const [newEmail, setEmail] = useState(user.email);
  const [newState, setState] = useState(user.state);
  const [newCounty, setCounty] = useState(user.county);
  const [display, setDisplay] = useState();



  // make a condition that compares exp and current time
  if (currentTime >= expirationTime) {
    handleLogout();
    window.location.href = '/login';
  }

  //Gets the cloudinary publicURL and add to state
  const loadImage = async () => {
    try {
      console.log('email', email);
      const res = await fetch(`${REACT_APP_SERVER_URL}/users/photo/${email}`);
      const data = await res.json();
      console.log('Test String', data);
      setImageIds(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  //loads the function only once
  useEffect(() => {
    console.log('render', firstRenderRef.current)
    if (firstRenderRef.current) {
      firstRenderRef.current = false

    } else {
      loadImage();
      axios.get(`${REACT_APP_SERVER_URL}/countyData/counties`)
        .then((response) => {
          countyData = response.data.countyNameArr;
          console.log('COUNTY DATA', countyData);

          setDisplay(countyData.map((c, idx) => {
            return (
              <CountyOptions
                key={idx}
                name={c}
              />
            )
          }))

        })
        .catch((error) => {
          console.log('ERROR COUNTY DATA', error);
        })
    }
    console.log('USER', user);

    //useEffects depends on props. when it changes, useEffects reruns
  }, [props])

  //Grabs the file and runs previewFile function
  const handleChange = (event) => {
    file = event.target.files[0];
    console.log('running', file);
    previewFile(file);
  }

  //translates the image file to a readable URL/string and set to state
  const previewFile = (file) => {
    const reader = new FileReader();
    //converts image to URL
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
    console.log("preview source", previewSource);
  }

  //Reaches out to backend passing the data URI
  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)

    try {
      await fetch(`${REACT_APP_SERVER_URL}/users/photo`, {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage, userId: id }),
        headers: { 'Content-type': 'application/json' }
      })
    }
    catch (error) {
      console.log(error);
    }

  }

  // if no image string, end. if there is, call uploadImage
  const handleSubmit = (event) => {
    console.log('submitting')
    event.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
    setTimeout(() => { window.location.reload(false) }, 3000);
  }


  const handleInfoSubmit = (event) => {

    const data = {
      user: user,
      newName: newName,
      newEmail: newEmail,
      newState: newState,
      newCounty: newCounty
    }
    axios
      .post(`${REACT_APP_SERVER_URL}/users/update`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log("===> Error in Profile Update", error));
    handleProfileUpdateLogout();
  }

  const handleName = (e) => {
    setName(
      e.target.value,
    );
  }
  const handleEmail = (e) => {
    setEmail(
      e.target.value,
    );
  }
  const handleState = (e) => {
    setState(
      e.target.value,
    );
  }
  const handleCounty = (e) => {
    setCounty(
      e.target.value,
    );
  }


  const userData = user ?
    (<div className="profile-container">
      <div className="profile-data-container">
        <div>
          <h1 >Profile</h1>
        </div>
        <div>
          <div className="user-content">
              <p>
                Name: {name}
                </p><p>
                Email: {email}
                  </p><p>
              County: {county}
                    </p>  
                    <br />
            </div>
               
               <div className='update-user-content'>

                  <input className='profile-field' value={newName} defaultValue={newName} onChange={handleName.bind(this)} type="text" name="name" placeholder="Name" /><br />
                  <input className='profile-field' value={newEmail} defaultValue={newEmail} onChange={handleEmail.bind(this)} type="text" name="email" placeholder="email" /><br />

                  <select className='profile-field'
                    value={newCounty}
                    defaultValue={newCounty}
                    onChange={handleCounty.bind(this)}
                    name="county">
                    <option value="test" >Choose New County</option>
                    {display}
                  </select><br /><br />

                {/* Update with new submissions: */}

                  <form onSubmit={handleInfoSubmit} >
                    <button type="submit" >Update Profile</button>
                  </form>
                      </div>

                  </div>
                </div>

            <div className='vacc-photo-container'>
              <div className='vacc-photo-sub-container'>
                <div className='vacc-photo'>

                Current Vaccination Card :
                {imageIds && imageIds.map((imageId, index) => (
                  <Image
                  key={index}
                  cloudName="djtd4wqoc"
                  publicId={imageId}
                  width="500"
                  crop="scale"
                  />
                  ))}
                  </div>

              Change Vaccination Card Photo :
              <br />
              <br />
              <form onSubmit={handleSubmit} >
                <input onChange={handleChange} name="image" value={fileInputState} type='file' />

                <button type="submit" >Submit</button>
              </form>
              <br />
              {previewSource && (
                <img src={previewSource} style={{ height: '200px', width: '300px' }} />
                )}

            </div>

    </div>

    </div>) : <h2>Loading...</h2>

  const errorDiv = () => {
    return (
      <div>
        <h3>Please <Link to="/login">login</Link> to view this page</h3>
      </div>
    );
  };

  return (
    <div>
      {user ? userData : errorDiv()}
    </div>
  );

}

export default Profile;