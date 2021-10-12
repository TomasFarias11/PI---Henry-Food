const {default: axios} = require("axios");
const YOUR_API_KEY = process.env.YOUR_API_KEY;
module.exports = {
    showAll: () => {
        let names = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
            .then(results => results = results.data.results)
            .then(res => {
                    let foods = [];
                    res.forEach(e => foods.push({
                        ID: e.id,
                        name: e.title,
                        summary: e.summary,
                        healthScore: e.healthScore,
                        spoonacularScore: e.spoonacularScore,                                                                                                    
                        steps: (e.analyzedInstructions.length>0 && Array.isArray(e.analyzedInstructions[0].steps))?e.analyzedInstructions[0].steps.map(ele=>`step ${ele.number}: ${ele.step}`) :'No steps found',
                        img: e.image,
                        vegetarian: e.vegetarian,
                        vegan: e.vegan,
                        glutenFree: e.glutenFree,
                        dietTypes:  e.diets.map((e)=>({name: e})),                //e.diets=['hola','hla','vege']==>[{name:'hola'},{name:'hla'},{name:'vege'}]
                        typeFood: e.dishTypes,
                        }
                    )
                )
                    return foods;
                })
            .catch(err => console.log(err));
        return names;
    },
    showByName: (name) => {
        let foodNames = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&titleMatch=${name}`)
            .then(results => results = results.data.results)
            .then(res => {
                let foodByName = [];
                res.forEach(e =>{

                 foodByName.push({
                    ID: e.id,
                    name: e.title,
                    summary: e.summary,
                    healthScore: e.healthScore,
                    spoonacularScore: e.spoonacularScore,
                    steps: (e.analyzedInstructions.length>0 && Array.isArray(e.analyzedInstructions[0].steps))?e.analyzedInstructions[0].steps.map((e,i)=>`step${i+1}: ${e.step}`) :'No steps found',
                    img: e.image,
                    dietTypes: e.diets.map((el)=>({name: el})),
                    typeFood: e.dishTypes,
                })
            })
                return foodByName;
            })
            .catch(err => console.log(err));
        return foodNames;
    },

    showById: (id) => {
        let name = axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`)
            .then(results => results = results.data)
            .then(res => {
                    let food = {
                        ID: res.id,
                        name: res.title,
                        summary: res.summary,
                        healthScore: res.healthScore,
                        spoonacularScore: res.spoonacularScore,
                        steps: (res.analyzedInstructions.length>0 && Array.isArray(res.analyzedInstructions[0].steps))?res.analyzedInstructions[0].steps.map((e,i)=>`step${i+1}: ${e.step}`) :'No steps found',
                        img: res.image,
                        vegetarian: res.vegetarian,
                        vegan: res.vegan,
                        glutenFree: res.glutenFree,
                        dietTypes: res.diets.map((e)=>({name: e})),
                        typeFood: res.dishTypes,
                    }
                    return food;
                })
            .catch(err => null);
        return name;
    },

}