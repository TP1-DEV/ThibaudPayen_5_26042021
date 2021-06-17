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

/***/ "./src/sass/pages/index.scss":
/*!***********************************!*\
  !*** ./src/sass/pages/index.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://frontend/./src/sass/pages/index.scss?");

/***/ }),

/***/ "./src/js/cart.js":
/*!************************!*\
  !*** ./src/js/cart.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cart\": () => (/* binding */ Cart)\n/* harmony export */ });\n// CLASS CART\nclass Cart {\n  constructor() {\n    const cartStorage = localStorage.getItem('cart')\n    this.items = cartStorage != null ? JSON.parse(cartStorage) : []\n    this.updateEvent = new CustomEvent('updateEvent', {\n      detail: {\n        cart: this,\n      },\n    })\n  }\n\n  static getCart() {\n    if (!Cart.instance) {\n      Cart.instance = new Cart()\n    }\n    return Cart.instance\n  }\n\n  addItem(id, color, price, quantity = 1) {\n    const addCartItem = {\n      id: id,\n      color: color,\n      price: price,\n      quantity: quantity,\n    }\n    const existingItem = this.items.find((item) => {\n      return item.id === addCartItem.id && item.color === addCartItem.color\n    })\n    if (existingItem) {\n      existingItem.quantity++\n    } else {\n      this.items.push(addCartItem)\n    }\n    this.update()\n  }\n\n  removeItem(id, color) {\n    const index = this.items.findIndex((item) => item.id === id && item.color === color)\n    if (index >= 0) {\n      this.items.splice(index, 1)\n      this.update()\n    }\n  }\n\n  updateItemQty(id, color, quantity) {\n    const item = this.items.find((item) => item.id === id && item.color === color)\n    item.quantity = quantity\n    this.update()\n  }\n\n  itemsQty() {\n    let itemsQty = 0\n    for (const item of this.items) {\n      itemsQty += item.quantity\n    }\n    return itemsQty\n  }\n\n  totalPrices() {\n    let totalPrices = 0\n    for (const item of this.items) {\n      totalPrices += item.price * item.quantity\n    }\n    return totalPrices\n  }\n\n  getItems() {\n    return this.items\n  }\n\n  getItemsId() {\n    const itemsId = []\n    for (const item of this.items) {\n      itemsId.push(item.id)\n    }\n    return itemsId\n  }\n\n  update() {\n    localStorage.setItem('cart', JSON.stringify(this.items))\n    document.dispatchEvent(this.updateEvent)\n  }\n\n  updateHeader() {\n    document.dispatchEvent(this.updateEvent)\n  }\n}\n\n\n//# sourceURL=webpack://frontend/./src/js/cart.js?");

