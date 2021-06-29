import {Cart} from './cart'
import {createElementFactory, formatPrice} from './common'
import '../sass/pages/sumorder.scss'

// CREATE SUM ORDER
const createSumOrder = () => {
  const cart = Cart.getCart()
  const searchParams = new URLSearchParams(window.location.search)
  const sumOrder = document.getElementById('sumorder')
  const totalQuantity = createElementFactory('p', { class: 'font-weight-bold' }, sumOrder)
  totalQuantity.textContent = `Quantité d'articles : ${cart.itemsQty()}`
  const totalPrice = createElementFactory('p', { class: 'font-weight-bold' }, sumOrder)
  totalPrice.textContent = `Prix total : ${formatPrice(cart.totalPrices(), true)}`
  const orderId = createElementFactory('p', { class: 'font-weight-bold' }, sumOrder)
  orderId.textContent = `Commande n° : ${searchParams.get('orderId')}`
}

// EXECUTE ON LOAD
window.onload = () => {
  createSumOrder()
  localStorage.clear()
}
