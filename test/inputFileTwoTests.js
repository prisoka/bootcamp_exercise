"use strict";

const expect = require("chai").expect;
const ShoppingListPipeCase = require("../src/inputFileTwo");

describe("Shopping list with spaces case", () => {
  let shoppingListPipeCase;

  beforeEach(() => {
    shoppingListPipeCase = new ShoppingListPipeCase();
  });

  afterEach(() => {
    shoppingListPipeCase = undefined;
  });

  it("ShoppingListPipeCase should be an object", () => {
    expect(shoppingListPipeCase).to.be.a("object");
  });
});
