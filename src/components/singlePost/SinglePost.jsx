import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRef, useState } from 'react/cjs/react.development';
import { Context } from '../../context/Context';
import './singlePost.css';

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost/CRUD/blog.php?id=' + path)
            .then(response => response.data)
            .then((data) => {
                setPost(data[0]);
                setTitle(data[0].title);
                setDesc(data[0].description);
            })

  },[path])

  const handleDelete = async ()=>{
    let formData = new FormData();
        formData.append('image', post.image);
    if(window.confirm("Are you sure want to delete?")) {
      await axios({
          method: 'post',
          url: 'http://localhost/CRUD/blog.php?delete=' + path,
          data: formData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
      .then((response)=>{
          if(response.status === 200) {
            window.location.replace("/");
          }
      })
      .catch((error)=>{
          console.log(error);
      })
  }
  }

  const handleUpdate = async (e)=>{
    e.preventDefault();
    let formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
      await axios({
            method: 'post',
            url: 'http://localhost/CRUD/blog.php/?update=' + path,
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                //handle success
                if (response.status === 200){
                  setUpdateMode(false);
                }
                   
            })
            .catch((error) => {
                //handle error
                console.log(error);
            })


  }

  return( 
  <div className='singlePost'>
      <div className="singlePostWrapper">
        {
          post.image &&
        
          <img src={`http://localhost/CRUD/${post.image}`}
           alt="" className="singlePostImg" />
        }
        {
          updateMode ? <input
           type="text"
           value={title} 
           className='singlePostTitleInput'
           autoFocus
           onChange={(e)=>setTitle(e.target.value)}
           /> : (

          
          <h1 className="singlePostTitle">
              {title}
              {post.author === user?.username &&(
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
              )}
              </h1>
          )}
              <div className="singlePostInfo">
                  <span className='singlePostAuthor'>
                    Author:
                    <Link to={`/?user=${post.author}`} className='link'>
                      <b>{post.author}</b>
                    </Link>
                  </span>
                  <span className='singlePostAuthor'>{new Date(post.date).toDateString()}</span>
              </div>
              {
                updateMode ? <textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/> : (
              <p className='singlePostDesc'>
                {desc}
              </p>
              )}
              {
                updateMode && (
              <button className="singlePostButton" onClick={handleUpdate}>Update</button>
              )}
      </div>
  </div>
  );
}
