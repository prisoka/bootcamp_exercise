class ShoppingListItem {
  constructor(quantity, itemName, price) {
    this.quantity = quantity;
    this.itemName = itemName;
    this.price = price;
  }
}

class ShoppingList {
  constructor() {
    this.shoppingListItems = [];
  }

  addItemsWithSpaces(string) {}
}

module.exports = ShoppingList;

// INPUT:
// space:

// 1 book 12.49\n
// 1 music CD 14.99\n
// 1 chocolate bar 0.85\n

// OUTPUT:
// 1 book: 12.49
// 1 chocolate bar: 0.85
// 1 music CD: 16.49

// Sales Taxes: 1.50
// Total: 29.83
