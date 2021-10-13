import axios from 'axios';

export function getRecipes() {
    return async function (dispatch) {
        let recipes = await axios.get("http://localhost:3001/recipes")
        return dispatch({            //las maneras de escribir las acciones asincronicas usando thunk
            type: 'GET_RECIPES',
            payload: recipes.data
        })
    }
}

export function getRecipesByName(name) {
    return async function (dispatch) {
        try {
            let recipesName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: 'GET_RECIPES_BY_NAME',
                payload: recipesName.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getDiets () {
    return async function (dispatch) {
        let diets = await axios.get(`http://localhost:3001/types`)
        return dispatch({
            type: "GET_DIETS",
            payload: diets.data
        })
    }
}

export function getRecipesById (id) {
    return async function (dispatch) {
        let recipesId = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: 'GET_RECIPES_BY_ID',
            payload: recipesId.data
        })
    }
}

export function postRecipe (payload) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/recipe`, payload)
            .then((e) =>  e)
            .catch((err) => {
                console.error(err)
            })
    }
}

export function filterRecipesByDiets (payload) {
    return {
        type: 'FILTER_RECIPES_BY_DIETS',
        payload
    }
}

export function filterRecipesByLetters (payload) {
    return {
        type: 'FILTER_RECIPES_BY_LETTER',
        payload
    }
}

export function filterByPunctuation (payload) {
    return {
        type: 'FILTER_RECIPES_BY_PUNCTUATION',
        payload
    }
}