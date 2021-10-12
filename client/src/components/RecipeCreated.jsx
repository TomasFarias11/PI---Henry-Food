import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../actions/index.js';
import { useDispatch, useSelector} from 'react-redux';

import Style from "./RecipeCreated.module.css";

const validate = (input) =>  {
    let errors = {};
    if (!input.name) {
        errors.name = "Name requiered";
    } else if (!input.summary) {
        errors.summary = "Summary requiered";
    } else if (!input.spoonacularScore || input.spoonacularScore < 0 || input.spoonacularScore > 100) {
        errors.spoonacularScore = "Must be between 0 and 100";
    } else if (!input.healthScore || input.healthScore < 0 || input.healthScore > 100) {
        errors.healthScore = "Must be between 0 and 100";
    } else if (!input.steps) {
        errors.steps = "Steps requiered";
    }

    return errors;
}

export default function RecipeCreater () {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.dietTypes);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        steps: "",
        diet: []
    })

    useEffect(() => {
        dispatch(getDiets());
    }, []);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckBox = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                diet: input.diet.concat(e.target.value)
            })
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postRecipe(input))
        alert("Recipe Created!")
        setInput({
            name: "",
            summary: "",
            spoonacularScore: "",
            healthScore: "",
            steps: "",
            diet: []
        })
        history.push('/recipes')
    }

    return (
        <div>
            <div className={Style.titleRecipeCreated}>
                <h1>Create your own recipe!</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={Style.name}>
                    <label>Name:</label>
                </div>
                    <input type="text" value = {input.name} name="name" onChange={handleChange} className={Style.boxName}/>
                    {errors.name && (
                        <div className={Style.errorName}>
                            <p className="error">{errors.name}</p>
                        </div>
                    )}
                <div>
                    <div className={Style.summary}>
                        <label>Summary:</label>
                    </div>
                    <textarea type="text" value = {input.summary} name="summary" onChange={handleChange} className={Style.boxSummary}/>
                    {errors.summary && (
                        <div className={Style.errorSummary}>
                            <p className="error">{errors.summary}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className={Style.spoonacularScore}>
                        <label>spoonacularScore:</label>
                    </div>
                    <input type="float" value = {input.spoonacularScore} name="spoonacularScore" onChange={handleChange} className={Style.boxSpoonacular}/>
                    {errors.spoonacularScore && (
                        <div className={Style.errorSpoonacular}>
                            <p className="error">{errors.spoonacularScore}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className={Style.healthScore}>
                        <label>healthScore:</label>
                    </div>
                    <input type="float" value = {input.healthScore} name="healthScore" onChange={handleChange} className={Style.boxHealth}/>
                    {errors.healthScore && (
                        <div className={Style.errorHealth}>
                            <p className="error">{errors.healthScore}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div className={Style.steps}>
                        <label>steps:</label>
                    </div>
                    <textarea type="text" value = {input.steps} name="steps" onChange={handleChange} className={Style.boxSteps}/>
                    {errors.steps && (
                        <div className = {Style.errorSteps}>
                            <p className="error">{errors.steps}</p>
                        </div>
                    )}
                </div>
                
                <div className={Style.boxDiets}>
                    <label>
                        {diets.map((e, index) => { 
                            return (
                            <div key = {e.name}>
                                <span>{e.name}</span>
                                <input type="checkbox" name = {e.name} value = {index + 1} onChange = {handleCheckBox}/>
                            </div>
                        )})}
                    </label>
                </div>

                <button type="submit" className={Style.buttonCreater}>Create recipe</button>
            </form>
            <div >
                <Link to="/recipes"><button className={Style.buttonHomePage}>Back to HomePage</button></Link>
            </div>
        </div>
    )

}