/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/cart.js
// CLASS CART
class cart_Cart {
  constructor() {
    const cartStorage = localStorage.getItem('cart')
    this.items = cartStorage != null ? JSON.parse(cartStorage) : []
    this.updateEvent = new CustomEvent('updateEvent', {
      detail: {
        cart: this,
      },
    })
  }

  static getCart() {
    if (!cart_Cart.instance) {
      cart_Cart.instance = new cart_Cart()
    }
    return cart_Cart.instance
  }

  addItem(id, color, price, quantity = 1) {
    const addCartItem = {
      id: id,
      color: color,
      price: price,
      quantity: quantity,
    }
    const existingItem = this.items.find((item) => {
      return item.id === addCartItem.id && item.color === addCartItem.color
    })
    if (existingItem) {
      existingItem.quantity++
    } else {
      this.items.push(addCartItem)
    }
    this.update()
  }

  removeItem(id, color) {
    const index = this.items.findIndex((item) => item.id === id && item.color === color)
    if (index >= 0) {
      this.items.splice(index, 1)
      this.update()
    }
  }

  updateItemQty(id, color, quantity) {
    const item = this.items.find((item) => item.id === id && item.color === color)
    item.quantity = quantity
    this.update()
  }

  itemsQty() {
    let itemsQty = 0
    for (const item of this.items) {
      itemsQty += item.quantity
    }
    return itemsQty
  }

  totalPrices() {
    let totalPrices = 0
    for (const item of this.items) {
      totalPrices += item.price * item.quantity
    }
    return totalPrices
  }

  getItems() {
    return this.items
  }

  getItemsId() {
    const itemsId = []
    for (const item of this.items) {
      itemsId.push(item.id)
    }
    return itemsId
  }

  update() {
    localStorage.setItem('cart', JSON.stringify(this.items))
    document.dispatchEvent(this.updateEvent)
  }

  updateHeader() {
    document.dispatchEvent(this.updateEvent)
  }
}

;// CONCATENATED MODULE: ./src/js/url.js
// URL API
const url = location.hostname === 'localhost' || location.hostname === '127.0.0.1' ? 'http://localhost:3000/api/teddies/' : 'https://tp-oc-orinoco.herokuapp.com/api/teddies/'

;// CONCATENATED MODULE: ./src/js/common.js



// GET DATA
const getData = async (request) => {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const data = response.json()
      return data
    }
    console.error('Serveur status :', response.status)
  } catch (error) {
    console.error(error)
  }
}

// GET URLSEARCHPARAMS
const getSearchParams = (term) => {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(term)
}

// SPACING NUMBERS
function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// FORMATING PRICE
const formatPrice = (price, taxes = false) => {
  const priceString = price.toString()
  const centsIndex = priceString.length - 2
  const centsValue = priceString.substring(centsIndex)
  const integerValue = priceString.substring(0, centsIndex)
  let formatedPrice = integerValue
  if (priceString === '0') {
    formatedPrice = 0
  }
  if (centsValue !== '00' && priceString !== '0') {
    formatedPrice += `,${centsValue}`
  }
  formatedPrice += '€'
  if (taxes) {
    formatedPrice += ' TTC'
  }
  return numberWithSpaces(formatedPrice)
}

// CREATE DOM ELEMENT
const createElementFactory = (type, attributes, parent) => {
  const element = document.createElement(type)
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
  if (parent) {
    parent.appendChild(element)
  }
  return element
}

