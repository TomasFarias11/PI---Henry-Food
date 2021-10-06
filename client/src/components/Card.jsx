import React from 'react';

export default function RecipeCard ({name, img, diets, spoonacularScore}) {
    return (
        <div>
            <h3>{name}</h3>
            <h6>{diets && diets.join(", ")}</h6>
            <span>{spoonacularScore}</span>
            <img src={img} alt="img not found" width="200px" height="200px"/>
        </div>
    )
}