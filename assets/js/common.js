// GET DATA
const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Serveur status :", response.status);
    }
  } catch (error) {
    console.error(error);
  }
};

// GET URLSEARCHPARAMS
const getSearchParams = (a) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(a);
};

// FORMATING PRICE
const formatPrice = (price, taxes = false) => {
  const priceString = price.toString();
  const centsIndex = priceString.length - 2;
  const centsValue = priceString.substring(centsIndex);
  const integerValue = priceString.substring(0, centsIndex);
  let formatedPrice = integerValue;
  if (centsValue !== "00") {
    formatedPrice += "," + centsValue;
  }
  formatedPrice += "€";
  if (taxes) {
    formatedPrice += " TTC";
  }
  return numberWithSpaces(formatedPrice);
};

// SPACING NUMBERS
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// SET MULTIPLE ATTRIBUTES
const setAttributes = (element, attributes) => {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// ALL FUNCTIONS CART
class Cart {
  items;
  constructor() {
    const cartStorage = localStorage.getItem("cart");
    this.items = cartStorage != null ? JSON.parse(cartStorage) : [];
  }
  addItem(id, color, price, quantity = 1) {
    const addCartItem = {
      id: id,
      color: color,
      price: price,
      quantity: quantity,
    };
    const existingItem = this.items.find((item) => {
      return item.id == addCartItem.id && item.color == addCartItem.color;
    });
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push(addCartItem);
    }
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  removeItem(id, color) {
    let index = this.items.findIndex((item) => item.id == id && item.color == color);
    if (index >= 0) {
      this.items.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.items));
    }
  }
  increaseItem(id, color) {
    const item = this.items.find((item) => item.id == id && item.color == color);
    item.quantity++;
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  decreaseItem(id, color) {
    const item = this.items.find((item) => item.id == id && item.color == color);
    item.quantity--;
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  sum(item) {
    let sum = 0;
    sum += item.price * item.quantity;
    return sum;
  }
  getItems() {
    return this.items;
  }
}