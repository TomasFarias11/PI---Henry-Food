import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, filterRecipesByDiets, filterRecipesByLetters, filterByPunctuation, getRecipesById, getRecipesByName} from "../actions/index.js";
import {Link} from "react-router-dom";
import RecipeCard from "./Card.jsx"
import Paged from "./Paging.jsx";
import SearchBar from "./SearchBar";

import Style from './Home.module.css';


export default function Home () {
    const dispatch = useDispatch();       
    const recipes = useSelector((state) => state.recipes)
    const [currentPage, setCurrentPage] = useState(1); 
    const [recipesPerPage, setRecipesPerPage] = useState(9) 

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect (() => {
        dispatch(getRecipes()); 
    }, [])


    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    function handleFilterDiets (e) {
        dispatch(filterRecipesByDiets(e.target.value)) //toma el valor de los value de los select
    }

    function handleFilterRecipesByLetter (e) {
        dispatch(filterRecipesByLetters(e.target.value))
    }

    function handleFilterRecipesByPunctuation (e) {
        dispatch(filterByPunctuation(e.target.value))
    }

    return (
        <div className={Style.styleBackground}>
            <SearchBar/>
            <div className={Style.buttonToCreate}>
                <Link to="/recipe"><button className={Style.buttonCreate}>Create your recipe!</button></Link>
            </div>
            <div className={Style.title}>
                <h1>Food Recipes Main Page!</h1>
            </div>
            <div className={Style.filters}>
                <select className = {Style.dietStyle} onChange={e => handleFilterRecipesByLetter(e)}>
                    <option value = "None">Filter by letter</option>
                    <option value = "asc">Ascendant</option>  
                    <option value = "desc">Descendant</option>
                </select>
                <select className = {Style.dietStyle} onChange={e => handleFilterDiets(e)}>
                    <option value="All">Type of diets</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Foodmap Friendly</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole30</option>
                </select>
                <select className = {Style.dietStyle} onChange = {e => handleFilterRecipesByPunctuation(e)}>
                    <option value = "None">Filter by score</option>
                    <option value = "ascPoint">Ascendant By Punctuation</option>  
                    <option value = "descPoint">Descendant By Punctuation</option>
                </select>
            </div>
            <div>
                <div>
                    <Paged
                    recipesPerPage = {recipesPerPage}
                    recipes = {recipes.length}
                    paged = {paging}
                    />
                </div>
                <div className = {Style.cards}>
                    {currentRecipes?currentRecipes.map((e) => {
                        return (
                            <div key={e.name} className={Style.corrector}>
                                <RecipeCard name={e.name} img={e.img} dietTypes={e.dietTypes} spoonacularScore = {e.spoonacularScore} key={e.ID} id={e.ID}/>
                            </div>
                        )
                    }): <h1>No recipes</h1>}
                </div>
            </div>
        </div>
    )
}