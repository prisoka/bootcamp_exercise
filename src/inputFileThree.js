class ShoppingListComaCase {}

module.exports = ShoppingListComaCase;

// INPUT:
// comma:

// 1 bottle of perfume, 27.99, imported
// 1 bottle of perfume, 18.99
// 1 packet of headache pills, 9.75
// 1 box of chocolates, 11.25, imported

// Output:
// 1 packet of headache pills: 9.75
// 1 bottle of perfume: 20.89
// 1 imported box of chocolates: 11.85
// 1 imported bottle of perfume: 32.19

// Sales Taxes: 6.70
// Total: 74.68