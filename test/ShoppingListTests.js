// "use strict";

const expect = require("chai").expect;
const ShoppingList = require("../src/ShoppingList");

describe("Shopping list with SPACES case", () => {
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
      { quantity: 1, itemName: "apple", price: "1.50", imported: false }
    ]);
  });

  it("#addItemsWithSpaces should return an array of objects", () => {
    expect(
      shoppingList.addItemsWithSpaces("1 apple 1.50\n1 book 9.70")
    ).to.deep.equal([
      { quantity: 1, itemName: "apple", price: "1.50", imported: false },
      { quantity: 1, itemName: "book", price: "9.70", imported: false }
    ]);
  });

  it("#addItemsWithSpaces should return an array of objects", () => {
    expect(
      shoppingList.addItemsWithSpaces(
        "1 book 12.49\n1 music CD 14.99\n1 chocolate bar 0.85"
      )
    ).to.deep.equal([
      { quantity: 1, itemName: "book", price: "12.49", imported: false },
      { quantity: 1, itemName: "music CD", price: "14.99", imported: false },
      { quantity: 1, itemName: "chocolate bar", price: "0.85", imported: false }
    ]);
  });
});

describe("Shopping list with PIPES case", () => {
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

  it("#addItemsWithPipes should be a function", () => {
    expect(shoppingList.addItemsWithPipes).to.be.a("function");
  });

  it("#addItemsWithPipes should return an array of object", () => {
    expect(
      shoppingList.addItemsWithPipes(
        "Imported | 1 bottle of perfume | 47.50\nImported | 1 box of chocolates | 10.00"
      )
    ).to.deep.equal([
      {
        quantity: 1,
        itemName: "bottle of perfume",
        price: "47.50",
        imported: true
      },
      {
        quantity: 1,
        itemName: "box of chocolates",
        price: "10.00",
        imported: true
      }
    ]);
  });
});

describe("Shopping list with COMAS case", () => {
  let shoppingList;

  beforeEach(() => {
    shoppingList = new ShoppingList();
  });

  afterEach(() => {
    shoppingList = undefined;
  });

  it("#addItemsWithComas should be a function", () => {
    expect(shoppingList.addItemsWithComas).to.be.a("function");
  });

  it("#addItemsWithComas should return an array of object", () => {
    expect(
      shoppingList.addItemsWithComas(
        "1 bottle of perfume, 27.99, imported\n1 bottle of perfume, 18.99\n1 packet of headache pills, 9.75\n1 box of chocolates, 11.25, imported"
      )
    ).to.deep.equal([
      {
        quantity: 1,
        itemName: "bottle of perfume",
        price: "27.99",
        imported: true
      },
      {
        quantity: 1,
        itemName: "bottle of perfume",
        price: "18.99",
        imported: false
      },
      {
        quantity: 1,
        itemName: "packet of headache pills",
        price: "9.75",
        imported: false
      },
      {
        quantity: 1,
        itemName: "box of chocolates",
        price: "11.25",
        imported: true
      }
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
      "1 book 12.49\n2 music CD 14.99\n1 chocolate bar 0.85"
    );

    expect(shoppingList.calculateTaxes()).to.equal(3.0);
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
  let shoppingList;

  beforeEach(() => {
    shoppingList = new ShoppingList();
  });

  afterEach(() => {
    shoppingList = undefined;
  });

  it("#printReceipt should be a function", () => {
    expect(shoppingList.printReceipt).to.be.a("function");
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, SPACE case: #1", () => {
    shoppingList.addItemsWithSpaces(
      "1 book 12.49\n1 music CD 14.99\n1 chocolate bar 0.85"
    );

    expect(shoppingList.printReceipt()).to.deep.equal(
      "1 book: 12.49\n1 music CD: 14.99\n1 chocolate bar: 0.85\n\nSales Taxes: 1.50\nTotal: 29.83"
    );
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, SPACE case: #2", () => {
    shoppingList.addItemsWithSpaces(
      "1 bottle 12.49\n1 music CD 16.49\n1 chocolate bar 1.85"
    );

    expect(shoppingList.printReceipt()).to.deep.equal(
      "1 bottle: 12.49\n1 music CD: 16.49\n1 chocolate bar: 1.85\n\nSales Taxes: 2.90\nTotal: 33.73"
    );
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, SPACE case: #3", () => {
    shoppingList.addItemsWithSpaces(
      "1 book 15.10\n2 chocolate bar 3.50\n1 banana 1.00"
    );

    expect(shoppingList.printReceipt()).to.deep.equal(
      "1 book: 15.10\n2 chocolate bar: 7.00\n1 banana: 1.00\n\nSales Taxes: 0.00\nTotal: 23.10"
    );
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, PIPE case: #1", () => {
    shoppingList.addItemsWithPipes(
      "Imported | 1 bottle of perfume | 47.50\nImported | 1 box of chocolates | 10.00"
    );

    expect(shoppingList.printReceipt()).to.deep.equal(
      "1 imported bottle of perfume: 47.50\n1 imported box of chocolates: 10.00\n\nSales Taxes: 7.65\nTotal: 65.15"
    );
  });

  it("#printReceipt should return a report with items, quantity, cost, sales taxes and total, COMA case: #1", () => {
    shoppingList.addItemsWithPipes(
      "Imported | 1 bottle of perfume | 47.50\nImported | 1 box of chocolates | 10.00"
    );

    expect(shoppingList.printReceipt()).to.deep.equal(
      "1 packet of headache pills: 9.75\n1 bottle of perfume: 20.89\n1 imported box of chocolates: 11.85\n1 imported bottle of perfume: 32.19\n\nSales Taxes: 6.70\nTotal: 74.68"
    );
  });
});
