// GET DATA
const getData = async (request) => {
  try {
    const response = await fetch(request);
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
const getSearchParams = (term) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(term);
};

// SET MULTIPLE ATTRIBUTES
const setAttributes = (element, attributes) => {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// SPACING NUMBERS
function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// FORMATING PRICE
const formatPrice = (price, taxes = false) => {
  const priceString = price.toString();
  const centsIndex = priceString.length - 2;
  const centsValue = priceString.substring(centsIndex);
  const integerValue = priceString.substring(0, centsIndex);
  let formatedPrice = integerValue;
  if (priceString == 0) {
    formatedPrice = "0";
  }
  if (centsValue !== "00" && priceString !== "0") {
    formatedPrice += "," + centsValue;
  }
  formatedPrice += "€";
  if (taxes) {
    formatedPrice += " TTC";
  }
  return numberWithSpaces(formatedPrice);
};

// SHOW HEADER CART QUANTITY
const showCartQty = () => {
  const cart = new Cart();
  const cartQtyIcon = document.getElementById("cart-qty");
  if (cart.itemsQty() > 0) {
    cartQtyIcon.classList.add("cart-qty");
    cartQtyIcon.textContent = cart.itemsQty();
  } else {
    cartQtyIcon.classList.remove("cart-qty");
    cartQtyIcon.textContent = "";
  }
};

// ALL FUNCTIONS CART
class Cart {
  items;
  constructor() {
    const cartStorage = localStorage.getItem("cart");
    this.items = cartStorage != null ? JSON.parse(cartStorage) : [];
  }
  // ADD ITEM TO CART AND TO LOCALSTORAGE
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
  // REMOVE ITEM FROM CART AND FROM LOCALSTORAGE
  removeItem(id, color) {
    let index = this.items.findIndex((item) => item.id == id && item.color == color);
    if (index >= 0) {
      this.items.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.items));
    }
  }
  // INCREASE ITEM QUANTITY IN LOCALSTORAGE
  increaseItemQty(id, color) {
    const item = this.items.find((item) => item.id == id && item.color == color);
    item.quantity++;
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  // DECREASE ITEM QUANTITY IN LOCALSTORAGE
  decreaseItemQty(id, color) {
    const item = this.items.find((item) => item.id == id && item.color == color);
    item.quantity--;
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  // UPDATE ITEM QTY IN LOCALSTORAGE
  updateItemQty(id, color) {
    const item = this.items.find((item) => item.id == id && item.color == color);
    item.quantity
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
  // ITEMS QUANTITY
  itemsQty() {
    let itemsQty = 0;
    for (const item of this.items) {
      itemsQty += item.quantity;
    }
    return itemsQty;
  }
  // SUM ITEM PRICE
  sumPrices(item) {
    let itemsPrices = 0;
    itemsPrices += item.price * item.quantity;
    return itemsPrices;
  }
  // TOTAL ITEMS PRICES
  totalPrices() {
    let totalPrices = 0;
    for (const item of this.items) {
      totalPrices += item.price * item.quantity;
    }
    return totalPrices;
  }
  // GET LOCALSTORAGE "CART"
  getItems() {
    return this.items;
  }
  // GET LOCALSTORAGE ITEMS ID IN ARRAY
  getItemsId() {
    let itemsId = [];
    for (const item of this.items) {
      itemsId.push(item.id);
    }
    return itemsId;
  }
}
// FORM CONTACT
class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}