// CREATE CARD
const createCard = (element, items, links = false, prices = false) => {
  const card = createElementFactory('article', { class: 'card-article' }, element)
  let box = ''
  if (links) {
    const link = createElementFactory('a', { class: 'card-article-link' }, card)
    link.href = 'product.html?id=' + items._id
    box = createElementFactory('div', { class: 'card-box' }, link)
  } else {
    box = createElementFactory('div', { class: 'card-box' }, card)
  }
  const img = createElementFactory('img', { class: 'card-box-img' }, box)
  img.src = items.imageUrl
  const body = createElementFactory('div', { class: 'card-box-body' }, box)
  const title = createElementFactory('h5', { class: 'card-box-body-title' }, body)
  title.textContent = items.name
  const desc = createElementFactory('p', { class: 'card-box-body-text' }, body)
  desc.textContent = items.description
  if (prices) {
    const footer = createElementFactory('div', { class: 'card-box-body-price' }, body)
    const price = createElementFactory('p', { class: 'card-box-body-price-text' }, footer)
    price.textContent = formatPrice(items.price)
  }
  return card
}

// BUTTON ADD TO CART
const buttonAddToCart = (element, item) => {
  element.addEventListener('click', () => {
    const cart = Cart.getCart()
    const selectedOption = document.getElementById('inputGroupSelect01').value
    cart.addItem(item._id, selectedOption, item.price)
    cart.update()
  })
}

// CREATE BACK TO HOME
const createBackToHome = (element) => {
  const backToHome = createElementFactory('a', { class: 'back-home' }, element)
  backToHome.href = 'index.html'
  createElementFactory('i', { class: 'fas fa-arrow-left' }, backToHome)
  const textBackArrow = createElementFactory('span', { class: 'font-weight-bold' }, backToHome)
  textBackArrow.textContent = "Retour à l'acceuil"
}

// CREATE TOTAL SUMMARY
const createTotalSummary = (element) => {
  const cart = cart_Cart.getCart()
  const totalItems = createElementFactory('div', { id: 'total-items' }, element)
  totalItems.textContent = `Nombre d'articles : ${cart.itemsQty()}`
  const totalPrice = createElementFactory('div', { id: 'total-price' }, element)
  totalPrice.textContent = `Prix total = ${formatPrice(cart.totalPrices(), true)}`
}

// UPDATE HEADER CART QUANTITY
const updateCartQty = (e) => {
  const cart = e.detail.cart
  const cartQtyIcon = document.getElementById('cart-qty')
  if (cart.itemsQty() > 0) {
    cartQtyIcon.classList.add('cart-qty')
    cartQtyIcon.textContent = cart.itemsQty()
  } else {
    cartQtyIcon.classList.remove('cart-qty')
    cartQtyIcon.textContent = ''
  }
}
document.addEventListener('updateEvent', updateCartQty)

// CLASS CONTACT
class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName
    this.lastName = lastName
    this.address = address
    this.city = city
    this.email = email
  }
}

// CREATE NEW FORM CONTACT
const formContact = () => {
  const formOrder = document.forms['form-order']
  const firstName = formOrder.firstName.value
  const lastName = formOrder.lastName.value
  const address = formOrder.address.value
  const city = formOrder.city.value
  const email = formOrder.email.value

  const nameValidation = /[a-zA-Z- ]/
  const addressValidation = /[a-zA-Z0-9- ]/
  // eslint-disable-next-line no-useless-escape
  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const nameIsValid = nameValidation.test(firstName) && nameValidation.test(lastName) && nameValidation.test(city)
  const addressIsValid = addressValidation.test(address)
  const emailIsValid = emailValidation.test(email)
  if (nameIsValid === false || addressIsValid === false || emailIsValid === false) {
    alert('Erreur de saisie')
  } else {
    return new Contact(firstName, lastName, address, city, email)
  }
}

