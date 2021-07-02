import {Cart} from './cart'
import {url} from './url'

// GET DATA
export const getData = async (request) => {
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

// SPACING NUMBERS
export function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// FORMATING PRICE
export const formatPrice = (price, taxes = false) => {
  const priceString = price.toString()
  const centsIndex = priceString.length - 2
  const centsValue = priceString.substring(centsIndex)
  const integerValue = priceString.substring(0, centsIndex)
  let formatedPrice = integerValue
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
export const createElementFactory = (type, attributes, parent) => {
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
export const createCard = (parent, items, links = false, prices = false) => {
  const card = createElementFactory('article', {class: 'card-article'}, parent)
  let box = ''
  if (links) {
    const link = createElementFactory('a', {class: 'card-article-link'}, card)
    link.href = 'product.html?id=' + items._id
    box = createElementFactory('div', {class: 'card-box'}, link)
  } else {
    box = createElementFactory('div', {class: 'card-box'}, card)
  }
  const img = createElementFactory('img', {class: 'card-box-img'}, box)
  img.src = items.imageUrl
  const body = createElementFactory('div', {class: 'card-box-body'}, box)
  const title = createElementFactory('h5', {class: 'card-box-body-title'}, body)
  title.textContent = items.name
  const desc = createElementFactory('p', {class: 'card-box-body-text'}, body)
  desc.textContent = items.description
  if (prices) {
    const footer = createElementFactory('div', {class: 'card-box-body-price'}, body)
    const price = createElementFactory('p', {class: 'card-box-body-price-text'}, footer)
    price.textContent = formatPrice(items.price)
  }
  return card
}

// BUTTON ADD TO CART
export const buttonAddToCart = (element, item) => {
  element.addEventListener('click', () => {
    const cart = Cart.getCart()
    const selectedOption = document.getElementById('inputGroupSelect01').value
    cart.addItem(item._id, selectedOption, item.price)
    cart.update()
  })
}

// CREATE BACK TO HOME
export const createBackToHome = (parent) => {
  const backToHome = createElementFactory('a', {class: 'back-home'}, parent)
  backToHome.href = 'index.html'
  createElementFactory('i', {class: 'fas fa-arrow-left'}, backToHome)
  const textBackArrow = createElementFactory('span', {class: 'font-weight-bold'}, backToHome)
  textBackArrow.textContent = "Retour à l'acceuil"
  return backToHome
}

// CREATE TOTAL SUMMARY
export const createTotalSummary = (element) => {
  const cart = Cart.getCart()
  const totalItems = createElementFactory('div', {id: 'total-items'}, element)
  totalItems.textContent = `Nombre d'articles : ${cart.itemsQty()}`
  const totalPrice = createElementFactory('div', {id: 'total-price'}, element)
  totalPrice.textContent = `Prix total = ${formatPrice(cart.totalPrices(), true)}`
  document.addEventListener('updateEvent', updateSumInfo)
}

// EXPORT FOR TEST
export const updateSumInfo = (e) => {
  const cart = e.detail.cart
  const totalItems = document.getElementById('total-items')
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty()
  const totalPrice = document.getElementById('total-price')
  totalPrice.textContent = 'Prix total = ' + formatPrice(cart.totalPrices(), true)
}

// UPDATE HEADER CART QUANTITY
export const initCommon = () => {
  document.addEventListener('updateEvent', (e) => {
    const cart = e.detail.cart
    const cartQtyIcon = document.getElementById('cart-qty')
    if (cart.itemsQty() > 0) {
      cartQtyIcon.classList.add('cart-qty')
      cartQtyIcon.textContent = cart.itemsQty()
    } else {
      cartQtyIcon.classList.remove('cart-qty')
      cartQtyIcon.textContent = ''
    }
  })
  Cart.getCart().dispatchUpdate()
}

// CLASS CONTACT
export class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName
    this.lastName = lastName
    this.address = address
    this.city = city
    this.email = email
  }
}

// CREATE NEW FORM CONTACT
export const formContact = () => {
  const formOrder = document.forms['form-order']
  const firstName = formOrder.elements.firstName.value
  const lastName = formOrder.elements.lastName.value
  const address = formOrder.elements.address.value
  const city = formOrder.elements.city.value
  const email = formOrder.elements.email.value

  return new Contact(firstName, lastName, address, city, email)
}

// BUTTON FORM ORDER
export const formOrder = (element) => {
  element.addEventListener('submit', async (e) => {
    e.preventDefault()
    const orderData = {
      contact: formContact(),
      products: Cart.getCart().getItemsId(),
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
      console.error('Erreur serveur')
    }
  })
}
