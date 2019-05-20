class ShoppingListItem {
  constructor(quantity, itemName, price, imported) {
    this.quantity = quantity;
    this.itemName = itemName;
    this.price = price;
    this.imported = imported;
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
        parseFloat(words[words.length - 1]).toFixed(2),
        false
      );
      this.shoppingListItems.push(item);
    }
    // console.log(this.shoppingListItems);
    return this.shoppingListItems;
  }

  addItemsWithPipes(string) {
    // split on "\n"
    let lines = string.split("\n");

    // for each line, separate items based on spaces and create a new item for each
    // push new reconstructed item to the array
    for (let i = 0; i < lines.length; i++) {
      let singleLine = lines[i];
      let sections = singleLine.split(" | ");

      let quantityAndName = sections[1].split(" ");
      let quantity = parseInt(quantityAndName[0]);
      let itemName = quantityAndName.splice(1).join(" ");
      let price = parseFloat(sections[sections.length - 1]).toFixed(2);
      let imported = sections[0] === "Imported" ? true : false;

      let item = new ShoppingListItem(quantity, itemName, price, imported);
      this.shoppingListItems.push(item);
    }
    // console.log(this.shoppingListItems);
    return this.shoppingListItems;
  }

  addItemsWithComas(string) {
    // split on "\n"
    let lines = string.split("\n");

    // for each line, separate items based on spaces and create a new item for each
    // push new reconstructed item to the array
    for (let i = 0; i < lines.length; i++) {
      let singleLine = lines[i];

      let sections = singleLine.split(",");
      let quantityAndName = sections[0].split(" ");
      let quantity = parseInt(quantityAndName[0]);
      let itemName = quantityAndName.splice(1).join(" ");

      let price;
      let imported;

      if (sections.length > 2) {
        price = parseFloat(sections[1]).toFixed(2);
        imported = sections[2].slice(1) === "imported" ? true : false;
      } else {
        price = parseFloat(sections[sections.length - 1]).toFixed(2);
        imported = false;
      }

      let item = new ShoppingListItem(quantity, itemName, price, imported);
      this.shoppingListItems.push(item);
    }
    // console.log(this.shoppingListItems);
    return this.shoppingListItems;
  }

  calculateTaxes() {
    // exempt: books, food, and medical products
    let exemptItems = ["book", "chocolate bar", "banana", "box of chocolates", "packet of headache pills"];
    // 10% on all goods
    // 15% on imported goods

    let taxArray = [];
    let totalTax = 0;

    // calculate sub-total: for each item on the shopping list, multiply quantity by price
    // calculate tax on total cost of each item
    // obs: round tax w/ 2 decimals: toFixed(1), then parseFloat(string).toFixed(2)
    for (let i = 0; i < this.shoppingListItems.length; i++) {
      let item = this.shoppingListItems[i];
      let itemQuantity = item.quantity;
      let itemPrice = parseFloat(item.price);
      let itemTotalCostBeforeTax = itemQuantity * itemPrice;

      if (!exemptItems.includes(item.itemName)) {
        let taxOnGoods = parseFloat(itemTotalCostBeforeTax * 0.1).toFixed(2);
        taxArray.push(parseFloat(taxOnGoods));
      }

      if (item.imported) {
        let taxOnImported = parseFloat(itemTotalCostBeforeTax * 0.05);
        let taxOnImportedRounded =
          (Math.ceil((taxOnImported * 100) / 5) * 5) / 100;
        taxArray.push(parseFloat(taxOnImportedRounded));
      }
    }
    console.log("prsicilla", taxArray);
    if (taxArray.length) {
      totalTax = taxArray
        .reduce((a, b) => {
          return a + b;
        })
        .toFixed(2);
    }
    return parseFloat(totalTax);
  }

  calculateSubTotal() {
    let subTotalArray = [];
    let subTotal = 0;

    for (let i = 0; i < this.shoppingListItems.length; i++) {
      let item = this.shoppingListItems[i];
      let itemQuantity = item.quantity;
      let itemPrice = parseFloat(item.price);
      let itemTotalCostBeforeTax = itemQuantity * itemPrice;
      subTotalArray.push(itemTotalCostBeforeTax);
    }

    if (subTotalArray.length) {
      subTotal = subTotalArray
        .reduce((a, b) => {
          return a + b;
        })
        .toFixed(2);
    }
    return parseFloat(subTotal);
  }

  printReceipt() {
    let products = [];
    let singleProduct = "";
    let salesTax = this.calculateTaxes();
    let subTotal = this.calculateSubTotal();
    let total = subTotal + salesTax;

    for (let i = 0; i < this.shoppingListItems.length; i++) {
      let quantity = this.shoppingListItems[i].quantity;
      let itemName = this.shoppingListItems[i].itemName;
      let imported = this.shoppingListItems[i].imported;
      let price = this.shoppingListItems[i].price;
      let totalPrice = (quantity * price).toFixed(2);

      if (imported) {
        itemName = "imported " + itemName;
      }
      singleProduct = quantity + " " + itemName + ": " + totalPrice;
      products.push(singleProduct);
    }

    let joinedProducts = products.join("\n");
    let receipt =
      joinedProducts +
      "\n\n" +
      "Sales Taxes: " +
      salesTax.toFixed(2) +
      "\n" +
      "Total: " +
      total.toFixed(2);
    return receipt;
  }
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
// alphabetical ordering
