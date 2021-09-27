const { json } = require('body-parser');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {recipe} = require('../db.js');
const {showAll} = require('./methods.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.route('/recipes')
    .get(async (req, res) => {
    const {name} = req.query;
        try {
            let foods = await showAll();
            let nameFoods = await foods.filter(e => e.name.includes(name.charAt(0).toUpperCase() + name.slice(1)));
            res.json(nameFoods);
        }
        catch (err) {
            res.status(400).send('No recipies found.')
        }
    })

router.route('/recipes/:idRecipie')
    .get(async (req, res) => {
    const {idRecipie} = req.params;
        try {
            let foods = await showAll();
            let idFoods = await foods.find(e => e.ID === idRecipie);
            console.log(idFoods);
            res.json(idFoods);
        }
        catch (err) {
            res.status(404).send('Recipie not found.');
        }
    })

router.route('/types')
    .get(async (req, res) => {

    })


router.route('/recipe')
    .post(async (req, res) => {
        
    })


module.exports = router;
