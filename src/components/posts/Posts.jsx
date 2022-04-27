import Post from '../post/Post';
import './posts.css';

export default function Posts({ posts }) {
  return(
  <div className='post'>
    <div className='postComp'>
     {
       posts.slice(0).reverse().map((p)=>(
         <Post key={p.id} post={p}/>
       ))
     }
    </div>
       
  </div>
  );
}
