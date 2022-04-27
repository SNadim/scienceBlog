import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { useState } from "react/cjs/react.development";
import axios from "axios";
import SearchBar from '../searchbar/SearchBar';
import Toggle from './../toggle/Toggle'
import { ThemeContext } from "../../context/themeContext";

export default function TopBar() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { user, dispatch } = useContext(Context);
  const [JSONDATA, setJSONDATA]=useState([]);

  useEffect(()=>{
    const fetchPost = async ()=>{
      const url = 'http://localhost/CRUD/blog.php';
      axios.get(url).then(response => response.data)
      .then((data) => {
        setJSONDATA(data);
      })
    }
    fetchPost();
  },[])

  const handleLogout = ()=>{
    dispatch({ type:"LOGOUT" })
  }
  return (
  <div className='top' style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}}>
      <div className="topLeft">
      <i className="topIcon fab fa-facebook-square"></i>
      <i className="topIcon fab fa-twitter-square"></i>
      <i className="topIcon fab fa-pinterest-square"></i>
      <i className="topIcon fab fa-instagram"></i>
      </div>
      <div className="topCenter">
          <ul className="topList">
              <li className="topListItem">
                  <Link className="link" to="/" >HOME</Link>
              </li>
              <li className="topListItem">
              <Link className="link" to="/about" >ABOUT</Link>
              </li>
              <li className="topListItem">
              <Link className="link" to="/contact" >CONTACT</Link>
              </li>
              <li className="topListItem">
              <Link className="link" to="/write" >WRITE</Link>
              </li>
              <li className="topListItem" onClick={handleLogout}>
              {user && "LOGOUT"}
              </li>

          </ul>
      </div>
      <div className="topRight">
          {
              user ? (
                <Link to="/settings">
                <img
                className="topImg"
                src={`http://localhost/CRUD/${user.picture}`} alt="" />
                </Link>

              ) : (
                  <ul className="topList">
                      <li className="topListItem">
                        <Link className="link" to="/login" >LOGIN</Link>
                      </li>
                
                      <li className="topListItem">
                        <Link className="link" to="/register" >REGISTER</Link>
                      </li>
                </ul>
              )
          }
          <div className="search"> 
            <SearchBar placeholder="Enter title..." data={JSONDATA}/>
            <Toggle />
          </div>
      </div>

      
      
  </div>
  );
}
