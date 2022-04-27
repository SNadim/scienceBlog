import './contact.css';
import Phone from '../../img/phone.png'
import Email from '../../img/email.png'
import Address from '../../img/address.png'
// import { useContext, useRef, useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { ThemeContext } from '../../context/themeContext';

export default function Contact() {
  /*
    const formRef = useRef();
    const [done, setDone] = useState(false);
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;
  
    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_ovubota', 'template_3e6qj6s', formRef.current, 'user_kvKw09a0PZoPqqRa8umHt')
        .then((result) => {
            console.log(result.text);
            setDone(true);
        }, (error) => {
            console.log(error.text);
        });

    }
    */

  return (
  <div className='contact'>
      <div className="contactBg"></div>
      <div className="contactWrapper">
          <div className="contactLeft">
              <h1 className="contactTitle">Let's discuss our project</h1>
              <div className="contactInfo">
                  <div className="contactInfoItem">
                      <img src={Phone} alt="" className="contactIcon" />
                      +88-01859703039
                  </div>
                  <div className="contactInfoItem">
                      <img src={Email} alt="" className="contactIcon" />
                      shariarnadim21@gmail.com
                  </div>
                  <div className="contactInfoItem">
                      <img src={Address} alt="" className="contactIcon" />
                      Badda | Dhaka
                  </div>
              </div>
          </div>
          <div className="contactRight">
              <p className="contactDescription">
                  <b>What's your story?</b> Get in touch. Always available for freelancing if the right project comes along me. 
              </p>
              <form>
                  <input type="text" placeholder='Name' name='user_name' />
                  <input type="text" placeholder='Subject' style={{marginLeft:"5px"}} name='user_subject' />
                  <input type="email" placeholder='Email' name='user_email' />
                  <textarea placeholder='Message' name="message" rows="5"></textarea>
                  <button>Submit</button>
              </form>
          </div>
      </div>
  </div>
  );
}
