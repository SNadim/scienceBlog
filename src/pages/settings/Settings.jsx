import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import { ThemeContext } from '../../context/themeContext';
import './settings.css';

export default function Settings() {
    const { user, dispatch  } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [description,setDescription] = useState(user.description);
    const [success, setSuccess] = useState(false);
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        if(file) {
            const data = new FormData();
            data.append("avatar",file);  
            data.append('username',username);
            data.append('email',email);
            data.append('password',password);
            data.append('desc',description);
            data.append('id',user.id);
            try {
                await axios.post("http://localhost/CRUD/updateprofile.php",data,{
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }).then(res=>{
                    setSuccess(true);
                    const pic = res.data.url.split("/")[6];
                    console.log(pic);
                    const response = {
                        id: user.id,
                        username: username,
                        email: email, 
                        password: password,
                        picture: `userprofile/${pic}`,
                        description:description
                    }
                    dispatch({ type: "UPDATE_SUCCESS", payload: response})
                
                })
            } catch (error) {
                console.log(error);
                dispatch({ type: "UPDATE_FAILURE"});
                
            }
        }
    };

  return (
  <div className='settings'>
      <div className="settingsWrapper">
          <div className="settingsTitle">
              <span className="settingsUpdateTitle">Update Your Account</span>
              <span className="settingsDeleteTitle">Delete</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
              <label>Profile Picture</label>
              <div className="settingsPP">
                  <img 
                  src={file ? URL.createObjectURL(file) : `http://localhost/CRUD/${user.picture}`}
                  alt="" />
                  <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>
                  </label>
                  <input
                   type="file" 
                   id='fileInput' 
                   style={{display:"none"}}
                   onChange={e=>setFile(e.target.files[0])} 
                   />
              </div>
              <label>Username</label>
              <input 
              type="text"
              style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}} 
              placeholder={user.username}
              onChange={e=>setUsername(e.target.value)} 
              />
              <label>Email</label>
              <input 
                type="email"
                style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}} 
                placeholder={user.email}
                onChange={e=>setEmail(e.target.value)} 
                />
              <label>Password</label>
              <input 
                    type="password"
                    style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}}
                    onChange={e=>setPassword(e.target.value)}
                    />
                <label>Description</label>
              <input 
                    type="text"
                    style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}}
                    placeholder={description}
                    onChange={e=>setDescription(e.target.value)}
                    />
              <button className="settingsSubmit" type="submit">Update</button>
              {
                  success && (
                      <span style={{ color:"green", textAlign:"center", marginTop: "20px" }}>
                          Profile has been updated...
                      </span>
                  )
              }
          </form>
      </div>
      <Sidebar/>
  </div>
  );
}
