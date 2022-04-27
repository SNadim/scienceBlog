import './login.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react/cjs/react.development';
import { Context } from '../../context/Context';
import { useContext } from 'react';
import axios from 'axios';

export default function Login() {


 const userRef = useRef();
 const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e)=>{
    e.preventDefault();
   dispatch({ type:"LOGIN_START" });
    try {
      let formData = new FormData();
      formData.append('username',userRef.current.value)
      formData.append('password',passwordRef.current.value)
      await axios({
        method: 'post',
        url:'http://localhost/CRUD/tbl_user.php?username=' + userRef.current.value,
        data:formData,
        config: {headers: {'Content-Type':'multipart/form-data'}}
    })
    .then((response)=>{
        //handle success
        console.log(response.data);
        dispatch({ type:"LOGIN_SUCCESS", payload: response.data})
        
    })
    .catch((error)=>{
        //handle error
        dispatch({ type:"LOGIN_FAILURE" })
    })
      
    } catch (err) {
      console.log(err)
      
    }
  }
  return (
  <div className='login'>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
           type="text"
           className='loginInput' 
           placeholder='Enter your username...'
           ref={userRef}
           />
          <label>Password</label>
          <input
            type="password" 
            className='loginInput' 
            placeholder='Enter you password...' 
            ref={passwordRef}
            />
          <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className='link' to="/register">Register</Link>
      </button>
  </div>
  );
}
