import Post from '../post/Post';
import './posts.css';

export default function Posts({ posts }) {
  return(
  <div className='post'>
    <div className='postComp'>
     {
       posts.slice(0).reverse().map((p)=>(
         <Post post={p}/>
       ))
     }
    </div>
       
  </div>
  );
}
