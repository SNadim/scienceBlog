import './header.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Header() {

  const [posts, setPosts] = useState([]);
  const [slider1,setSlider1] = useState('');
  const [slider2,setSlider2] = useState('');
  const [slider3,setSlider3] = useState('');


  useEffect(()=>{
    const fetchPost = async ()=>{
      const url = 'http://localhost/CRUD/blog.php';
      axios.get(url).then(response => response.data)
      .then((data) => {
        setPosts(data);
        let sliderPosts = [];
        data.slice(data.length-3,data.length).reverse().map((p) => sliderPosts.push(p));
        setSlider1(sliderPosts[0].image);
        setSlider2(sliderPosts[1].image);
        setSlider3(sliderPosts[2].image);
      });
    }
    fetchPost();
 
    
  },[]);


  

  return (
  <div className='header'>
      <div className="headerTitles">
        <span className='headerTitleLg'>Daily Science</span>
      </div>

      <Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100 headerImg"
      src={`http://localhost/CRUD/${slider1}`}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 headerImg"
      src={`http://localhost/CRUD/${slider2}`}
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 headerImg"
      src={`http://localhost/CRUD/${slider3}`}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>

      {/* <img className='headerImg' src="https://cdn.wallpapersafari.com/24/17/p2o0TH.jpg" alt="" /> */}





      
  </div>
  );
}
