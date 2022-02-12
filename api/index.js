//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, dietType } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false })
.then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    let glutenFree =  dietType.create({
      name: "gluten free",
    });
    let fodmapFriendly =  dietType.create({
      name: "fodmap friendly",
    });
    let vegetarian =  dietType.create({
      name: "vegetarian",

    });
    let dairyFree =  dietType.create({
      name: "dairy free",

    });
    let lactoOvoVegetarian =  dietType.create({
      name: "lacto ovo vegetarian",

    });
    let vegan =  dietType.create({
      name: "vegan",

    });
    let pescatarian =  dietType.create({
      name: "pescatarian",

    });

    let paleolithic =  dietType.create({
      name: "paleolithic",

    });
    let primal =  dietType.create({
      name: "primal",

    });
    let whole30 =  dietType.create({
      name: "whole 30",

    });

    Promise.all([glutenFree, fodmapFriendly, vegetarian, dairyFree, lactoOvoVegetarian, vegan, pescatarian, paleolithic, primal, whole30])
      .then(res => {
        console.log('Preloaded diets');
      })
    
  });
});
