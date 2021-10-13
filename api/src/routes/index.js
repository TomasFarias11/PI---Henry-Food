const { json } = require('body-parser');
const e = require('express');
const { Router } = require('express');
const {Sequelize} = require('sequelize');

const Op = Sequelize.Op
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {recipe, dietType} = require('../db.js');
const {showAll, showByName, showById} = require('./methods.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.route('/recipes')
    .get(async (req, res) => {
    const {name} = req.query;
    if (name) {
        try {
            let nameFoods = await showByName(name);
            let dbFood = await recipe.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name.charAt(0).toUpperCase() + name.slice(1)}%`
                    }
                }
            })
            if (Array.isArray(nameFoods) && nameFoods.length === 0 && Array.isArray(dbFood) && dbFood.length === 0) return res.status(404).send('No recipes found with that name.');

            res.json([...dbFood, ...nameFoods]);
        }
        catch (err) {
            res.json({ 
                msg: 'Error' + err
            })
        }
    } else {
        try {
            let foods = await showAll(); 
            let dbFood = await recipe.findAll({
                include: {
                    model: dietType
            }}); 
            if (Array.isArray(foods) && foods.length === 0 && Array.isArray(dbFood) && dbFood.length === 0) return res.status(404).send('No recipes found.');
            res.json([...foods, ...dbFood]);
        }
        catch (err) {
            res.json({
                msg: "Error" + err
            })
        }
    }
})

router.route('/recipes/:idRecipie')
    .get(async (req, res) => {
    const {idRecipie} = req.params;
    if (idRecipie) {
        try {
            let idFoods = await showById(idRecipie);
            if (idFoods) return res.json(idFoods);
            let idFoodsDB = await recipe.findByPk(idRecipie, {include: {
                model: dietType
            }});
            if (idFoodsDB) return res.json(idFoodsDB);
            res.status(404).send('No recipe found.');
        }
        catch (err) {
            res.status(404).send(err);
        }
    } else {
        res.status(404).send('No id provided.');
    }
})

router.route('/types')
    .get(async (req, res) => {
        try {
            const diets = await dietType.findAll()
            res.json(diets);
        }
        catch (err) {
            res.status(404).send(err)
        }
    })


router.route('/recipe')
    .post(async (req, res) => {
        const {name, summary, healthScore, spoonacularScore, diet, steps} = req.body; 
        try {
            const diets = await Promise.all(diet.map((e) => dietType.findByPk(e)));
            const [Recipe, created] = await recipe.findOrCreate({
                where: {name, summary, healthScore, spoonacularScore, steps }
            })
            await Recipe.addDietType(diets);
            let recipeAndDiet = await recipe.findByPk(Recipe.ID, {include: {
                model: dietType
            }})
            res.json({created:created, recipeAndDiet});
        }
        catch (err) {
            res.status(404).send(err);
        }
    })


module.exports = router;
