"use strict";

const expect = require("chai").expect;
const ShoppingListComaCase = require("../src/inputFileThree");

describe("Shopping list with spaces case", () => {
  let shoppingListComaCase;

  beforeEach(() => {
    shoppingListComaCase = new ShoppingListComaCase();
  });

  afterEach(() => {
    shoppingListComaCase = undefined;
  });

  it("ShoppingListComaCase should be an object", () => {
    expect(shoppingListComaCase).to.be.a("object");
  });
});
