"use strict";

const expect = require("chai").expect;
const ShoppingList = require("../src/inputFileOne");

describe("Shopping list with spaces case", () => {
  let shoppingList;

  beforeEach(() => {
    shoppingList = new ShoppingList();
  });

  afterEach(() => {
    shoppingList = undefined;
  });

  it("ShoppingList should be an object", () => {
    expect(shoppingList).to.be.a("object");
  });

  // #addItemsWithSpaces
  it("#addItemsWithSpaces should be a function", () => {
    expect(shoppingList.addItemsWithSpaces).to.be.a("function");
  });

  it("#addItemsWithSpaces should return an array of object", () => {
    expect(shoppingList.addItemsWithSpaces("1 apple 1.50")).to.deep.equal([
      { quantity: 1, itemName: "apple", price: "1.50" }
    ]);
  });

  it("#addItemsWithSpaces should return an array of objects", () => {
    expect(
      shoppingList.addItemsWithSpaces("1 apple 1.50\n1 book 9.70")
    ).to.deep.equal([
      { quantity: 1, itemName: "apple", price: "1.50" },
      { quantity: 1, itemName: "book", price: "9.70" }
    ]);
  });

  it("#addItemsWithSpaces should return an array of objects", () => {
    expect(
      shoppingList.addItemsWithSpaces(
        "1 book 12.49\n1 music CD 14.99\n1 chocolate bar 0.85"
      )
    ).to.deep.equal([
      { quantity: 1, itemName: "book", price: "12.49" },
      { quantity: 1, itemName: "music CD", price: "14.99" },
      { quantity: 1, itemName: "chocolate bar", price: "0.85" }
    ]);
  });

  // #calculateTaxes
  it("#calculateTaxes should be a function", () => {
    expect(shoppingList.calculateTaxes).to.be.a("function");
  });

  // #calculateTotal
  it("#calculateTotal should be a function", () => {
    expect(shoppingList.calculateTotal).to.be.a("function");
  });

  // #printReceipt
  it("#printReceipt should be a function", () => {
    expect(shoppingList.printReceipt).to.be.a("function");
  });
});
