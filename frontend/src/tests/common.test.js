import * as commonFn from '../js/common.js'
import {Cart} from '../js/cart.js'

describe('numberWithSpaces', () => {
  test('it should add a blank space every 3 digits', () => {
    const number = 123456
    expect(commonFn.numberWithSpaces(number)).toEqual('123 456')
  })
})
describe('formatPrice', () => {
  test('it should format integer price finishing by 00 to include cents and return value without cents and € sign', () => {
    const price = 5900
    expect(commonFn.formatPrice(price)).toEqual('59€')
  })
  test('it should format integer price to include cents and return value with cents and € sign', () => {
    const price = 5555
    expect(commonFn.formatPrice(price)).toEqual('55,55€')
  })
  test('it should print TTC when taxes is call on argument', () => {
    const price = 1234
    expect(commonFn.formatPrice(price, true)).toEqual('12,34€ TTC')
  })
})
describe('createElementFactory', () => {
  test('it should create a new element html with type, attributes, parent', () => {
    document.body.innerHTML = '<div></div>'
    const parent = document.querySelector('div')
    const element = commonFn.createElementFactory('div', {class: 'font-weight-bold'}, parent)
    expect(element.tagName).toEqual('DIV')
    expect(element.classList.length).toEqual(1)
    expect(element.classList[0]).toEqual('font-weight-bold')
    expect(parent.querySelector('.font-weight-bold')).toEqual(element)
  })
})
describe('createCard', () => {
  document.body.innerHTML = '<div></div>'
  const items = {
    _id: 123,
    imageUrl: 'http://URL',
    name: 'John DOE',
    description: 'my description here',
    price: 1000,
  }
  test('it should create card template without links and prices', () => {
    const parent = document.querySelector('div')
    const card = commonFn.createCard(parent, items)
    expect(card.outerHTML).toEqual(`<article class="card-article"><div class="card-box"><img class="card-box-img" src="${items.imageUrl}"><div class="card-box-body"><h5 class="card-box-body-title">${items.name}</h5><p class="card-box-body-text">${items.description}</p></div></div></article>`)
  })
  test('it should create card template with links and prices', () => {
    const parent = document.querySelector('div')
    const card = commonFn.createCard(parent, items, true, true)
    expect(card.outerHTML).toEqual(`<article class="card-article"><a class="card-article-link" href="product.html?id=123"><div class="card-box"><img class="card-box-img" src="${items.imageUrl}"><div class="card-box-body"><h5 class="card-box-body-title">${items.name}</h5><p class="card-box-body-text">${items.description}</p><div class="card-box-body-price"><p class="card-box-body-price-text">${commonFn.formatPrice(items.price)}</p></div></div></div></a></article>`)
  })
})
describe('buttonAddToCart', () => {
  test('it should add item to cart in the localstorage on button click', () => {
    localStorage.clear()
    const cart = (Cart.instance = new Cart())
    const item = {
      _id: 123,
      name: 'Teddy',
      price: 1000,
      quantity: 1,
    }
    document.body.innerHTML = '<div></div>'
    const parent = document.querySelector('div')
    const select = commonFn.createElementFactory('select', {id: 'inputGroupSelect01'}, parent)
    commonFn.createElementFactory('option', {value: 'tan'}, select)
    commonFn.createElementFactory('div', {id: 'cart-qty'}, parent)
    commonFn.buttonAddToCart(parent, item)
    parent.click()
    expect(cart.itemsQty()).toEqual(1)
    expect(cart.getItemsId()).toEqual([123])
  })
})
describe('createBackToHome', () => {
  test('it should create a new element html', () => {
    document.body.innerHTML = '<div></div>'
    const parent = document.querySelector('div')
    const backToHome = commonFn.createBackToHome(parent)
    expect(backToHome.outerHTML).toEqual(`<a class="back-home" href="index.html"><i class="fas fa-arrow-left"></i><span class="font-weight-bold">Retour à l'acceuil</span></a>`)
  })
})
describe('createTotalSummary', () => {
  test('it should create a new element html', () => {
    const cart = Cart.getCart()
    document.body.innerHTML = '<div></div>'
    const parent = document.querySelector('div')
    commonFn.createTotalSummary(parent)
    expect(parent.outerHTML).toEqual(`<div><div id="total-items">Nombre d'articles : ${cart.itemsQty()}</div><div id="total-price">Prix total = ${commonFn.formatPrice(cart.totalPrices(), true)}</div></div>`)
    document.removeEventListener('updateEvent', commonFn.updateSumInfo)
  })
})
describe('initCommon', () => {
  test('it should update cartQtyIcon when adding or removing items', () => {
    localStorage.clear()
    const cart = Cart.instance = new Cart()
    const item = {
      _id: 123,
      name: 'Teddy',
      color: 'Tan',
      price: 1000,
      quantity: 1,
    }
    document.body.innerHTML = '<div></div>'
    const parent = document.querySelector('div')
    commonFn.createElementFactory('div', {id: 'cart-qty'}, parent)
    const cartQtyIcon = document.getElementById('cart-qty')
    cart.addItem(item._id, item.color, item.price)
    commonFn.initCommon()
    expect(cartQtyIcon.textContent).toEqual('1')
    cart.removeItem(item._id, item.color)
    expect(cartQtyIcon.classList.contains).not.toEqual('cart-qty')
    expect(cartQtyIcon.textContent).toEqual('')
  })
})
describe('Contact', () => {
  test('it should create an instance of Contact with proper value', () => {
    const contact = new commonFn.Contact('John', 'DOE', '55 main street', 'New-York', 'j.doe@email.com')
    expect(contact).toEqual({
      firstName: 'John',
      lastName: 'DOE',
      address: '55 main street',
      city: 'New-York',
      email: 'j.doe@email.com',
    })
  })
})
describe('formContact', () => {
  test('it should return a contact object with proper values', () => {
    document.body.innerHTML = '<div></div>'
    const parent = document.querySelector('div')
    const formOrder = commonFn.createElementFactory('form', {id: 'form-order'}, parent)
    commonFn.createElementFactory('input', {name: 'firstName', value: 'John'}, formOrder)
    commonFn.createElementFactory('input', {name: 'lastName', value: 'DOE'}, formOrder)
    commonFn.createElementFactory('input', {name: 'address', value: '555 Main street'}, formOrder)
    commonFn.createElementFactory('input', {name: 'city', value: 'New-York'}, formOrder)
    commonFn.createElementFactory('input', {name: 'email', value: 'j.doe@email.com'}, formOrder)
    expect(commonFn.formContact()).toEqual({firstName: 'John', lastName: 'DOE', address: '555 Main street', city: 'New-York', email: 'j.doe@email.com'})
  })
})
