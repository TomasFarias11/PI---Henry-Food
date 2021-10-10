import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar.jsx'
import Editor from './LandingPage.module.css'
import Video from '../resources/Mi película.mp4';



export default function LandingPage () {
    return (
        <div>
            <video id="Mi película.mp4" controls>
                <source src={Video} type='video/mp4'/>
                {/* <source src={Video} type="video/ogg"/> */}
                Your browser does not support the video tag.
            </video>
            <h1>Welcome to my Recipe Food Page!</h1>
            <Link to = "/recipes">
                <button className={Editor.button}>Log into the main page</button>
            </Link>
        </div>
    )
}