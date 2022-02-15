import { Link } from 'react-router-dom';
import './post.css'

export default function Post({post}) {
  return (
  <div className='post'>
      {
          
          post.image && (
            <img
            className='postImg'
             src={`http://localhost/CRUD/${post.image}`}
             alt="" />

          )
        
      }
      
        <div className="postInfo">
            <div className="postCats">
                <span className="postCat">{post.tags}</span>
                
            </div>
            <Link to={`/post/${post.id}`} className='link'>
            <span className="postTitle">
                {post.title}
            </span>
            </Link>
            
            <hr />
            <span className="postDate">{new Date(post.date).toDateString()}</span>
        </div>
        <p className='postDesc'>{post.description}</p>
  </div>
  );
}
