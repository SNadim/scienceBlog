import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import{BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";
import Toggle from "./components/toggle/Toggle";
import { ThemeContext } from './context/themeContext';

function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const { user } = useContext(Context);
  return (
    <Router>
      <div style={{backgroundColor:darkMode ? "#222" : "white", color: darkMode ? 'white' : "black"}}>
      <TopBar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={user ? <Home/> : <Register />} />
        <Route exact path="/login" element={user ? <Home/> : <Login />} />
        <Route exact path="/write" element={user ? <Write /> : <Register/>} />
        <Route exact path="/settings" element={user ? <Settings /> : <Register />} />
        <Route exact path="/post/:postId" element={<Single />} />
      </Routes>
      </div>
    </Router>
  
  );
}

export default App;
