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
  const searchParams = new URLSearchParams(document.location.search);
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
  for (let key in attributes ) {
    element.setAttribute(key, attributes[key])
  }
}

class Cart {
  _items;
  constructor() {
    const cartStorage = localStorage.getItem("cart")
    this._items = (cartStorage != null) ? JSON.parse(cartStorage) : []
  }
  addItem(id, color) {
    const cartItem = {
      id: id,
      color: color
    }
    this._items.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(this._items));
  }
  getItems() {
    return this._items
  }
}

/* // SET QUANTITY
function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}
 */