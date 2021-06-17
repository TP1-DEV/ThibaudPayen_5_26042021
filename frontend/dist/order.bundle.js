/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/cart.js":
/*!************************!*\
  !*** ./src/js/cart.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cart\": () => (/* binding */ Cart)\n/* harmony export */ });\n// CLASS CART\r\nclass Cart {\r\n  static instance;\r\n  items;\r\n  updateEvent;\r\n  constructor() {\r\n    const cartStorage = localStorage.getItem(\"cart\");\r\n    this.items = cartStorage != null ? JSON.parse(cartStorage) : [];\r\n    this.updateEvent = new CustomEvent(\"updateEvent\", {\r\n      detail: {\r\n        cart: this,\r\n      },\r\n    });\r\n  }\r\n  static getCart() {\r\n    if (!Cart.instance) {\r\n      Cart.instance = new Cart();\r\n    }\r\n    return Cart.instance;\r\n  }\r\n  addItem(id, color, price, quantity = 1) {\r\n    const addCartItem = {\r\n      id: id,\r\n      color: color,\r\n      price: price,\r\n      quantity: quantity,\r\n    };\r\n    const existingItem = this.items.find((item) => {\r\n      return item.id === addCartItem.id && item.color === addCartItem.color;\r\n    });\r\n    if (existingItem) {\r\n      existingItem.quantity++;\r\n    } else {\r\n      this.items.push(addCartItem);\r\n    }\r\n    this.update();\r\n  }\r\n  removeItem(id, color) {\r\n    let index = this.items.findIndex((item) => item.id === id && item.color === color);\r\n    if (index >= 0) {\r\n      this.items.splice(index, 1);\r\n      this.update();\r\n    }\r\n  }\r\n  updateItemQty(id, color, quantity) {\r\n    const item = this.items.find((item) => item.id === id && item.color === color);\r\n    item.quantity = quantity;\r\n    this.update();\r\n  }\r\n  itemsQty() {\r\n    let itemsQty = 0;\r\n    for (const item of this.items) {\r\n      itemsQty += item.quantity;\r\n    }\r\n    return itemsQty;\r\n  }\r\n  totalPrices() {\r\n    let totalPrices = 0;\r\n    for (const item of this.items) {\r\n      totalPrices += item.price * item.quantity;\r\n    }\r\n    return totalPrices;\r\n  }\r\n  getItems() {\r\n    return this.items;\r\n  }\r\n  getItemsId() {\r\n    let itemsId = [];\r\n    for (const item of this.items) {\r\n      itemsId.push(item.id);\r\n    }\r\n    return itemsId;\r\n  }\r\n  update() {\r\n    localStorage.setItem(\"cart\", JSON.stringify(this.items));\r\n    document.dispatchEvent(this.updateEvent);\r\n  }\r\n  updateHeader() {\r\n    document.dispatchEvent(this.updateEvent);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://frontend/./src/js/cart.js?");

