import './toggle.css';
import Sun from '../../img/sun.png';
import Moon from '../../img/moon.png';
import { useContext } from 'react';
 import { ThemeContext } from '../../context/themeContext'
export default function Toggle() {
  const theme = useContext(ThemeContext);
  const handleClick = ()=>{
    theme.dispatch({type : "TOGGLE"})
  }
  return (
    <div className='toggle'>
        <img src={Sun} alt="" className="toggleIcon" />
        <img src={Moon} alt="" className="toggleIcon" />
        <div className="toggleButton" onClick={handleClick} style={{left:theme.state.darkMode ? 0 : "25px"}}></div>
    </div>
  );
}