/***/ }),

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"getSearchParams\": () => (/* binding */ getSearchParams),\n/* harmony export */   \"numberWithSpaces\": () => (/* binding */ numberWithSpaces),\n/* harmony export */   \"formatPrice\": () => (/* binding */ formatPrice),\n/* harmony export */   \"createElementFactory\": () => (/* binding */ createElementFactory),\n/* harmony export */   \"createCard\": () => (/* binding */ createCard),\n/* harmony export */   \"buttonAddToCart\": () => (/* binding */ buttonAddToCart),\n/* harmony export */   \"createBackToHome\": () => (/* binding */ createBackToHome),\n/* harmony export */   \"createTotalSummary\": () => (/* binding */ createTotalSummary),\n/* harmony export */   \"updateCartQty\": () => (/* binding */ updateCartQty),\n/* harmony export */   \"Contact\": () => (/* binding */ Contact),\n/* harmony export */   \"formContact\": () => (/* binding */ formContact),\n/* harmony export */   \"buttonFormOrder\": () => (/* binding */ buttonFormOrder)\n/* harmony export */ });\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ \"./src/js/cart.js\");\n/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url */ \"./src/js/url.js\");\n\n\n\n// GET DATA\nconst getData = async (request) => {\n  try {\n    const response = await fetch(request)\n    if (response.ok) {\n      const data = response.json()\n      return data\n    }\n    console.error('Serveur status :', response.status)\n  } catch (error) {\n    console.error(error)\n  }\n}\n\n// GET URLSEARCHPARAMS\nconst getSearchParams = (term) => {\n  const searchParams = new URLSearchParams(window.location.search)\n  return searchParams.get(term)\n}\n\n// SPACING NUMBERS\nfunction numberWithSpaces(number) {\n  return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ' ')\n}\n\n// FORMATING PRICE\nconst formatPrice = (price, taxes = false) => {\n  const priceString = price.toString()\n  const centsIndex = priceString.length - 2\n  const centsValue = priceString.substring(centsIndex)\n  const integerValue = priceString.substring(0, centsIndex)\n  let formatedPrice = integerValue\n  if (priceString === '0') {\n    formatedPrice = 0\n  }\n  if (centsValue !== '00' && priceString !== '0') {\n    formatedPrice += `,${centsValue}`\n  }\n  formatedPrice += '€'\n  if (taxes) {\n    formatedPrice += ' TTC'\n  }\n  return numberWithSpaces(formatedPrice)\n}\n\n// CREATE DOM ELEMENT\nconst createElementFactory = (type, attributes, parent) => {\n  const element = document.createElement(type)\n  for (const key in attributes) {\n    element.setAttribute(key, attributes[key])\n  }\n  if (parent) {\n    parent.appendChild(element)\n  }\n  return element\n}\n\n// CREATE CARD\nconst createCard = (element, items, links = false, prices = false) => {\n  const card = createElementFactory('article', { class: 'card-article' }, element)\n  let box = ''\n  if (links) {\n    const link = createElementFactory('a', { class: 'card-article-link' }, card)\n    link.href = 'product.html?id=' + items._id\n    box = createElementFactory('div', { class: 'card-box' }, link)\n  } else {\n    box = createElementFactory('div', { class: 'card-box' }, card)\n  }\n  const img = createElementFactory('img', { class: 'card-box-img' }, box)\n  img.src = items.imageUrl\n  const body = createElementFactory('div', { class: 'card-box-body' }, box)\n  const title = createElementFactory('h5', { class: 'card-box-body-title' }, body)\n  title.textContent = items.name\n  const desc = createElementFactory('p', { class: 'card-box-body-text' }, body)\n  desc.textContent = items.description\n  if (prices) {\n    const footer = createElementFactory('div', { class: 'card-box-body-price' }, body)\n    const price = createElementFactory('p', { class: 'card-box-body-price-text' }, footer)\n    price.textContent = formatPrice(items.price)\n  }\n  return card\n}\n\n// BUTTON ADD TO CART\nconst buttonAddToCart = (element, item) => {\n  element.addEventListener('click', () => {\n    const cart = _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart()\n    const selectedOption = document.getElementById('inputGroupSelect01').value\n    cart.addItem(item._id, selectedOption, item.price)\n    cart.update()\n  })\n}\n\n// CREATE BACK TO HOME\nconst createBackToHome = (element) => {\n  const backToHome = createElementFactory('a', { class: 'back-home' }, element)\n  backToHome.href = 'index.html'\n  createElementFactory('i', { class: 'fas fa-arrow-left' }, backToHome)\n  const textBackArrow = createElementFactory('span', { class: 'font-weight-bold' }, backToHome)\n  textBackArrow.textContent = \"Retour à l'acceuil\"\n}\n\n// CREATE TOTAL SUMMARY\nconst createTotalSummary = (element) => {\n  const cart = _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart()\n  const totalItems = createElementFactory('div', { id: 'total-items' }, element)\n  totalItems.textContent = `Nombre d'articles : ${cart.itemsQty()}`\n  const totalPrice = createElementFactory('div', { id: 'total-price' }, element)\n  totalPrice.textContent = `Prix total = ${formatPrice(cart.totalPrices(), true)}`\n}\n\n// UPDATE HEADER CART QUANTITY\nconst updateCartQty = (e) => {\n  const cart = e.detail.cart\n  const cartQtyIcon = document.getElementById('cart-qty')\n  if (cart.itemsQty() > 0) {\n    cartQtyIcon.classList.add('cart-qty')\n    cartQtyIcon.textContent = cart.itemsQty()\n  } else {\n    cartQtyIcon.classList.remove('cart-qty')\n    cartQtyIcon.textContent = ''\n  }\n}\ndocument.addEventListener('updateEvent', updateCartQty)\n\n// CLASS CONTACT\nclass Contact {\n  constructor(firstName, lastName, address, city, email) {\n    this.firstName = firstName\n    this.lastName = lastName\n    this.address = address\n    this.city = city\n    this.email = email\n  }\n}\n\n// CREATE NEW FORM CONTACT\nconst formContact = () => {\n  const formOrder = document.forms['form-order']\n  const firstName = formOrder.firstName.value\n  const lastName = formOrder.lastName.value\n  const address = formOrder.address.value\n  const city = formOrder.city.value\n  const email = formOrder.email.value\n\n  const nameValidation = /[a-zA-Z- ]/\n  const addressValidation = /[a-zA-Z0-9- ]/\n  // eslint-disable-next-line no-useless-escape\n  const emailValidation = /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/\n\n  const nameIsValid = nameValidation.test(firstName) && nameValidation.test(lastName) && nameValidation.test(city)\n  const addressIsValid = addressValidation.test(address)\n  const emailIsValid = emailValidation.test(email)\n  if (nameIsValid === false || addressIsValid === false || emailIsValid === false) {\n    alert('Erreur de saisie')\n  } else {\n    return new Contact(firstName, lastName, address, city, email)\n  }\n}\n\n// BUTTON FORM ORDER\nconst buttonFormOrder = (element) => {\n  element.addEventListener('click', async (e) => {\n    e.preventDefault()\n    const orderData = {\n      contact: formContact(),\n      products: _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart().getItemsId(),\n    }\n    const request = new Request(_url__WEBPACK_IMPORTED_MODULE_1__.url + 'order', {\n      method: 'POST',\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify(orderData),\n    })\n    const data = await getData(request)\n    if (data.orderId) {\n      window.location = 'sumorder.html?orderId=' + data.orderId\n    } else {\n      console.error(\"Erreur serveur\")\n    }\n  })\n}\n\n\n//# sourceURL=webpack://frontend/./src/js/common.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ \"./src/js/cart.js\");\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ \"./src/js/common.js\");\n/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ \"./src/js/url.js\");\n/* harmony import */ var _sass_pages_index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sass/pages/index.scss */ \"./src/sass/pages/index.scss\");\n\n\n\n\n  \n// ADD PRODUCTS TO DOCUMENT\nconst addItemsCards = async () => {\n  const products = await (0,_common__WEBPACK_IMPORTED_MODULE_1__.getData)(_url__WEBPACK_IMPORTED_MODULE_2__.url)\n  const indexSection = document.getElementById('index-section')\n  const cardContainer = (0,_common__WEBPACK_IMPORTED_MODULE_1__.createElementFactory)('div', { class: 'card-container' }, indexSection)\n  for (const product of products) {\n    ;(0,_common__WEBPACK_IMPORTED_MODULE_1__.createCard)(cardContainer, product, true, true)\n  }\n}\n \n// EXECUTE ON LOAD\nwindow.onload = () => {\n  addItemsCards()\n  const cart = _cart__WEBPACK_IMPORTED_MODULE_0__.Cart.getCart()\n  cart.updateHeader()\n}\n\n\n//# sourceURL=webpack://frontend/./src/js/index.js?");

/***/ }),

/***/ "./src/js/url.js":
/*!***********************!*\
  !*** ./src/js/url.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"url\": () => (/* binding */ url)\n/* harmony export */ });\n// URL API\nconst url = location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? 'http://localhost:3000/api/teddies/' : 'https://tp-oc-orinoco.herokuapp.com/api/teddies/'\n\n\n//# sourceURL=webpack://frontend/./src/js/url.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;