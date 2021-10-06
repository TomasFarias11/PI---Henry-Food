
const initialState = {
    recipes: [],
    allRecipies: [],
    diets: [],
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: state.recipes.concat(action.payload),
                allRecipes: state.allRecipies.concat(action.payload)
            }

        case 'GET_RECIPES_BY_NAME':
            return{
                ...state,
                recipes: action.payload
            }

        case 'GET_RECIPES_BY_ID':
            return {
                ...state,
                recipes: action.payload
            }

        case 'POST_RECIPE':
            return {
                ...state,
                // recipes: state.recipes.concat(action.payload)

            }
        
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }

        case 'FILTER_RECIPES_BY_DIETS':
            const allRecipes = state.allRecipes;  //para no modificar recipes, que es donde tengo TODAS las recetas
            const filterOfDiets = action.payload === 'All' ? allRecipes : allRecipes.filter(r => r.diets.includes(action.payload))
            return {
                ...state,
                recipes: filterOfDiets
            }

        case 'FILTER_RECIPES_BY_LETTER':{
            // const allRecipes = state.allRecipes;
            //                  if(        ↓            ↓    )↓ -------else↓if(                      )                    
            const filterByLetter = action.payload === 'None'  ? state.recipes : action.payload === 'asc' ? 
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;                                       //Se resuelve el if si es true
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
                :           //else
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;                                       
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
                state.recipes = [];
            return {
                ...state,
                recipes:state.recipes.concat(filterByLetter) 
            }
        }

        case 'FILTER_RECIPES_BY_PUNCTUATION':
            // const allRecipes = state.allRecipies;
            const filterByPunctuation = action.payload === 'None'  ? state.recipes : action.payload === 'ascPoint' ?
            state.recipes.sort(function (a, b) {
                if (a.spoonacularScore > b.spoonacularScore) {
                    return 1;                                       //Se resuelve el if si es true
                }
                if (b.spoonacularScore > a.spoonacularScore) {
                    return -1;
                }
                return 0;
            })
            :           //else
            state.recipes.sort(function (a, b) {
                if (a.spoonacularScore > b.spoonacularScore) {
                    return -1;                                       
                }
                if (b.spoonacularScore > a.spoonacularScore) {
                    return 1;
                }
                return 0;
            });
            state.recipes = [];
        return {
            ...state,
            recipes:state.recipes.concat(filterByPunctuation) 
        }
        default:
            return state;
    }
}

export default rootReducer;