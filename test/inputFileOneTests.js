// "use strict";

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
});

describe("Testing #calculateTaxes functionality", () => {
  let shoppingList;

  beforeEach(() => {
    shoppingList = new ShoppingList();
  });

  afterEach(() => {
    shoppingList = undefined;
  });

  it("#calculateTaxes should be a function", () => {
    expect(shoppingList.calculateTaxes).to.be.a("function");
  });

  it("#calculateTaxes should output the total sales tax, with 1 exempt items", () => {
    shoppingList.addItemsWithSpaces(
      "1 bottle 12.49\n1 music CD 14.99\n1 chocolate bar 0.85"
    );

    expect(shoppingList.calculateTaxes()).to.equal(2.75);
  });

  it("#calculateTaxes should output the total sales tax, with 2 exempt items", () => {
    shoppingList.addItemsWithSpaces(
      "1 book 12.49\n1 music CD 14.99\n1 chocolate bar 0.85"
    );

    expect(shoppingList.calculateTaxes()).to.equal(1.5);
  });

  it("#calculateTaxes should output the total sales tax, with 3 exempt items", () => {
    shoppingList.addItemsWithSpaces(
      "1 book 12.49\n1 chocolate bar 0.85\n1 banana 0.79"
    );

    expect(shoppingList.calculateTaxes()).to.equal(0);
  });
});

describe("Testing #calculateSubTotal functionality", () => {
  let shoppingList;

  beforeEach(() => {
    shoppingList = new ShoppingList();
  });

  afterEach(() => {
    shoppingList = undefined;
  });

  it("#calculateSubTotal should be a function", () => {
    expect(shoppingList.calculateSubTotal).to.be.a("function");
  });

  it("#calculateSubTotal should return the subtotal #1", () => {
    shoppingList.addItemsWithSpaces(
      "1 book 12.49\n1 music CD 14.99\n1 chocolate bar 1.85"
    );

    expect(shoppingList.calculateSubTotal()).to.deep.equal(29.33);
  });

  it("#calculateSubTotal should be a function #2", () => {
    shoppingList.addItemsWithSpaces(
      "1 bottle 12.49\n1 music CD 14.99\n1 chocolate bar 0.85"
    );

    expect(shoppingList.calculateSubTotal()).to.deep.equal(28.33);
  });

  it("#calculateSubTotal should be a function #3", () => {
    shoppingList.addItemsWithSpaces(
      "1 book 12.49\n1 chocolate bar 0.85\n1 banana 0.79"
    );

    expect(shoppingList.calculateSubTotal()).to.deep.equal(14.13);
  });
});

describe("Testing #printReceipt functionality", () => {
  beforeEach(() => {
    shoppingList = new ShoppingList();
  });

  afterEach(() => {
    shoppingList = undefined;
  });

  it("#printReceipt should be a function", () => {
    expect(shoppingList.printReceipt).to.be.a("function");
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, #1", () => {
    expect(() => {
      shoppingList.addItemsWithSpaces(
        "1 book 12.49\n1 music CD 14.99\n1 chocolate bar 0.85"
      );
      shoppingList.printReceipt();
    }).to.deep.equal(
      "1 book: 12.49\n1 music CD: 14.99\n1 chocolate bar: 0.85\n\nSales Taxes: 1.50\nTotal: 29.83"
    );
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, #2", () => {
    expect(() => {
      shoppingList.addItemsWithSpaces(
        "1 bottle 12.49\n1 music CD 16.49\n1 chocolate bar 1.85"
      );
      shoppingList.printReceipt();
    }).to.deep.equal(
      "1 bottle: 12.49\n1 music CD: 16.49\n1 chocolate bar: 1.85\n\nSales Taxes: 2.09\nTotal: 33.73"
    );
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, #3", () => {
    expect(() => {
      shoppingList.addItemsWithSpaces(
        "1 book 15.00\n2 chocolate bar 3.50\n1 banana 1.00"
      );
      shoppingList.printReceipt();
    }).to.deep.equal(
      "1 book: 15.00\n2 chocolate bar: 7.00\n1 banana: 1.00\n\nSales Taxes: 0\nTotal: 23.00"
    );
  });
});
