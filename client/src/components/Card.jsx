import React from 'react';
import {Link} from 'react-router-dom';
import Style from './Card.module.css';

export default function RecipeCard ({name, img, dietTypes, spoonacularScore, id}) {

    return (
        <div className={Style.cards}>
            <div className={Style.box}>
                    <h3>
                        <Link to={`/recipes/${id}`}>
                            {name}
                        </Link>
                    </h3>                   
                    <h6>Diets: {dietTypes && (dietTypes.map((e) => e.name)).join(', ')}</h6>
                    <img src={img} alt="img not found" width="200px" height="200px"/>
                    <span className={Style.score}>Score: {spoonacularScore}</span>
            </div>
        </div>
    )
}