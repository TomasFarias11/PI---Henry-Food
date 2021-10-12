// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react';
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import RecipeCreater from './components/RecipeCreated.jsx';

import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });

describe("<RecipeCreater />", () => {
    describe("Estructura", () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallow(<RecipeCreater />);
      });
      it("Renderiza un <form>", () => {
        expect(wrapper.find("form")).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "Name:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(0).text()).toEqual("Name:");
      });
  
      it('Renderiza un input con la propiedad "name" igual a "name"', () => {
        expect(wrapper.find('input[name="name"]')).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "Summary:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(1).text()).toEqual("Summary:");
      });
  
      it('Renderiza una textarea con la propiedad "name" igual a "summary"', () => {
        expect(wrapper.find('textarea[name="summary"]')).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "spoonacularScore:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(2).text()).toEqual("spoonacularScore:");
      });
  
      it('Renderiza un input con la propiedad "name" igual a "spoonacularScore"', () => {
        expect(wrapper.find('input[name="spoonacularScore"]')).toHaveLength(1);
      });
  
      it('Renderiza un label con el texto igual a "healthScore:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(3).text()).toEqual("healthScore:");
      });
  
      it('Renderiza un input con la propiedad "name" igual a "healthScore"', () => {
        expect(wrapper.find('input[name="healthScore"]')).toHaveLength(1);
      });

      it('Renderiza un label con el texto igual a "steps:"', () => {
        // El orden en el que se encuentran los Labels es importante.
        expect(wrapper.find("label").at(3).text()).toEqual("steps:");
      });
  
      it('Renderiza una textarea con la propiedad "name" igual a "steps"', () => {
        expect(wrapper.find('textarea[name="steps"]')).toHaveLength(1);
      });
  
      it('Renderiza un boton con el "type" "submit"', () => {
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
      });


    });
});