/***/ }),

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"getSearchParams\": () => (/* binding */ getSearchParams),\n/* harmony export */   \"numberWithSpaces\": () => (/* binding */ numberWithSpaces),\n/* harmony export */   \"formatPrice\": () => (/* binding */ formatPrice),\n/* harmony export */   \"createElementFactory\": () => (/* binding */ createElementFactory),\n/* harmony export */   \"createCard\": () => (/* binding */ createCard),\n/* harmony export */   \"buttonAddToCart\": () => (/* binding */ buttonAddToCart),\n/* harmony export */   \"createBackToHome\": () => (/* binding */ createBackToHome),\n/* harmony export */   \"createTotalSummary\": () => (/* binding */ createTotalSummary),\n/* harmony export */   \"updateCartQty\": () => (/* binding */ updateCartQty),\n/* harmony export */   \"Contact\": () => (/* binding */ Contact),\n/* harmony export */   \"formContact\": () => (/* binding */ formContact),\n/* harmony export */   \"buttonFormOrder\": () => (/* binding */ buttonFormOrder)\n/* harmony export */ });\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ \"./src/js/cart.js\");\n/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url */ \"./src/js/url.js\");\n\r\n\r\n\r\n// GET DATA\r\nconst getData = async (request) => {\r\n  try {\r\n    const response = await fetch(request);\r\n    if (response.ok) {\r\n      const data = response.json();\r\n      return data;\r\n    } else {\r\n      console.error(\"Serveur status :\", response.status);\r\n    }\r\n  } catch (error) {\r\n    console.error(error);\r\n  }\r\n};\r\n\r\n// GET URLSEARCHPARAMS\r\nconst getSearchParams = (term) => {\r\n  const searchParams = new URLSearchParams(window.location.search);\r\n  return searchParams.get(term);\r\n};\r\n\r\n// SPACING NUMBERS\r\nfunction numberWithSpaces(number) {\r\n  return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, \" \");\r\n}\r\n\r\n// FORMATING PRICE\r\nconst formatPrice = (price, taxes = false) => {\r\n  const priceString = price.toString();\r\n  const centsIndex = priceString.length - 2;\r\n  const centsValue = priceString.substring(centsIndex);\r\n  const integerValue = priceString.substring(0, centsIndex);\r\n  let formatedPrice = integerValue;\r\n  if (priceString === \"0\") {\r\n    formatedPrice = 0;\r\n  }\r\n  if (centsValue !== \"00\" && priceString !== \"0\") {\r\n    formatedPrice += \",\" + centsValue;\r\n  }\r\n  formatedPrice += \"€\";\r\n  if (taxes) {\r\n    formatedPrice += \" TTC\";\r\n  }\r\n  return numberWithSpaces(formatedPrice);\r\n};\r\n\r\n// CREATE DOM ELEMENT\r\nconst createElementFactory = (type, attributes, parent) => {\r\n  const element = document.createElement(type);\r\n  for (let key in attributes) {\r\n    element.setAttribute(key, attributes[key]);\r\n  }\r\n  if (parent) {\r\n    parent.appendChild(element);\r\n  }\r\n  return element;\r\n};\r\n\r\n// CREATE CARD\r\nconst createCard = (element, items, links = false, prices = false) => {\r\n  const card = createElementFactory(\"article\", { class: \"card-article\" }, element);\r\n  let box = \"\";\r\n  if (links) {\r\n    const link = createElementFactory(\"a\", { class: \"card-article-link\" }, card);\r\n    link.href = \"product.html?id=\" + items._id;\r\n    box = createElementFactory(\"div\", { class: \"card-box\" }, link);\r\n  } else {\r\n    box = createElementFactory(\"div\", { class: \"card-box\" }, card);\r\n  }\r\n  const img = createElementFactory(\"img\", { class: \"card-box-img\" }, box);\r\n  img.src = items.imageUrl;\r\n  const body = createElementFactory(\"div\", { class: \"card-box-body\" }, box);\r\n  const title = createElementFactory(\"h5\", { class: \"card-box-body-title\" }, body);\r\n  title.textContent = items.name;\r\n  const desc = createElementFactory(\"p\", { class: \"card-box-body-text\" }, body);\r\n  desc.textContent = items.description;\r\n  if (prices) {\r\n    const footer = createElementFactory(\"div\", { class: \"card-box-body-price\" }, body);\r\n    const price = createElementFactory(\"p\", { class: \"card-box-body-price-text\" }, footer);\r\n    price.textContent = formatPrice(items.price);\r\n  }\r\n  return card;\r\n};\r\n\r\n// BUTTON ADD TO CART\r\nconst buttonAddToCart = (element, item) => {\r\n  element.addEventListener(\"click\", () => {\r\n    const cart = _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart();\r\n    const selectedOption = document.getElementById(\"inputGroupSelect01\").value;\r\n    cart.addItem(item._id, selectedOption, item.price);\r\n    cart.update();\r\n  });\r\n};\r\n\r\n// CREATE BACK TO HOME\r\nconst createBackToHome = (element) => {\r\n  const backToHome = createElementFactory(\"a\", { class: \"back-home\" }, element);\r\n  backToHome.href = \"index.html\";\r\n  const backArrow = createElementFactory(\"i\", { class: \"fas fa-arrow-left\" }, backToHome);\r\n  const textBackArrow = createElementFactory(\"span\", { class: \"font-weight-bold\" }, backToHome);\r\n  textBackArrow.textContent = \"Retour à l'acceuil\";\r\n};\r\n\r\n// CREATE TOTAL SUMMARY\r\nconst createTotalSummary = (element) => {\r\n  const cart = _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart();\r\n  const totalItems = createElementFactory(\"div\", { id: \"total-items\" }, element);\r\n  totalItems.textContent = \"Nombre d'articles : \" + cart.itemsQty();\r\n  const totalPrice = createElementFactory(\"div\", { id: \"total-price\" }, summary);\r\n  totalPrice.textContent = \"Prix total = \" + formatPrice(cart.totalPrices(), true);\r\n};\r\n\r\n// UPDATE HEADER CART QUANTITY\r\nconst updateCartQty = (e) => {\r\n  const cart = e.detail.cart;\r\n  const cartQtyIcon = document.getElementById(\"cart-qty\");\r\n  if (cart.itemsQty() > 0) {\r\n    cartQtyIcon.classList.add(\"cart-qty\");\r\n    cartQtyIcon.textContent = cart.itemsQty();\r\n  } else {\r\n    cartQtyIcon.classList.remove(\"cart-qty\");\r\n    cartQtyIcon.textContent = \"\";\r\n  }\r\n};\r\ndocument.addEventListener(\"updateEvent\", updateCartQty);\r\n\r\n// CLASS CONTACT\r\nclass Contact {\r\n  constructor(firstName, lastName, address, city, email) {\r\n    this.firstName = firstName;\r\n    this.lastName = lastName;\r\n    this.address = address;\r\n    this.city = city;\r\n    this.email = email;\r\n  }\r\n}\r\n\r\n// CREATE NEW FORM CONTACT\r\nconst formContact = () => {\r\n  const formOrder = document.forms[\"form-order\"];\r\n  const firstName = formOrder.firstName.value;\r\n  const lastName = formOrder.lastName.value;\r\n  const address = formOrder.address.value;\r\n  const city = formOrder.city.value;\r\n  const email = formOrder.email.value;\r\n\r\n  const nameValidation = /[a-zA-Z- ]/;\r\n  const addressValidation = /[a-zA-Z0-9- ]/;\r\n  const emailValidation = /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/;\r\n\r\n  const nameIsValid = nameValidation.test(firstName) && nameValidation.test(lastName) && nameValidation.test(city);\r\n  const addressIsValid = addressValidation.test(address);\r\n  const emailIsValid = emailValidation.test(email);\r\n  let contact;\r\n  if (nameIsValid === false || addressIsValid === false || emailIsValid === false) {\r\n    alert(\"Erreur de saisie\");\r\n  } else {\r\n    return (contact = new Contact(firstName, lastName, address, city, email));\r\n  }\r\n};\r\n\r\n// BUTTON FORM ORDER\r\nconst buttonFormOrder = (element) => {\r\n  element.addEventListener(\"click\", async (e) => {\r\n    e.preventDefault();\r\n    const orderData = {\r\n      contact: formContact(),\r\n      products: _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart().getItemsId(),\r\n    };\r\n    const request = new Request(_url__WEBPACK_IMPORTED_MODULE_1__.url + \"order\", {\r\n      method: \"POST\",\r\n      headers: {\r\n        Accept: \"application/json\",\r\n        \"Content-Type\": \"application/json\",\r\n      },\r\n      body: JSON.stringify(orderData),\r\n    });\r\n    const data = await getData(request);\r\n    if (data.orderId) {\r\n      window.location = \"sumorder.html?orderId=\" + data.orderId;\r\n    } else {\r\n      console.error(error);\r\n    }\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://frontend/./src/js/common.js?");

