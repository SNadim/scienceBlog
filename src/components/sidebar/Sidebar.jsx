import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { Context } from '../../context/Context';
import { ThemeContext } from '../../context/themeContext';
import './sidebar.css';

export default function Sidebar() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
    const { user } = useContext(Context);

    const [cats, setCats] = useState([]);
    useEffect(()=>{
        const url = 'http://localhost/CRUD/tbl_cat.php';
        axios.get(url).then(response => response.data)
        .then((data) => {
            setCats(data);
        })
        
    },[])
  return (
  <div className='sidebar' style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}}>
      {
          user && (
            <div className="sidebarItem">

            <div className="sidebarTitle" style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}}>ABOUT ME</div>
            <img
             src={`http://localhost/CRUD/${user.picture}`}
              alt="" />
            <p>{user.description}</p>
        </div>

          )
              
      }
     
      <div className="sidebarItem">
          <span className='sidebarTitle'>CATEGORIES</span>
          <ul className="sidebarList">
              {
                  cats.map(c=>(
                    <li className="sidebarListItem"><Link to={`/?cat_id=${c.id}`} className='link'>{c.name}</Link></li>
                  ))
              }
          </ul>
        
      </div>
      <div className="sidebarItem">
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram"></i>
        </div>
      </div>
  </div>
  );
}
