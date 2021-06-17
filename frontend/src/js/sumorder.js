import { Cart } from './cart'
import { createElementFactory, getSearchParams, formatPrice } from './common'
import '../sass/styles.scss'

// CREATE SUM ORDER
const createSumOrder = () => {
  const cart = Cart.getCart()
  const order = document.getElementById('order')
  const totalQuantity = createElementFactory('p', { class: 'font-weight-bold' }, order)
  totalQuantity.textContent = `Quantité d'articles : ${cart.itemsQty()}`
  const totalPrice = createElementFactory('p', { class: 'font-weight-bold' }, order)
  totalPrice.textContent = `Prix total : ${formatPrice(cart.totalPrices(), true)}`
  const orderId = createElementFactory('p', { class: 'font-weight-bold' }, order)
  orderId.textContent = `Commande n° : ${getSearchParams('orderId')}`
}

// EXECUTE ON LOAD
window.onload = () => {
  createSumOrder()
  localStorage.clear()
}