/***/ }),

/***/ "./src/js/order.js":
/*!*************************!*\
  !*** ./src/js/order.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ \"./src/js/cart.js\");\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ \"./src/js/common.js\");\n/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ \"./src/js/url.js\");\n\r\n\r\n\r\n\r\n// EXECUTE ON LOAD\r\nwindow.onload = async () => {\r\n  await createCartPage();\r\n  const cart = _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart();\r\n  cart.updateHeader();\r\n};\r\n\r\n// ADD PRODUCTS TO DOCUMENT\r\nconst createCartPage = async () => {\r\n  const cart = _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart();\r\n  for (const item of cart.getItems()) {\r\n    const product = await _common__WEBPACK_IMPORTED_MODULE_1__.getData(_url__WEBPACK_IMPORTED_MODULE_2__.url + item.id);\r\n    const cartItems = document.getElementById(\"cart-items\");\r\n    const newCard = _common__WEBPACK_IMPORTED_MODULE_1__.createCard(cartItems, product);\r\n    const box = newCard.querySelector(\".card-box\");\r\n    const cartItemComponent = new CartItemComponent(item, box);\r\n    const component = cartItemComponent.getComponent();\r\n    newCard.appendChild(component);\r\n    const desc = newCard.querySelector(\".card-box-body-text\");\r\n    desc.textContent = \"Couleur: \" + item.color;\r\n  }\r\n  const cartItemsFooter = document.getElementById(\"cart-items\");\r\n  _common__WEBPACK_IMPORTED_MODULE_1__.createBackToHome(cartItemsFooter);\r\n  const summary = document.getElementById(\"summary\");\r\n  _common__WEBPACK_IMPORTED_MODULE_1__.createTotalSummary(summary);\r\n  const buttonForm = document.getElementById(\"form-button\");\r\n  _common__WEBPACK_IMPORTED_MODULE_1__.buttonFormOrder(buttonForm);\r\n};\r\n\r\n// SHOW SUM INFO\r\nconst updateSumInfo = (e) => {\r\n  const cart = e.detail.cart;\r\n  const totalItems = document.getElementById(\"total-items\");\r\n  totalItems.textContent = \"Nombre d'articles : \" + cart.itemsQty();\r\n  const totalPrice = document.getElementById(\"total-price\");\r\n  totalPrice.textContent = \"Prix total = \" + _common__WEBPACK_IMPORTED_MODULE_1__.formatPrice(cart.totalPrices(), true);\r\n};\r\ndocument.addEventListener(\"updateEvent\", updateSumInfo);\r\n\r\n// CLASS CARTITEMCOMPONENT\r\nclass CartItemComponent {\r\n  component;\r\n  quantityNumber;\r\n  constructor(item, id) {\r\n    this.item = item;\r\n    this.quantityComponent = this.createQuantity();\r\n    this.sumPriceComponent = this.createSumPrice();\r\n    this.removeComponent = this.createRemove();\r\n    this.component = this.createCartItemComponent(id);\r\n    this.card = id.parentElement;\r\n  }\r\n  getComponent() {\r\n    return this.component;\r\n  }\r\n  createQuantity() {\r\n    const quantity = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"div\", { class: \"card-component-quantity\" });\r\n    const down = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"span\", { class: \"down\" }, quantity);\r\n    down.textContent = \"-\";\r\n    this.quantityNumber = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"input\", { type: \"text\", value: this.item.quantity }, quantity);\r\n    const up = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"span\", { class: \"up\" }, quantity);\r\n    up.textContent = \"+\";\r\n    up.addEventListener(\"click\", () => {\r\n      const input = up.previousElementSibling;\r\n      let value = parseInt(input.value, 10);\r\n      value = isNaN(value) ? 0 : value;\r\n      value++;\r\n      this.updateQty(value);\r\n    });\r\n    down.addEventListener(\"click\", () => {\r\n      const input = down.nextElementSibling;\r\n      let value = parseInt(input.value, 10);\r\n      if (value > 1) {\r\n        value = isNaN(value) ? 0 : value;\r\n        value--;\r\n        this.updateQty(value);\r\n      } else {\r\n        this.removeItem();\r\n      }\r\n    });\r\n    this.quantityNumber.addEventListener(\"change\", () => {\r\n      let value = parseInt(this.quantityNumber.value, 10);\r\n      this.updateQty(value);\r\n    });\r\n    return quantity;\r\n  }\r\n  createSumPrice() {\r\n    const sumPrice = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"p\", { class: \"card-component-price\" });\r\n    sumPrice.textContent = _common__WEBPACK_IMPORTED_MODULE_1__.formatPrice(this.item.quantity * this.item.price);\r\n    return sumPrice;\r\n  }\r\n  createRemove() {\r\n    const remove = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"div\", { class: \"card-component-remove\" });\r\n    const iconRemove = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"i\", { class: \"fas fa-trash\" }, remove);\r\n    remove.addEventListener(\"click\", () => {\r\n      this.removeItem();\r\n    });\r\n    return remove;\r\n  }\r\n  createCartItemComponent() {\r\n    const cardComponent = _common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory(\"div\", { class: \"card-component\" });\r\n    cardComponent.appendChild(this.quantityComponent);\r\n    cardComponent.appendChild(this.sumPriceComponent);\r\n    cardComponent.appendChild(this.removeComponent);\r\n    return cardComponent;\r\n  }\r\n  updateQty(qty) {\r\n    this.quantityNumber.value = qty;\r\n    this.sumPriceComponent.textContent = _common__WEBPACK_IMPORTED_MODULE_1__.formatPrice(qty * this.item.price);\r\n    _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart().updateItemQty(this.item.id, this.item.color, qty);\r\n  }\r\n  removeItem() {\r\n    _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart().removeItem(this.item.id, this.item.color);\r\n    this.card.remove();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://frontend/./src/js/order.js?");

/***/ }),

/***/ "./src/js/url.js":
/*!***********************!*\
  !*** ./src/js/url.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"url\": () => (/* binding */ url)\n/* harmony export */ });\n// URL API\r\nconst url = location.hostname === \"localhost\" || location.hostname === \"127.0.0.1\"\r\n? \"http://localhost:3000/api/teddies/\"\r\n: \"https://tp-oc-orinoco.herokuapp.com/api/teddies/\";\n\n//# sourceURL=webpack://frontend/./src/js/url.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/order.js");
/******/ 	
/******/ })()
;