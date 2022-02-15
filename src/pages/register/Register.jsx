import './register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (event)=>{
    event.preventDefault();
    setError(false);
  try{
        let formData = new FormData();
        formData.append('username',username)
        formData.append('email',email)
        formData.append('password',password)
        formData.append("picture","userprofile/user.webp");
        formData.append("description","Hello I am a new user here!!");
        axios({
            method: 'post',
            url:'http://localhost/CRUD/tbl_user.php',
            data:formData,
            config: {headers: {'Content-Type':'multipart/form-data'}}
        })
        .then((response)=>{
            //handle success
            window.location.replace("/login");
            
        })
        .catch((error)=>{
            //handle error
            console.log(error);
        })


  } catch(err){
    setError(true);
  }
    
  }

  return (
    <div className='register'>
    <span className="registerTitle">Register</span>
    <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className='registerInput'
          placeholder='Enter you username...'
          onChange={e=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
         type="email"
          className='registerInput'
           placeholder='Enter you email...'
           onChange={e=>setEmail(e.target.value)}
            />
        <label>Password</label>
        <input
         type="password"
          className='registerInput'
           placeholder='Enter you password...'
           onChange={e=>setPassword(e.target.value)}
            />
        <button className="registerButton" type='submit'>Register</button>
    </form>
    <button className="registerLoginButton">
    <Link className='link' to="/login">Login</Link>
    </button>
    {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong</span>}
</div>
  );
}
