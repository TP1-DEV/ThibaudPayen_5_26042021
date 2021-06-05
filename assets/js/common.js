// GET DATA
const getData = async (request) => {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const data = response.json();
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

// CREATE CARD
const createCard = (element, items, links = false, prices = false) => {
  const card = createElementFactory("article", { class: "card-article" }, element);
  let box = "";
  if (links) {
    const link = createElementFactory("a", { class: "card-article-link" }, card);
    link.href = "product.html?id=" + items._id;
    box = createElementFactory("div", { class: "card-box" }, link);
  } else {
    box = createElementFactory("div", { class: "card-box" }, card);
  }
  const img = createElementFactory("img", { class: "card-box-img" }, box);
  img.src = items.imageUrl;
  const body = createElementFactory("div", { class: "card-box-body" }, box);
  const title = createElementFactory("h5", { class: "card-box-body-title" }, body);
  title.textContent = items.name;
  const desc = createElementFactory("p", { class: "card-box-body-text" }, body);
  desc.textContent = items.description;
  if (prices) {
    footer = createElementFactory("div", { class: "card-box-body-price" }, body);
    const price = createElementFactory("p", { class: "card-box-body-price-text" }, footer);
    price.textContent = formatPrice(items.price);
  }
  return card;
};

// CREATE OPTIONS BAR
const createColorOptions = (element1, element2, items) => {
  const inputGroup = createElementFactory("div", { class: "input-group" }, element1);
  const inputGroupPrepend = createElementFactory("div", { class: "input-group-prepend" }, inputGroup);
  const label = createElementFactory("label", { class: "input-group-text", for: "inputGroupSelect01" }, inputGroupPrepend);
  label.textContent = "Couleurs";
  const customSelect = createElementFactory("select", { class: "select-color", id: "inputGroupSelect01" }, inputGroup);
  for (const color of items.colors) {
    const options = createElementFactory("option", { value: color }, customSelect);
    options.textContent = color;
  }
  const button = createElementFactory("button", { class: "btn", id: "addToCart" }, element2);
  button.textContent = "Ajouter au panier";
};

// BUTTON ADD TO CART
const buttonAddToCart = (id, item) => {
  id.addEventListener("click", () => {
    const cart = Cart.getCart();
    const selectedOption = document.getElementById("inputGroupSelect01").value;
    cart.addItem(item._id, selectedOption, item.price);
    cart.update();
  });
};

// CREATE BACK TO HOME
const createBackToHome = (id) => {
  const backToHome = createElementFactory("a", { class: "back-home" }, id);
  backToHome.href = "index.html";
  const backArrow = createElementFactory("i", { class: "fas fa-arrow-left" }, backToHome);
  const textBackArrow = createElementFactory("span", { class: "font-weight-bold" }, backToHome);
  textBackArrow.textContent = "Retour à l'acceuil";
};

// CREATE TOTAL SUMMARY
const createTotalSummary = (id) => {
  const cart = Cart.getCart();
  const totalItems = createElementFactory("div", { id: "total-items" }, id);
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty();
  const totalPrice = createElementFactory("div", { id: "total-price" }, summary);
  totalPrice.textContent = "Prix total = " + formatPrice(cart.totalPrices(), true);
};



// CREATE SUM ORDER
const createSumOrder = (id) => {
  const cart = Cart.getCart();
  const totalQuantity = createElementFactory("p", { class: "font-weight-bold" }, id);
  totalQuantity.textContent = "Quantité d'articles : " + cart.itemsQty();
  const totalPrice = createElementFactory("p", { class: "font-weight-bold" }, order);
  totalPrice.textContent = "Prix total : " + formatPrice(cart.totalPrices(), true);
  const orderId = createElementFactory("p", { class: "font-weight-bold" }, order);
  orderId.textContent = "Commande n° : " + getSearchParams("orderId");
};

// CREATE DOM ELEMENT
const createElementFactory = (type, attributes, parent) => {
  const element = document.createElement(type);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
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
  if (priceString === "0") {
    formatedPrice = 0;
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

// UPDATE HEADER CART QUANTITY
const updateCartQty = (e) => {
  const cart = e.detail.cart;
  const cartQtyIcon = document.getElementById("cart-qty");
  if (cart.itemsQty() > 0) {
    cartQtyIcon.classList.add("cart-qty");
    cartQtyIcon.textContent = cart.itemsQty();
  } else {
    cartQtyIcon.classList.remove("cart-qty");
    cartQtyIcon.textContent = "";
  }
};
document.addEventListener("updateEvent", updateCartQty);

// ALL FUNCTION CLASS CART ITEM COMPONENT
class CartItemComponent {
  component;
  quantityNumber;
  constructor(item, id) {
    this.item = item;
    this.quantityComponent = this.createQuantity();
    this.sumPriceComponent = this.createSumPrice();
    this.removeComponent = this.createRemove();
    this.component = this.createCartItemComponent(id);
    this.card = id.parentElement
  }
  // GET COMPONENT
  getComponent() {
    return this.component;
  }
  // CREATE QUANTITY BOX
  createQuantity() {
    const quantity = createElementFactory("div", { class: "card-component-quantity" });
    const down = createElementFactory("span", { class: "down" }, quantity);
    down.textContent = "-";
    this.quantityNumber = createElementFactory("input", { type: "text", value: this.item.quantity }, quantity);
    const up = createElementFactory("span", { class: "up" }, quantity);
    up.textContent = "+";
    up.addEventListener("click", () => {
      const input = up.previousElementSibling;
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      this.updateQty(value)
    });
    down.addEventListener("click", () => {
      const input = down.nextElementSibling;
      let value = parseInt(input.value, 10);
      if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        this.updateQty(value)
      } else {
        this.removeItem()
      }
    });
    this.quantityNumber.addEventListener("change", () => {
      let value = parseInt(this.quantityNumber.value, 10);
      this.updateQty(value)
    });
    return quantity;
  }
  // CREATE SUM PRICE
  createSumPrice() {
    const sumPrice = createElementFactory("p", { class: "card-component-price" });
    sumPrice.textContent = formatPrice(this.item.quantity * this.item.price);
    return sumPrice;
  }
  // CREATE REMOVE
  createRemove() {
    const remove = createElementFactory("div", { class: "card-component-remove" });
    const iconRemove = createElementFactory("i", { class: "fas fa-trash" }, remove);
    remove.addEventListener("click", () => {
      this.removeItem()
    });
    return remove;
  }
  // CREATE CART ITEM COMPONENT
  createCartItemComponent() {
    const cardComponent = createElementFactory("div", { class: "card-component"})
    cardComponent.appendChild(this.quantityComponent);
    cardComponent.appendChild(this.sumPriceComponent);
    cardComponent.appendChild(this.removeComponent);
    return cardComponent;
  }
  // UPDATE QUANTITY
  updateQty(qty) {
  this.quantityNumber.value = qty
  this.sumPriceComponent.textContent = formatPrice(qty * this.item.price)
  Cart.getCart().updateItemQty(this.item.id, this.item.color, qty)
  }
  // REMOVE ITEM
  removeItem() {
    Cart.getCart().removeItem(this.item.id, this.item.color);
    this.card.remove();
  } 
}

// ALL FUNCTIONS CART
class Cart {
  static instance;
  items;
  updateEvent;
  constructor() {
    const cartStorage = localStorage.getItem("cart");
    this.items = cartStorage != null ? JSON.parse(cartStorage) : [];
    this.updateEvent = new CustomEvent("updateEvent", {
      detail: {
        cart: this,
      },
    });
  }
  // GET CART
  static getCart() {
    if (!Cart.instance) {
      Cart.instance = new Cart();
    }
    return Cart.instance;
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
      return item.id === addCartItem.id && item.color === addCartItem.color;
    });
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push(addCartItem);
    }
    this.update();
  }
  // REMOVE ITEM FROM CART AND FROM LOCALSTORAGE
  removeItem(id, color) {
    let index = this.items.findIndex((item) => item.id === id && item.color === color);
    if (index >= 0) {
      this.items.splice(index, 1);
      this.update();
    }
  }
  // INCREASE ITEM QUANTITY IN LOCALSTORAGE
  increaseItemQty(id, color) {
    const item = this.items.find((item) => item.id === id && item.color === color);
    item.quantity++;
    this.update();
  }
  // DECREASE ITEM QUANTITY IN LOCALSTORAGE
  decreaseItemQty(id, color) {
    const item = this.items.find((item) => item.id === id && item.color === color);
    item.quantity--;
    this.update();
  }
  // UPDATE ITEM QTY IN LOCALSTORAGE
  updateItemQty(id, color, quantity) {
    const item = this.items.find((item) => item.id === id && item.color === color);
    item.quantity = quantity;
    this.update();
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
  update() {
    localStorage.setItem("cart", JSON.stringify(this.items));
    document.dispatchEvent(this.updateEvent);
  }
  updateHeader() {
    document.dispatchEvent(this.updateEvent);
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

// CREATE NEW FORM CONTACT
const formContact = () => {
  const formOrder =  document.forms["form-order"]
  const firstName = formOrder.firstName.value;
  const lastName = formOrder.lastName.value;
  const address = formOrder.address.value;
  const city = formOrder.city.value;
  const email = formOrder.email.value;

  const nameValidation = /^[a-zA-Z]$/;
  const addressValidation = /^[a-zA-Z0-9 ]$/;
  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const nameIsValid = nameValidation.test(firstName) && nameValidation.test(lastName) && nameValidation.test(city);
  const addressIsValid = addressValidation.test(address);
  const emailIsValid = emailValidation.test(email);
  if (nameIsValid === false || addressIsValid === false || emailIsValid === false) {
    alert("Erreur de saisie");
  } else {
    return (contact = new Contact(firstName, lastName, address, city, email));
  }
};


// BUTTON FORM ORDER
const buttonFormOrder = (id) => {
  id.addEventListener("click", async (e) => {
    e.preventDefault();
    const cart = Cart.getCart();
    const orderData = {
      contact: formContact(),
      products: cart.getItemsId(),
    };
    const request = new Request("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    const data = await getData(request);
    if (data.orderId) {
      console.log(data);
      window.location = "command.html?orderId=" + data.orderId;
    } else {
      console.error(error);
    }
  });
};