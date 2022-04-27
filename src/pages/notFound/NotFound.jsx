import React from 'react'
import './notFound.css';

export default function NotFound() {
  return (
    <div> 
        <div
         className='container' >
            <h2>Oops! page not found..</h2>
            <h1 > 404</h1>
            <p> we can not find the page you are looking for</p> 
            <a href='/'>GO TO HOME</a>
        </div>
      </div>
  )
}