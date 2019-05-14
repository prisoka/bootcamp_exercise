"use strict";

const expect = require("chai").expect;
const ShoppingListSpaceCase = require("../src/inputFileOne");

describe("Shopping list with spaces case", () => {
  let shoppingListSpaceCase;

  beforeEach(() => {
    shoppingListSpaceCase = new ShoppingListSpaceCase();
  });

  afterEach(() => {
    shoppingListSpaceCase = undefined;
  });

  it("ShoppingListSpaceCase should be an object", () => {
    expect(shoppingListSpaceCase).to.be.a("object");
  });
});
