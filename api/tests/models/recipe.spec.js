const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    })
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid smmary', () => {
        Recipe.create({ summary: 'Es una delicia' });
      });
    })
    describe('healthScore', () => {
      it('should throw an error if healthScore is not a number', (done) => {
        Recipe.create({healthScore: 'Hola'})
          .then(() => done(new Error('It requires a number')))
          .catch(() => done());
      });
      it('should work when its a number', () => {
        Recipe.create({ healthScore: 98 });
      });
    })
    describe('spoonacularScore', () => {
      it('should throw an error if spoonacularScore is not a number', (done) => {
        Recipe.create({spoonacularScore: 'Hola'})
          .then(() => done(new Error('It requires a number')))
          .catch(() => done());
      });
      it('should work when its a number', () => {
        Recipe.create({ spoonacularScore: 98 });
      });
    })
  });
});
