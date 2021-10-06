import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../actions/index.js';
import { useDispatch, useSelector} from 'react-redux';


export default function RecipeCreater () {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);

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
            <Link to="/recipes"><button>Back to HomePage</button></Link>
            <h1>Create your own recipe!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value = {input.name} name="name" onChange={handleChange}/>
                </div>
                <div>
                    <label>Summary:</label>
                    <input type="text" value = {input.summary} name="summary" onChange={handleChange}/>
                </div>
                <div>
                    <label>spoonacularScore:</label>
                    <input type="float" value = {input.spoonacularScore} name="spoonacularScore" onChange={handleChange}/>
                </div>
                <div>
                    <label>healthScore:</label>
                    <input type="float" value = {input.healthScore} name="healthScore" onChange={handleChange}/>
                </div>
                <div>
                    <label>steps:</label>
                    <input type="text" value = {input.steps} name="steps" onChange={handleChange}/>
                </div>
                
                <div>
                    <label>
                        {diets.map((e, index) => { return (
                            <div key = {e.name}>
                                <span>{e.name}</span>
                                <input type="checkbox" name = {e.name} value = {index + 1} onChange = {handleCheckBox}/>
                            </div>
                        )})}
                    </label>
                </div>

                <button type="submit">Create recipe</button>
            </form>
        </div>
    )

}