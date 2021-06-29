import {Cart} from './cart'
import * as commonFn from './common'
import {url} from './url'
import '../sass/pages/order.scss'

// ADD PRODUCTS TO DOCUMENT
const createCartPage = async () => {
  const cart = Cart.getCart()
  for (const item of cart.getItems()) {
    const product = await commonFn.getData(url + item.id)
    const orderItems = document.getElementById('order-items')
    const newCard = commonFn.createCard(orderItems, product)
    const box = newCard.querySelector('.card-box')
    const cartItemComponent = new CartItemComponent(item, box)
    const component = cartItemComponent.getComponent()
    newCard.appendChild(component)
    const desc = newCard.querySelector('.card-box-body-text')
    desc.textContent = 'Couleur: ' + item.color
  }
  const orderItemsFooter = document.getElementById('order-items')
  commonFn.createBackToHome(orderItemsFooter)
  const summary = document.getElementById('summary')
  commonFn.createTotalSummary(summary)
  const form = document.getElementById('form-order')
  commonFn.formOrder(form)
}

// SHOW SUM INFO
const updateSumInfo = (e) => {
  const cart = e.detail.cart
  const totalItems = document.getElementById('total-items')
  totalItems.textContent = "Nombre d'articles : " + cart.itemsQty()
  const totalPrice = document.getElementById('total-price')
  totalPrice.textContent = 'Prix total = ' + commonFn.formatPrice(cart.totalPrices(), true)
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
    const quantity = commonFn.createElementFactory('div', { class: 'card-component-quantity' })
    const down = commonFn.createElementFactory('span', { class: 'down' }, quantity)
    down.textContent = '-'
    this.quantityNumber = commonFn.createElementFactory('input', { type: 'text', value: this.item.quantity }, quantity)
    const up = commonFn.createElementFactory('span', { class: 'up' }, quantity)
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
    const sumPrice = commonFn.createElementFactory('p', { class: 'card-component-price' })
    sumPrice.textContent = commonFn.formatPrice(this.item.quantity * this.item.price)
    return sumPrice
  }

  createRemove() {
    const remove = commonFn.createElementFactory('div', { class: 'card-component-remove' })
    commonFn.createElementFactory('i', { class: 'fas fa-trash' }, remove)
    remove.addEventListener('click', () => {
      this.removeItem()
    })
    return remove
  }

  createCartItemComponent() {
    const cardComponent = commonFn.createElementFactory('div', { class: 'card-component' })
    cardComponent.appendChild(this.quantityComponent)
    cardComponent.appendChild(this.sumPriceComponent)
    cardComponent.appendChild(this.removeComponent)
    return cardComponent
  }

  updateQty(qty) {
    this.quantityNumber.value = qty
    this.sumPriceComponent.textContent = commonFn.formatPrice(qty * this.item.price)
    Cart.getCart().updateItemQty(this.item.id, this.item.color, qty)
  }

  removeItem() {
    Cart.getCart().removeItem(this.item.id, this.item.color)
    this.card.remove()
  }
}

// EXECUTE ON LOAD
window.onload = async () => {
  await createCartPage()
  const cart = Cart.getCart()
  cart.updateHeader()
}
