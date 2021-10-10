import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipesById} from "../actions/index.js";
import {useEffect} from "react";

import Style from "./Details.module.css";


export default function Details ({props}) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getRecipesById(props));
    }, [dispatch])
    console.log(props);
    const recipe = useSelector((state) => state.recipesById)

    return (
        <div>
            {
                recipe ?
                <div>
                    <div>
                        <h1>Name:{recipe.name}</h1>
                    </div>
                    <div>
                        <h3>Summary:{recipe.summary}</h3>
                    </div>
                    <div>
                        <img src={recipe.img} alt="img not found" width="200px" height="200px"/>
                    </div>
                    <div>
                        <p>Dish type:{recipe.dishTypes && recipe.dishTypes.join(", ")}</p>
                    </div>
                    <div>
                        <p>Diets:{recipe.diets && recipe.diets.join(", ")}</p>
                    </div>
                    <div>
                        <p>Score:{recipe.spoonacularScore}</p>
                    </div>
                    <div>
                        <p>Health Score:{recipe.healthScore}</p>
                    </div>
                    <div>
                        <p>Steps:{Array.isArray(recipe.steps) ? recipe.steps.map((e) => <p key={e}>{e}</p>) : <p>{recipe.steps}</p>}</p>
                    </div>
                </div> : <p>Wait for changes</p>
            }
            <div>
                <Link to= '/recipes'>
                    <button>Back to the main page</button>
                </Link>
            </div> 
        </div>
    )

}