import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, filterRecipesByDiets, filterRecipesByLetters, filterByPunctuation, getRecipesById, getRecipesByName} from "../actions/index.js";
import {Link} from "react-router-dom";
import RecipeCard from "./Card.jsx"
import Paged from "./Paging.jsx";
import SearchBar from "./SearchBar";
import RecipeCreated from "./RecipeCreated.jsx";


export default function Home () {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes)
    const [currentPage, setCurrentPage] = useState(1); //guardamos en un estado local la pagina actual, arranca en uno porque la pagina arranca en la uno
    const [recipesPerPage, setRecipesPerPage] = useState(9) //para setear cuantas recetas quiero por pagina

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect (() => {
        dispatch(getRecipes()); 
    }, [])
    // useEffect se utiliza cuando se crea, actualiza o muere un componente. Dispatch manda las acciones al store.

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
        <div>
            <h1>Food Recipes</h1>
            <div>
                <select onChange={e => handleFilterRecipesByLetter(e)}>
                    <option value = "None">None</option>
                    <option value = "asc">Ascendant</option>  
                    {/* value para saber que debe hacer  */}
                    <option value = "desc">Descendant</option>
                </select>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="All">All</option>
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
                <select onChange = {e => handleFilterRecipesByPunctuation(e)}>
                    <option value = "None">None</option>
                    <option value = "ascPoint">Ascendant By Punctuation</option>  
                    <option value = "descPoint">Descendant By Punctuation</option>
                </select>
                <Paged
                recipesPerPage = {recipesPerPage}
                recipes = {recipes.length}
                paged = {paging}
                />
                <Link to="/recipe"><button>Create your recipe!</button></Link>
                <SearchBar/>
                {currentRecipes?currentRecipes.map((e) => {
                    return (
                    <div key={e.name}>
                        <Link to="/recipes">
                            <RecipeCard name={e.name} img={e.img} diets={e.diets} spoonacularScore = {e.spoonacularScore} key={e.img}/>
                        </Link>
                    </div>
                    )
                }): <h1>No recipes</h1>}
            </div>
        </div>
    )
}