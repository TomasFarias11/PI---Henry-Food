import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getRecipesByName} from '../actions/index.js';
import Style from './SearchBar.module.css';
 
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
        <div className={Style.divClass}>
            <form>
                <input className={Style.searchStyle} type='text' name="recipes" placeholder="Search recipe" onChange = {(e) => handleInputChange(e)}/>
                <input className={Style.buttonStyle} type="submit" onClick={(e) => handleSubmit(e)}/>
            </form>
            

        </div>
    )
}