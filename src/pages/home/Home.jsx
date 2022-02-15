import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  useEffect(()=>{
    const fetchPost = async ()=>{
      const url = 'http://localhost/CRUD/blog.php'+search;
      axios.get(url).then(response => response.data)
      .then((data) => {
        setPosts(data);
      })
    }
    fetchPost();
  },[search])
  return (
    <>
    <Header/>
    <div className="home">
      <Posts posts={posts}/>
      <Sidebar/>
    </div>
  </>
  );
}
