const {default: axios} = require("axios");
const YOUR_API_KEY = process.env.YOUR_API_KEY;
module.exports = {
    showAll: () => {
        let names = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
            .then(results => results = results.data)
            .then(res => {
                    let foods = [];
                    res.results.forEach(e => foods.push({
                        ID: e.id,
                        name: e.title,
                        summary: e.summary,
                        healthScore: e.healthScore,
                        spoonacularScore: e.spoonacularScore,
                        // steps: e.analyzedInstructions[0],
                    }))
                    return foods;
                })
            .catch(err => console.error(err));
        return names;
    },

    showById: (id) => {
        let name = axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`)
            .then(results => results = results.data)
            .then(res => {
                    let food = [];
                    food.push({
                        ID: res.id,
                        name: res.title,
                        summary: res.summary,
                        healthScore: res.healthScore,
                        spoonacularScore: res.spoonacularScore,
                    })
                    return food;
                })
            .catch(err => console.error(err));
        return name;
    }
}