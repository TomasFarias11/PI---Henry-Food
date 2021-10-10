import React from 'react';
import {Link} from 'react-router-dom';
import Style from './Card.module.css';

export default function RecipeCard ({name, img, diets, spoonacularScore, id}) {
    console.log(id);
    return (
        <div className={Style.box}>
            <h3>
                <Link to={`/recipes/${id}`}>
                    {name}
                </Link>
            </h3>
            <h6>{diets && diets.join(", ")}</h6>
            <span>{spoonacularScore}</span>
            <img src={img} alt="img not found" width="200px" height="200px"/>
        </div>
    )
}