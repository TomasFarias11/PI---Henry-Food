import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar.jsx'

export default function LandingPage () {
    return (
        <div>
            <h1>Welcome to my Recipe Food Page!</h1>
            <Link to = "/recipes">
                <button>Log into the main page</button>
            </Link>
        </div>
    )
}