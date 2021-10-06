import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getRecipesByName} from '../actions/index.js';


export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipesByName(name))
    }

    return (
        <div>
            <form>
                <input type='text' name="recipes" placeholder="Search recipe" onChange = {(e) => handleInputChange(e)}/>
                <input type="submit" onClick={(e) => handleSubmit(e)}/>
            </form>
            

        </div>
    )
}