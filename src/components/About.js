import React from 'react'
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <div>
        <h4>Version 1.0.1</h4>
        <p>This project was a crash course made by Traversy Media</p>
        <a href="https://www.youtube.com/watch?v=w7ejDZ8SWv8" target="_blank" rel="noreferrer">Link to the video</a>
        <br></br>
        <Link to='/'>Go back</Link>
    </div>
    
  )
}

export default About