
const initialState = {
    recipes: [],
    allRecipies: [],
    dietTypes: [],
    recipesById: {}
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_RECIPES':
            state = initialState
            return{
                ...state,
                recipes: state.recipes.concat(action.payload),                                                  //guardo lo mismo para volver a modificarlo
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
                recipesById: action.payload
            }

        case 'POST_RECIPE':
            return {
                ...state,

            }
        
        case 'GET_DIETS':
            return {
                ...state,
                dietTypes: action.payload
            }

        case 'FILTER_RECIPES_BY_DIETS':
            const allRecipes = state.allRecipes;  //para no modificar recipes, que es donde tengo TODAS las recetas

            let filterOfDiets=[]
                for(let i=0;i<allRecipes.length;i++){
                    for(let j=0;j<allRecipes[i].dietTypes.length;j++){
                        
                        if(allRecipes[i].dietTypes[j].name===action.payload){ 
                            filterOfDiets.push(allRecipes[i])
                        }else{
                            continue 
                        }
                    }
                }
                
                if (filterOfDiets.length===0) state.recipes = state.allRecipes
                else state.recipes.length=0 
                
            return {
                ...state,
                recipes: state.recipes.concat(filterOfDiets) 
            }

        case 'FILTER_RECIPES_BY_LETTER':{
                   
            const filterByLetter = action.payload === 'None'  ? state.recipes : action.payload === 'asc' ? 
                state.recipes.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
                : 
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