import axios from 'axios';
import React, {useState, useRef, useContext, useEffect} from 'react';
import './write.css';
import { Context } from '../../context/Context';
import { ThemeContext } from '../../context/themeContext';

export default function Write() {

    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState("");
    const [catId, setCatId] = useState(0);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);


    useEffect(()=>{
        const url = 'http://localhost/CRUD/tbl_cat.php';
        axios.get(url).then(response => response.data)
        .then((data) => {
            setCats(data);
        })
        
    },[]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(file) {
            const data = new FormData();
            data.append("avatar",file);  
            data.append('title',title);
            data.append('desc',desc);
            data.append('author',user.username);
            data.append('cat',cat);
            data.append('catId',catId);
            try {
                await axios.post("http://localhost/CRUD/upload.php",data,{
                    headers:{
                        'content-type': 'multipart/form-data'
                    }
                }).then(res=>{console.log(data.get('title'),data.get('desc'),data.get('author'),data.get('cat'),data.get('catId'));/*window.location.replace("/");*/})
            } catch (error) {
                console.log(error);
                
            }
        }
    }


    function index(cat) {
       for(let i = 0; i< cats.length;i++) {
           if(cats[i].name === cat) {
               return parseInt(cats[i].id);
           }
       }
       return 0;
    }
  return (
  <div className='write'>
      {
          file && (
              <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
          )
      }
      <form className='writeForm' onSubmit={handleSubmit}>
          <div className="writeFormGroup">
              <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
              </label>
              <input
               type="file"
                id='fileInput'
                 style={{display:'none'}}
                 onChange={(e)=>setFile(e.target.files[0])}/>

              <input
              style={{backgroundColor: darkMode && "#333"}}
               type="text"
               spellCheck={true}
               placeholder='Title'
               className='writeInput'
               autoFocus={true}
               onChange={e=>setTitle(e.target.value)}/>
          </div>

          <div className="writeFormGroup">
              <textarea 
              style={{backgroundColor: darkMode && "#333"}}
              spellCheck={true}
             placeholder='Tell your story...'
              type="text"
               className='writeInput writeText'
                onChange={e=>setDesc(e.target.value)}>
                </textarea>

          </div>
         
          <div className="tags">
            <div className="select">
                <select onChange={e=>{setCat(e.target.value);setCatId(index(e.target.value))}}>
                 <option disabled>Select your Category</option>
                {
                  cats.map(c=>(
                    <option value={c.name}>{c.name}</option>
                    
                  ))
                }   
                </select>
            </div>

          </div>
          <button className="writeSubmit" type='submit'>Publish</button>
      </form>
  </div>
  );
  }

