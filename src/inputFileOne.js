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

  addItemsWithSpaces(string) {
    // split on "\n"
    let lines = string.split("\n");

    // for each line, separate items based on spaces and create a new item for each
    // push new reconstructed item to the array
    for (let i = 0; i < lines.length; i++) {
      let singleLine = lines[i];
      let words = singleLine.split(" ");
      let item = new ShoppingListItem(
        parseInt(words[0]),
        words.splice(1, words.length - 2).join(" "),
        parseFloat(words[words.length - 1]).toFixed(2)
      );
      this.shoppingListItems.push(item);
    }
    return this.shoppingListItems;
  }

  calculateTaxes() {
    // exempt: books, food, and medical products
    // 10% on all goods
    // 15% on imported goods
    // round tax w/ 2 decimals: toFixed(1), then parseFloat(string).toFixed(2)
    // calculate sub-total: for each item on the shopping list, multiply quantity by price
    // calculate tax on total cost of each item
    // calculate total
  }

  calculateTotal() {}

  printReceipt() {}
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

//Edge case:
// items without quantity, name or price?