// BUTTON FORM ORDER
const buttonFormOrder = (element) => {
  element.addEventListener('click', async (e) => {
    e.preventDefault()
    const orderData = {
      contact: formContact(),
      products: cart_Cart.getCart().getItemsId(),
    }
    const request = new Request(url + 'order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
    const data = await getData(request)
    if (data.orderId) {
      window.location = 'sumorder.html?orderId=' + data.orderId
    } else {
      console.error("Erreur serveur")
    }
  })
}

;// CONCATENATED MODULE: ./src/js/order.js





// ADD PRODUCTS TO DOCUMENT
const createCartPage = async () => {
  const cart = cart_Cart.getCart()
  for (const item of cart.getItems()) {
    const product = await getData(url + item.id)
    const orderItems = document.getElementById('order-items')
    const newCard = createCard(orderItems, product)
    const box = newCard.querySelector('.card-box')
    const cartItemComponent = new CartItemComponent(item, box)
    const component = cartItemComponent.getComponent()
    newCard.appendChild(component)
    const desc = newCard.querySelector('.card-box-body-text')
    desc.textContent = 'Couleur: ' + item.color
  }
  const orderItemsFooter = document.getElementById('order-items')
  createBackToHome(orderItemsFooter)
  const summary = document.getElementById('summary')
  createTotalSummary(summary)
  const buttonForm = document.getElementById('form-button')
  buttonFormOrder(buttonForm)
}

// SHOW SUM INFO
const updateSumInfo = (e) => {
  const cart = e.detail.cart
  const totalItems = document.getElementById('total-items')
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty()
  const totalPrice = document.getElementById('total-price')
  totalPrice.textContent = 'Prix total = ' + formatPrice(cart.totalPrices(), true)
}
document.addEventListener('updateEvent', updateSumInfo)

// CLASS CARTITEMCOMPONENT
class CartItemComponent {
  constructor(item, id) {
    this.item = item
    this.quantityComponent = this.createQuantity()
    this.sumPriceComponent = this.createSumPrice()
    this.removeComponent = this.createRemove()
    this.component = this.createCartItemComponent(id)
    this.card = id.parentElement
  }

  getComponent() {
    return this.component
  }

  createQuantity() {
    const quantity = createElementFactory('div', { class: 'card-component-quantity' })
    const down = createElementFactory('span', { class: 'down' }, quantity)
    down.textContent = '-'
    this.quantityNumber = createElementFactory('input', { type: 'text', value: this.item.quantity }, quantity)
    const up = createElementFactory('span', { class: 'up' }, quantity)
    up.textContent = '+'
    up.addEventListener('click', () => {
      const input = up.previousElementSibling
      let value = parseInt(input.value, 10)
      value = isNaN(value) ? 0 : value
      value++
      this.updateQty(value)
    })
    down.addEventListener('click', () => {
      const input = down.nextElementSibling
      let value = parseInt(input.value, 10)
      if (value > 1) {
        value = isNaN(value) ? 0 : value
        value--
        this.updateQty(value)
      } else {
        this.removeItem()
      }
    })
    this.quantityNumber.addEventListener('change', () => {
      const value = parseInt(this.quantityNumber.value, 10)
      this.updateQty(value)
    })
    return quantity
  }

  createSumPrice() {
    const sumPrice = createElementFactory('p', { class: 'card-component-price' })
    sumPrice.textContent = formatPrice(this.item.quantity * this.item.price)
    return sumPrice
  }

  createRemove() {
    const remove = createElementFactory('div', { class: 'card-component-remove' })
    createElementFactory('i', { class: 'fas fa-trash' }, remove)
    remove.addEventListener('click', () => {
      this.removeItem()
    })
    return remove
  }

  createCartItemComponent() {
    const cardComponent = createElementFactory('div', { class: 'card-component' })
    cardComponent.appendChild(this.quantityComponent)
    cardComponent.appendChild(this.sumPriceComponent)
    cardComponent.appendChild(this.removeComponent)
    return cardComponent
  }

  updateQty(qty) {
    this.quantityNumber.value = qty
    this.sumPriceComponent.textContent = formatPrice(qty * this.item.price)
    cart_Cart.getCart().updateItemQty(this.item.id, this.item.color, qty)
  }

  removeItem() {
    cart_Cart.getCart().removeItem(this.item.id, this.item.color)
    this.card.remove()
  }
}

// EXECUTE ON LOAD
window.onload = async () => {
  await createCartPage()
  const cart = cart_Cart.getCart()
  cart.updateHeader()
}

/******/ })()
;